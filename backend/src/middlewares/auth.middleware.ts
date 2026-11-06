import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyAccessToken } from "../helpers/jwt";
import { env } from "../config/env";
import logger from "../utils/logger";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("Authentication failed", {
        path: req.originalUrl,
        reason: "missing_token",
      });
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const [scheme, token] = authHeader.trim().split(/\s+/); // Bearer <token>

    if (scheme !== "Bearer" || !token) {
      logger.warn("Authentication failed", {
        path: req.originalUrl,
        reason: "invalid_header",
      });
      throw new ApiError(401, "Invalid authorization header");
    }

    const decodedToken = verifyAccessToken(token, env.JWT_ACCESS_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};
