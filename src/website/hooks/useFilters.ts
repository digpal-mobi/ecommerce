"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setCategory,
  setBrand,
  setMinPrice,
  setMaxPrice,
  setRating,
  setSort,
  setColor,
  setSize,
  setDressStyle,
  clearAllFilter,
} from "@/redux/slices/filterSlice";

export const useFilters = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterState = useSelector((state) => state.filter);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam !== null) {
      const categories = categoryParam ? categoryParam.split(",") : [];
      dispatch(setCategory(categories));
    }

    const minPriceParam = searchParams.get("minPrice");
    if (minPriceParam !== null) {
      dispatch(setMinPrice(Number(minPriceParam)));
    }

    const maxPriceParam = searchParams.get("maxPrice");
    if (maxPriceParam !== null) {
      dispatch(setMaxPrice(Number(maxPriceParam)));
    }

    const colorParam = searchParams.get("color");
    dispatch(setColor(colorParam || null));

    const sizeParam = searchParams.get("size");
    dispatch(setSize(sizeParam || null));

    const dressStyleParam = searchParams.get("dressStyle");
    dispatch(setDressStyle(dressStyleParam || null));

    const brandParam = searchParams.get("brand");
    if (brandParam !== null) {
      const brands = brandParam ? brandParam.split(",") : [];
      dispatch(setBrand(brands));
    }

    const ratingParam = searchParams.get("rating");
    if (ratingParam !== null) {
      dispatch(setRating(Number(ratingParam)));
    }

    const sortParam = searchParams.get("sort");
    if (sortParam !== null) {
      dispatch(setSort(sortParam));
    }
  }, [searchParams, dispatch]);

  const updateUrlParams = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : searchParams.toString()
      );

      // Reset pagination to page 1 whenever filters change
      params.delete("page");

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (key === "minPrice" && Number(value) === 0) ||
          (key === "maxPrice" && Number(value) === 3000)
        ) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

      // Immediately update browser URL bar without waiting for RSC roundtrip
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", targetUrl);
      }

      // Trigger Next.js router transition for Server Components
      router.replace(targetUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const toggleCategory = useCallback(
    (categoryValue: string) => {
      const isSelected = filterState.category.includes(categoryValue);
      const updatedCategories = isSelected
        ? filterState.category.filter((cat) => cat !== categoryValue)
        : [...filterState.category, categoryValue];

      dispatch(setCategory(updatedCategories));
      updateUrlParams({
        category: updatedCategories.length > 0 ? updatedCategories.join(",") : null,
      });
    },
    [dispatch, filterState.category, updateUrlParams]
  );

  // selecting color
  const toggleColor = useCallback(
    (colorName: string) => {
      const nextColor = filterState.color === colorName ? null : colorName;
      dispatch(setColor(nextColor));
      updateUrlParams({ color: nextColor });
    },
    [dispatch, filterState.color, updateUrlParams]
  );

  // selecting size
  const toggleSize = useCallback(
    (sizeName: string) => {
      const nextSize = filterState.size === sizeName ? null : sizeName;
      dispatch(setSize(nextSize));
      updateUrlParams({ size: nextSize });
    },
    [dispatch, filterState.size, updateUrlParams]
  );

  // Dress Style selecting
  const toggleDressStyle = useCallback(
    (styleName: string) => {
      const nextStyle = filterState.dressStyle === styleName ? null : styleName;
      dispatch(setDressStyle(nextStyle));
      updateUrlParams({ dressStyle: nextStyle });
    },
    [dispatch, filterState.dressStyle, updateUrlParams]
  );

  const setMinPriceValue = useCallback(
    (value: number) => {
      dispatch(setMinPrice(value));
    },
    [dispatch]
  );

  const setMaxPriceValue = useCallback(
    (value: number) => {
      dispatch(setMaxPrice(value));
    },
    [dispatch]
  );

  // Apply Price range to URL (accepts optional explicit values)
  const applyPriceFilter = useCallback(
    (customMin?: number, customMax?: number) => {
      const min = customMin !== undefined ? customMin : filterState.minPrice;
      const max = customMax !== undefined ? customMax : filterState.maxPrice;
      updateUrlParams({
        minPrice: min,
        maxPrice: max,
      });
    },
    [filterState.minPrice, filterState.maxPrice, updateUrlParams]
  );

  // Clear all filters
  const resetFilters = useCallback(() => {
    dispatch(clearAllFilter());
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", pathname);
    }
    router.replace(pathname, { scroll: false });
  }, [dispatch, pathname, router]);

  return {
    ...filterState,
    toggleCategory,
    toggleColor,
    toggleSize,
    toggleDressStyle,
    setMinPriceValue,
    setMaxPriceValue,
    applyPriceFilter,
    resetFilters,
  };
};

