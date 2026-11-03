import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export type ValidationFunction = (data: unknown) => { isValid: boolean; errors?: string[] };

export const validateRequest = (validator: ValidationFunction) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const validationResult = validator(req.body);
    if (!validationResult.isValid) {
      next(new ApiError(400, "Validation Error", validationResult.errors || []));
      return;
    }
    next();
  };
};

