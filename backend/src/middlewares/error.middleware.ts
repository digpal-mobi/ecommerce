import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  const errors = err instanceof ApiError ? err.errors : [];

  const details = {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    errors,
  };

  if (statusCode >= 500) {
    logger.error(message, { ...details, stack: err.stack });
  } else {
    logger.warn(message, details);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

