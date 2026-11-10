import mongoose, { HydratedDocument } from "mongoose";
import { IUser, UserModel } from "../users/user.model";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcrypt";
import { generateVerificationCode } from "../../helpers/code";
import {
  createAccessToken,
  generateRefreshToken,
  hashRefreshToken,
} from "../../helpers/jwt";
import { AccessTokenPayload } from "../../types/User";
import { env } from "../../config/env";
import SessionModel from "../sessions/session.model";
import { sendEmail } from "../email/email.service";
import { verificationEmail } from "../../templates/verification.email";
import logger from "../../utils/logger";
import { generateResetToken } from "../../helpers/reset-token";
import { resetPasswordEmail } from "../../templates/resetPasswordEmail";

async function createAuthSession(
  user: HydratedDocument<IUser>,
  familyId = new mongoose.Types.ObjectId(),
) {
  const payload: AccessTokenPayload = {
    sub: user._id.toString(),
    role: user.role,
    tokenType: "access",
  };

  const accessToken = createAccessToken(payload);

  const refreshToken = generateRefreshToken();
  const refreshTokenHash = hashRefreshToken(refreshToken);

  const expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_TTL_IN_MS);

  await SessionModel.create({
    userId: user._id,
    refreshTokenHash,
    familyId,
    expiresAt,
    revokedAt: null,
  });

  return {
    accessToken,
    refreshToken,
  };
}

export class AuthService {
  async login(id: string, enteredPassword: string) {
    if (!id || !enteredPassword) {
      logger.warn("Login rejected", { reason: "missing_credentials" });
      throw new ApiError(400, "Email and password are required");
    }
    const normalizedId = id.trim().toLowerCase();
    const user = await UserModel.findOne({
      $or: [{ email: normalizedId }, { username: normalizedId }],
    }).select("+password");
    if (!user || !user.password) {
      logger.warn("Login failed", {
        identifier: normalizedId,
        reason: "invalid_credentials",
      });
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      user.password,
    );

    if (!isPasswordValid) {
      logger.warn("Login failed", {
        userId: user._id.toString(),
        reason: "invalid_password",
      });
      throw new ApiError(401, "Invalid email or password");
    }
    if (!user.isVerified) {
      logger.warn("Login blocked", {
        userId: user._id.toString(),
        reason: "email_unverified",
      });
      throw new ApiError(403, "Please verify your email before logging in");
    }

    const { accessToken, refreshToken } = await createAuthSession(user);
    logger.info("User logged in", { userId: user._id.toString() });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async register(email: string, password: string, username: string) {
    if (!email || !username || !password) {
      logger.warn("Registration rejected", { reason: "missing_fields" });
      throw new ApiError(400, "All fields are required to filled ");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await UserModel.findOne({ email: normalizedEmail });

    if (existingUser) {
      logger.warn("Registration rejected", {
        email: normalizedEmail,
        reason: "email_taken",
      });
      throw new ApiError(400, "User with this email already exists");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = generateVerificationCode();
    const verificationTokenExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const newUser = await UserModel.create({
      email: normalizedEmail,
      password: hashedPassword,
      username,
      verificationTokenHash: hashRefreshToken(verificationCode),
      verificationTokenExpiresAt,
    });

    await sendEmail({
      to: newUser.email,
      subject: "Verify Your Email",
      html: verificationEmail({
        username: newUser.username,
        otp: verificationCode,
      }),
    });
    logger.info("User registered", { userId: newUser._id.toString() });

    return {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async verifyEmail(token: string) {
    const newUser = await UserModel.findOne({
      verificationTokenHash: hashRefreshToken(token),
    }).select("+verificationTokenHash +verificationTokenExpiresAt");

    if (!newUser) {
      logger.warn("Email verification failed", { reason: "invalid_token" });
      throw new ApiError(401, "Invalid verification token");
    }
    if (
      !newUser.verificationTokenExpiresAt ||
      newUser.verificationTokenExpiresAt.getTime() <= Date.now()
    ) {
      logger.warn("Email verification failed", {
        userId: newUser._id.toString(),
        reason: "expired_token",
      });
      throw new ApiError(401, "Verification token has expired");
    }
    newUser.isVerified = true;
    newUser.verificationTokenHash = undefined;
    newUser.verificationTokenExpiresAt = undefined;
    await newUser.save();

    const { accessToken, refreshToken } = await createAuthSession(newUser);
    logger.info("Email verified", { userId: newUser._id.toString() });

    return {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      logger.warn("Current user not found", { userId });
      throw new ApiError(404, "User not found");
    }
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  async refreshToken(refreshToken: string) {
    const session = await SessionModel.findOne({
      refreshTokenHash: hashRefreshToken(refreshToken),
    });
    if (!session) {
      logger.warn("Refresh token rejected", { reason: "invalid_token" });
      throw new ApiError(401, "Invalid refresh token");
    }
    if (session.revokedAt) {
      logger.warn("Refresh token rejected", {
        userId: session.userId.toString(),
        reason: "revoked",
      });
      throw new ApiError(401, "Refresh token has been revoked");
    }
    if (session.expiresAt && session.expiresAt.getTime() <= Date.now()) {
      logger.warn("Refresh token rejected", {
        userId: session.userId.toString(),
        reason: "expired",
      });
      throw new ApiError(401, "Refresh token has expired");
    }
    const user = await UserModel.findById(session.userId);
    if (!user) {
      logger.warn("Refresh token rejected", {
        userId: session.userId.toString(),
        reason: "user_not_found",
      });
      throw new ApiError(404, "User not found");
    }

    const revokeResult = await SessionModel.updateOne(
      { _id: session._id, revokedAt: null },
      { $set: { revokedAt: new Date() } },
    ); // revoke the refresh token

    if (revokeResult.modifiedCount !== 1) {
      logger.warn("Refresh token reuse detected", {
        userId: session.userId.toString(),
        familyId: session.familyId.toString(),
      });
      throw new ApiError(401, "Refresh token has already been used");
    }
    const { accessToken, refreshToken: newRefreshToken } =
      await createAuthSession(user, session.familyId); // create a new access token and refresh token
    logger.info("Access token refreshed", { userId: user._id.toString() });

    return {
      accessToken,
      newRefreshToken,
    };
  }

  async logout(refreshToken?: string) {
    if (!refreshToken) {
      logger.warn("Logout rejected", { reason: "missing_token" });
      throw new ApiError(401, "Refresh token is required");
    }
    const result = await SessionModel.updateOne(
      { refreshTokenHash: hashRefreshToken(refreshToken) },
      { $set: { revokedAt: new Date() } },
    );
    logger.info("Logout processed", {
      sessionRevoked: result.modifiedCount === 1,
    });
    return {
      message: "Logged out successfully",
    };
  }

  async forgotPassword(email: string) {
    if (!email) {
      logger.warn("Forgot password rejected", { reason: "missing_field" });
      throw new ApiError(400, "Email is required");
    }
    const normalizedEmail = email.trim().toLowerCase();

    const user = await UserModel.findOne({
      email: normalizedEmail,
    });
    if (!user) {
      logger.info("Forgot password requested");
      return {
        message:
          "If an account exists with this email, password reset instructions will be sent.",
      };
    }
    const { resetToken, hashedToken, expiresAt } = generateResetToken();
    user.passwordResetTokenHash = hashedToken;
    user.passwordResetTokenExpiresAt = expiresAt;
    await user.save();
    await sendEmail({
      to: user.email,
      subject: "Reset Password Request",
      html: resetPasswordEmail({
        username: user.username,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      }),
    });

    logger.info("Forgot password email sent", { userId: user._id.toString() });
    return;
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = hashRefreshToken(token);
    const user = await UserModel.findOne({
      passwordResetTokenHash: hashedToken,
    }).select("+passwordResetTokenHash +passwordResetTokenExpiresAt");

    if (!user) {
      logger.warn("Reset password rejected", { reason: "invalid_token" });
      throw new ApiError(401, "Invalid reset token");
    }

    if (
      !user.passwordResetTokenExpiresAt ||
      user.passwordResetTokenExpiresAt.getTime() <= Date.now()
    ) {
      logger.warn("Reset password rejected", {
        userId: user._id.toString(),
        reason: "expired_token",
      });
      throw new ApiError(401, "Reset token has expired");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetTokenHash = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save();
    await SessionModel.updateMany(
      {
        userId: user._id,
        revokedAt: null,
      },
      {
        $set: { revokedAt: new Date() },
      },
    );
    logger.info("Password reset successfully", { userId: user._id.toString() });
    return;
  }
}

export const authService = new AuthService();
