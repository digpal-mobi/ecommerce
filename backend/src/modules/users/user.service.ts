import { UserModel, IUser } from "./user.model";
import { ApiError } from "../../utils/ApiError";
import logger from "../../utils/logger";

export class UserService {
  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find();
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      logger.warn("User not found", { userId: id });
      throw new ApiError(404, "User not found");
    }
    return user;
  }
}

export const userService = new UserService();

