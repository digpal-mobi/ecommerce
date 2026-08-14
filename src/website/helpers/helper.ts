import CurrencyRates from "@/website/data/CurrencyRates";

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

export const FormatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const CurrencyConverter = (amount: number, currency: string) => {
  const rates = CurrencyRates.find((rate) => rate.id === currency);
  if (rates) {

    const convertedAmount = (amount * rates.rate).toFixed(2)
    return `${rates.label} ${convertedAmount}`
  }
}


export const GetPaginationPages = (totalPages: number, currentPage: number) => {
  const pagesToShow = 3;
  
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - pagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return {
    startPage,
    endPage,
    pages
  }
}
