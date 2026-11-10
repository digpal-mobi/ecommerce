import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { authService } from "./auth.service";
import { Request, Response } from "express";
import { env } from "../../config/env";
import { ApiError } from "../../utils/ApiError";

export const refreshCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/auth",
  maxAge: Number(env.REFRESH_TOKEN_TTL_IN_MS),
};

export class AuthController {
  private setRefreshCookie(res: Response, token: string) {
    res.cookie("refreshToken", token, refreshCookieOptions);
  }

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.body;

    const result = await authService.login(id, password);

    const { refreshToken, ...responseData } = result;

    this.setRefreshCookie(res, refreshToken);
    
    res.status(200).json(
      new ApiResponse(200, responseData, "Login successful")
    );
  });

  registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    const result = await authService.register(email, password, username);
    res
      .status(201)
      .json(new ApiResponse(201, result, "Registration successful. Please check your email for the verification code."));
  });

  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;
    const result = await authService.verifyEmail(token);

    const { refreshToken, ...responseData } = result;

    this.setRefreshCookie(res, refreshToken);

    res
      .status(200)
      .json(new ApiResponse(200, responseData, "Email verified successfully"));
  });

  getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.getCurrentUser(req.user?.sub as string);
    res
      .status(200)
      .json(new ApiResponse(200, user, "Current user fetched successfully"));
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw new ApiError
      (401, "Refresh token is required");
    }

    const result = await authService.refreshToken(token);

    const { newRefreshToken, ...responseData } = result;

    this.setRefreshCookie(res, newRefreshToken);

    res
      .status(200)
      .json(new ApiResponse(200, responseData, "Token refreshed successfully"));
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    await authService.logout(token);
    res.clearCookie("refreshToken", refreshCookieOptions);
    res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
  });

  forgotPassword = asyncHandler(async (req:Request, res:Response) => {
    const {email} = req.body;
    const result = await authService.forgotPassword(email);
    res.status(200).json(new ApiResponse(200, result, "If an account exists with this email, password reset instructions will be sent."));
  })

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const {token, newPassword } = req.body;

    const result = await authService.resetPassword(token,
      newPassword
    )

    res.status(200).json(new ApiResponse(200, result, "Password Changed successfully"))
  })
}

export const authController = new AuthController();
