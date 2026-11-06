import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { ApiError } from "./utils/ApiError";
import cors from "cors"
import requestLogger from "./middlewares/requestLogger.middleware";
import { env } from "./config/env";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    if (origin === env.FRONTEND_URL || !origin) {
      callback(null, true);
    } else {
      logger.warn("CORS origin rejected", { origin });
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(requestLogger);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Catch 404
app.use((req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, `Not found: ${req.originalUrl}`));
});

// Error handling middleware
app.use(errorHandler);

export default app;
