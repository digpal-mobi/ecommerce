import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../helper/jwt";
import { env } from "../config/env";
import { jwtUser } from "../types/User";

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Unauthorized: Invalid token format");
    }

    const decodedToken = verifyToken<jwtUser>(token, env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};

