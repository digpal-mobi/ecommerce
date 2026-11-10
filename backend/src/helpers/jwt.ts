import jwt, { SignOptions } from "jsonwebtoken";
import { AccessTokenPayload } from "../types/User";
import crypto from "crypto";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";

export const generateAccessToken = (
  payload: AccessTokenPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"] = "15m"
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
  });
};

export const createAccessToken = (
  payload: AccessTokenPayload
): string => {
  return generateAccessToken(
    payload,
    env.JWT_ACCESS_SECRET,
    env.JWT_ACCESS_EXPIRATION as SignOptions["expiresIn"]
  );
};

export const verifyAccessToken = (
  token: string,
  secret: string
): AccessTokenPayload => {
  try {
    const decodedToken = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });

    if (typeof decodedToken === "string") {
      throw new ApiError(401, "Invalid access token");
    }

    if (
      decodedToken.tokenType !== "access" ||
      typeof decodedToken.sub !== "string" ||
      decodedToken.sub.length === 0 ||
      !["user", "admin"].includes(decodedToken.role as string)
    ) {
      throw new ApiError(401, "Invalid access token");
    }

    return decodedToken as unknown as AccessTokenPayload;
  } catch (error) {
    if (error instanceof ApiError) {
      logger.warn("Access token rejected", { reason: error.message });
      throw error;
    }

    if (error instanceof jwt.TokenExpiredError) {
      logger.warn("Access token rejected", { reason: "expired" });
      throw new ApiError(401, "Access token expired");
    }

    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError
    ) {
      logger.warn("Access token rejected", { reason: "invalid" });
      throw new ApiError(401, "Invalid or expired access token");
    }

    logger.error("Access token verification failed", { error });
    throw error;
  }
};

export const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
}

export const hashRefreshToken = (token: string) => {
 return crypto.createHash("sha256").update(token).digest("hex");
}