import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

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

    // Attach user payload to request (can be verified with jwt when jwt is integrated)
    // req.user = decodedUser;

    next();
  } catch (error) {
    next(error);
  }
};

