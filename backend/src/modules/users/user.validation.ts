export const validateCreateUser = (data: unknown) => {
  const payload = data as { name?: string; email?: string; password?: string };
  const errors: string[] = [];

  if (!payload?.name) errors.push("Name is required");
  if (!payload?.email) errors.push("Email is required");
  if (!payload?.password || payload.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

