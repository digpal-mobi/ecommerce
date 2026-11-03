import mongoose from "mongoose";
import { env } from "./env";

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }
    const connection = await mongoose.connect(env.DATABASE_URL);
    console.log(`Database connected successfully: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

