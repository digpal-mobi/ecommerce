import nodemailer from "nodemailer";
import { env } from "./env";

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER, // Your email address
    pass: env.EMAIL_PASSWORD // Your app password
  }
});