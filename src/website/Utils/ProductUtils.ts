import type { Product } from "@/types/ProductType";

import {
  MAX_PRICE,
  MIN_PRICE,
  type FilterValues,
} from "@/redux/slices/filterSlice";

import type {
  SortBy,
  SortOrder,
} from "@/redux/slices/sortingSlice";

export const hasActiveFilters = (
  filters: FilterValues,
): boolean => {
  return (
    filters.category.length > 0 ||
    filters.brand.length > 0 ||
    (filters.minPrice !== null &&
      filters.minPrice > MIN_PRICE) ||
    (filters.maxPrice !== null &&
      filters.maxPrice < MAX_PRICE) ||
    filters.rating !== null ||
    filters.color !== null ||
    filters.size !== null ||
    filters.dressStyle !== null
  );
};

export const filterProducts = (
  products: Product[],
  filters: FilterValues,
): Product[] => {
  return products.filter((product) => {
    // Category
    if (filters.category.length > 0) {
      const productCategory =
        product.category.toLowerCase();

      const matchesCategory = filters.category.some(
        (category) =>
          category.toLowerCase() === productCategory,
      );

      if (!matchesCategory) {
        return false;
      }
    }

    // Brand
    if (filters.brand.length > 0) {
      const productBrand =
        product.brand.toLowerCase();

      const matchesBrand = filters.brand.some(
        (brand) =>
          brand.toLowerCase() === productBrand,
      );

      if (!matchesBrand) {
        return false;
      }
    }

    // Price
    if (
      filters.minPrice !== null &&
      product.price < filters.minPrice
    ) {
      return false;
    }

    if (
      filters.maxPrice !== null &&
      product.price > filters.maxPrice
    ) {
      return false;
    }

    // Rating
    if (
      filters.rating !== null &&
      product.rating < filters.rating
    ) {
      return false;
    }

    return true;
  });
};

export const sortProducts = (
  products: Product[],
  sortBy: SortBy,
  sortOrder: SortOrder,
): Product[] => {
  return [...products].sort((a, b) => {
    const aValue = Number(a[sortBy] ?? 0);
    const bValue = Number(b[sortBy] ?? 0);

    return sortOrder === "asc"
      ? aValue - bValue
      : bValue - aValue;
  });
};

export const paginateProducts = (
  products: Product[],
  currentPage: number,
  limit: number,
): Product[] => {
  const startIndex = (currentPage - 1) * limit;

  return products.slice(
    startIndex,
    startIndex + limit,
  );
};