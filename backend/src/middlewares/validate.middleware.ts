import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import logger from '../utils/logger';

export function validateRequest(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          message: `${issue.path.join('.')}: ${issue.message}`,
        }));
        logger.warn("Request validation failed", {
          method: req.method,
          path: req.originalUrl,
          errors: errorMessages,
        });
        return res.status(400).json({
          error: 'Invalid data',
          details: errorMessages,
        });
      }
      logger.error("Request validation failed unexpectedly", {
        method: req.method,
        path: req.originalUrl,
        error,
      });
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  };
}


