import { Request, Response } from "express";
import { userService } from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

export class UserController {
  getUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await userService.getUserById(id);
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
  });
}

export const userController = new UserController();