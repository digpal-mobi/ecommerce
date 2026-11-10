
import { transporter } from "../../config/mail";
import { env } from "../../config/env";
import logger from "../../utils/logger";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to,
      subject,
      html,
    });
    logger.info("Email sent", { to, subject });
  } catch (error) {
    logger.error("Failed to send email", { to, subject, error });
    throw error;
  }
};
