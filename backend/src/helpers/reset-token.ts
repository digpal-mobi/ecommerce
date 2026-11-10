import { randomBytes, createHash } from "crypto";

export const generateResetToken = () => {
  const resetToken = randomBytes(32).toString("hex");

  const hashedToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return {
    resetToken,
    hashedToken,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };
};