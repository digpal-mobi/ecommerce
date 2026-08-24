import { DEFAULT_FILTERS, FilterValues } from "@/redux/slices/filterSlice";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/redux/slices/paginationSlice";
import { SortBy, SortOrder } from "@/redux/slices/sortingSlice";

const parseNumberParam = (
  value: string | null,
  fallback: number | null,
): number | null => {
  if (value === null) {
    return fallback;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

export const getFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): FilterValues => {
  const categoryParam = searchParams.get("category");

  const brandParam = searchParams.get("brand");

  const minPriceParam = searchParams.get("minPrice");

  const maxPriceParam = searchParams.get("maxPrice");

  const ratingParam = searchParams.get("rating");

  return {
    category: categoryParam
      ? [categoryParam.split(",").filter(Boolean)[0]].filter(Boolean)
      : DEFAULT_FILTERS.category,

    brand: brandParam
      ? brandParam.split(",").filter(Boolean)
      : DEFAULT_FILTERS.brand,

    minPrice: parseNumberParam(minPriceParam, DEFAULT_FILTERS.minPrice),

    maxPrice: parseNumberParam(maxPriceParam, DEFAULT_FILTERS.maxPrice),

    rating: parseNumberParam(ratingParam, DEFAULT_FILTERS.rating),

    color: searchParams.get("color") ?? null,

    size: searchParams.get("size") ?? null,

    dressStyle: searchParams.get("dressStyle") ?? null,

    q: searchParams.get("q") ?? "",
  };
};

export const filtersToSearchParams = (
  filters: FilterValues,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.category.length > 0) {
    params.set("category", filters.category.join(","));
  }

  if (filters.brand.length > 0) {
    params.set("brand", filters.brand.join(","));
  }

  if (
    filters.minPrice !== null &&
    filters.minPrice !== DEFAULT_FILTERS.minPrice
  ) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (
    filters.maxPrice !== null &&
    filters.maxPrice !== DEFAULT_FILTERS.maxPrice
  ) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.rating !== null) {
    params.set("rating", String(filters.rating));
  }

  if (filters.color !== null) {
    params.set("color", filters.color);
  }

  if (filters.size !== null) {
    params.set("size", filters.size);
  }

  if (filters.dressStyle !== null) {
    params.set("dressStyle", filters.dressStyle);
  }

  if (filters.q.trim()) {
    params.set("q", filters.q.trim());
  }

  return params;
};

export const getSortingFromSearchParams = (
  searchParams: URLSearchParams,
): {
  sortBy: SortBy;
  sortOrder: SortOrder;
} => {
  const sortByParam = searchParams.get("sortBy");

  const sortOrderParam = searchParams.get("sortOrder");

  return {
    sortBy: sortByParam === "price" ? "price" : "price",

    sortOrder: sortOrderParam === "desc" ? "desc" : "asc",
  };
};

export const sortingToSearchParams = (
  sortBy: SortBy,
  sortOrder: SortOrder,
): URLSearchParams => {
  const params = new URLSearchParams();

  params.set("sortBy", sortBy);
  params.set("sortOrder", sortOrder);

  return params;
};

export const getPaginationFromSearchParams = (
  searchParams: URLSearchParams,
) => {
  const pageParam = searchParams.get("page");

  const limitParam = searchParams.get("limit");

  const page = Number(pageParam);
  const limit = Number(limitParam);

  return {
    currentPage: Number.isFinite(page) && page > 0 ? page : DEFAULT_PAGE,

    limit: Number.isFinite(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
  };
};

export const paginationToSearchParams = (
  currentPage: number,
  limit: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (currentPage !== DEFAULT_PAGE) {
    params.set("page", String(currentPage));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  return params;
};
