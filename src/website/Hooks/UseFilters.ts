"use client";

import { useCallback, useEffect, useMemo } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDispatch, useSelector } from "@/redux/store";

import {
  clearAllFilter,
  DEFAULT_FILTERS,
  FilterValues,
  MIN_PRICE,
  MAX_PRICE,
  setFilters,
} from "@/redux/slices/filterSlice";

import {
  setSortBy,
  setSortOrder,
  resetSorting,
  type SortBy,
  type SortOrder,
} from "@/redux/slices/sortingSlice";

import { setCurrentPage, setLimit } from "@/redux/slices/paginationSlice";
import {
  getFiltersFromSearchParams,
  getPaginationFromSearchParams,
  getSortingFromSearchParams,
} from "@/website/Utils/ProductUrl";

export const useFilters = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const storedFilters = useSelector((state) => state.filter.filters);
  const sorting = useSelector((state) => state.sorting);

  const pagination = useSelector((state) => state.pagination);

  useEffect(() => {
    const urlFilters = getFiltersFromSearchParams(searchParams);

    const urlSorting = getSortingFromSearchParams(searchParams);

    const urlPagination = getPaginationFromSearchParams(searchParams);

    dispatch(setFilters(urlFilters));

    dispatch(setSortBy(urlSorting.sortBy));

    dispatch(setSortOrder(urlSorting.sortOrder));

    dispatch(setCurrentPage(urlPagination.currentPage));

    dispatch(setLimit(urlPagination.limit));
  }, [searchParams, dispatch]);

  const filters = useMemo(
    () => ({
      ...DEFAULT_FILTERS,
      ...storedFilters,
    }),
    [storedFilters],
  );
  const replaceUrl = useCallback(
    (params: URLSearchParams) => {
      const queryString = params.toString();

      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(targetUrl, {
        scroll: false,
      });
    },
    [pathname, router],
  );
  const updateUrlParams = useCallback(
    (updates: Partial<FilterValues>) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("page");

      dispatch(setCurrentPage(1));

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          params.delete(key);
          return;
        }

        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      });

      replaceUrl(params);
    },
    [searchParams, dispatch, replaceUrl],
  );
  const applyFilters = useCallback(
    (updates: Partial<FilterValues>) => {
      dispatch(setFilters(updates));

      updateUrlParams(updates);
    },
    [dispatch, updateUrlParams],
  );
  const toggleCategory = useCallback(
    (categoryValue: string) => {
      const current = filters.category;
      const isSelected = current.includes(categoryValue);
      const nextCategory = isSelected ? [] : [categoryValue];

      applyFilters({
        category: nextCategory,
      });
    },
    [filters.category, applyFilters],
  );

  const toggleColor = useCallback(
    (colorName: string) => {
      const color = filters.color === colorName ? null : colorName;

      applyFilters({
        color,
      });
    },
    [filters.color, applyFilters],
  );

  const toggleSize = useCallback(
    (sizeName: string) => {
      const size = filters.size === sizeName ? null : sizeName;

      applyFilters({
        size,
      });
    },
    [filters.size, applyFilters],
  );

  const toggleDressStyle = useCallback(
    (styleName: string) => {
      const dressStyle = filters.dressStyle === styleName ? null : styleName;

      applyFilters({
        dressStyle,
      });
    },
    [filters.dressStyle, applyFilters],
  );

  const setMinPriceValue = useCallback(
    (value: number) => {
      dispatch(
        setFilters({
          minPrice: value,
        }),
      );
    },
    [dispatch],
  );

  const setMaxPriceValue = useCallback(
    (value: number) => {
      dispatch(
        setFilters({
          maxPrice: value,
        }),
      );
    },
    [dispatch],
  );

  const applyPriceFilter = useCallback(
    (customMin?: number, customMax?: number) => {
      const minPrice = customMin ?? filters.minPrice ?? MIN_PRICE;

      const maxPrice = customMax ?? filters.maxPrice ?? MAX_PRICE;

      applyFilters({
        minPrice,
        maxPrice,
      });
    },
    [filters.minPrice, filters.maxPrice, applyFilters],
  );

  const resetFilters = useCallback(() => {
    dispatch(clearAllFilter());

    dispatch(setCurrentPage(1));

    const params = new URLSearchParams(searchParams.toString());

    [
      "category",
      "brand",
      "minPrice",
      "maxPrice",
      "rating",
      "color",
      "size",
      "dressStyle",
      "q",
    ].forEach((key) => {
      params.delete(key);
    });

    params.delete("page");

    replaceUrl(params);
  }, [dispatch, searchParams, replaceUrl]);

  const applySorting = useCallback(
    (sortBy: SortBy, sortOrder: SortOrder) => {
      dispatch(setSortBy(sortBy));
      dispatch(setSortOrder(sortOrder));

      const params = new URLSearchParams(searchParams.toString());

      params.delete("sortBy");
      params.delete("sortOrder");

      if (sortBy !== "price") {
        params.set("sortBy", sortBy);
      }

      if (sortOrder !== "asc") {
        params.set("sortOrder", sortOrder);
      }

      params.delete("page");

      dispatch(setCurrentPage(1));

      replaceUrl(params);
    },
    [dispatch, searchParams, replaceUrl],
  );

  const changePage = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));

      const params = new URLSearchParams(searchParams.toString());

      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }

      replaceUrl(params);
    },
    [dispatch, searchParams, replaceUrl],
  );

  const changeLimit = useCallback(
    (limit: number) => {
      dispatch(setLimit(limit));

      const params = new URLSearchParams(searchParams.toString());

      params.delete("page");

      if (limit === 9) {
        params.delete("limit");
      } else {
        params.set("limit", String(limit));
      }

      replaceUrl(params);
    },
    [dispatch, searchParams, replaceUrl],
  );

  const resetSortingState = useCallback(() => {
    dispatch(resetSorting());

    const params = new URLSearchParams(searchParams.toString());

    params.delete("sortBy");
    params.delete("sortOrder");

    params.delete("page");

    dispatch(setCurrentPage(1));

    replaceUrl(params);
  }, [dispatch, searchParams, replaceUrl]);

  return {
    filters,

    applyFilters,

    toggleCategory,
    toggleColor,
    toggleSize,
    toggleDressStyle,

    setMinPriceValue,
    setMaxPriceValue,
    applyPriceFilter,

    resetFilters,

    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder,
    applySorting,
    resetSorting: resetSortingState,

    // Pagination
    currentPage: pagination.currentPage,
    limit: pagination.limit,
    total: pagination.total,
    changePage,
    changeLimit,
  };
};
