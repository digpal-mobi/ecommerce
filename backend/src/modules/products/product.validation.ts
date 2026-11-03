export const validateCreateProduct = (data: unknown) => {
  const payload = data as {
    title?: string;
    description?: string;
    price?: number;
    category?: string;
  };
  const errors: string[] = [];

  if (!payload?.title) errors.push("Title is required");
  if (!payload?.description) errors.push("Description is required");
  if (payload?.price === undefined || typeof payload.price !== "number" || payload.price < 0) {
    errors.push("Price must be a non-negative number");
  }
  if (!payload?.category) errors.push("Category is required");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

