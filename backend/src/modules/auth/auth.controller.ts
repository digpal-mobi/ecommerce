import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { Request, Response } from "express";

export class AuthController {
  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    res.status(200).json({ message: "Login endpoint reached" });
  });
}

export const authController = new AuthController();
