import { UserModel } from "../users/user.model";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcrypt"

export class AuthService {
  async login(email: string, enteredPassword: string) {
    if (!email || !enteredPassword) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !user.password) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(enteredPassword, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Password is not valid");
    }

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(email: string, password: string, username: string) {
    if (!email || !username || !password) {
      throw new ApiError(400, "All fields are required to filled ");
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    return {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    };
  }
}

export const authService = new AuthService();
