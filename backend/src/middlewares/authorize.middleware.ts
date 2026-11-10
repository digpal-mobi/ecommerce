
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { AccessTokenPayload } from "../types/User";
import logger from "../utils/logger";

export const authorize = (
  ...requiredRoles: AccessTokenPayload["role"][]
) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    const user = req.user;

    if (!user) {
      logger.warn("Authorization failed", {
        path: req.originalUrl,
        reason: "missing_user",
      });
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!requiredRoles.includes(user.role)) {
      logger.warn("Authorization failed", {
        path: req.originalUrl,
        userId: user.sub,
        role: user.role,
        reason: "insufficient_role",
      });
      return next(new ApiError(403, "Forbidden"));
    }

    next();
  };
};
