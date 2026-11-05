import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { authService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const result = await authService.login(email, password);

    res.status(200).json(new ApiResponse(200, result, "Login successful"));
  });

  registerUser = asyncHandler(async(req: Request, res: Response) => {
    const {email, password,username} = req.body
    if(!email || !password || !username){
      throw new ApiError(400, "Email, password and name are required");
    }
    const result = await authService.register(email, password,username);
    res.status(200).json(new ApiResponse(200, result, "Registration successful"));
  })

  refreshToken = asyncHandler(async(req:Request, res:Response) => {
  })
}

export const authController = new AuthController();
