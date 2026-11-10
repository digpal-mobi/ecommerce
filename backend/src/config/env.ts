import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5001",
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",

  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3002",

  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",

  
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "15m",

  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || "7d",

  REFRESH_TOKEN_TTL_IN_MS: Number(process.env.REFRESH_TOKEN_TTL_IN_MS) || 604800000,
};

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is required");
}
if (!process.env.JWT_ACCESS_EXPIRATION) {
  throw new Error("JWT_ACCESS_EXPIRATION is required");
}
if (!process.env.REFRESH_TOKEN_EXPIRATION) {
  throw new Error("REFRESH_TOKEN_EXPIRATION is required");
}