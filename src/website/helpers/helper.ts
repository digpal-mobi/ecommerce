export const RoundRating = (rating: number) => {
  return Math.round(rating * 2) / 2;
};

export const ConvertToFinalPrice = (
  price: number,
  discountPercentage: number,
) => {
  const discountAmount = (discountPercentage / 100) * price;
  return Number.parseFloat((price - discountAmount).toFixed(2));
};