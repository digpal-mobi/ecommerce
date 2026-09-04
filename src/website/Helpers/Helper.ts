import CurrencyRates from "@/website/Data/CurrencyRates";

export const setCookie = (name: string, value: string, days?: number) => {
  if (typeof document === "undefined") return;

  const expires = days
    ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
    : "";

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieVal = parts.pop()?.split(";").shift() ?? null;
    return cookieVal ? decodeURIComponent(cookieVal) : null;
  }
  return null;
};

export const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie =
    name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};


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
    const convertedAmount = formatPrice(rates.rate * amount);
    return `<span class="mr-[-6px]">${rates.label} </span>${convertedAmount}`;
  }

  return `$${formatPrice(amount)}`;
};


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


export function formatPrice(number: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(number) || 0);
}