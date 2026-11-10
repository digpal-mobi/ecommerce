import mongoose from "mongoose";
import { env } from "./env";
import logger from "../utils/logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }
    const connection = await mongoose.connect(env.DATABASE_URL);
    logger.info("Database connected", { host: connection.connection.host });
  } catch (error) {
    logger.error("Database connection failed", { error });
    process.exit(1);
  }
};

