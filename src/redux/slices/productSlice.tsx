import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  FetchCategory,
  FetchProducts,
  FetchSearchedProducts,
} from "@/website/utils/api";
import { Product } from "@/types/ProductType";
import {
  filterProducts,
  hasActiveFilters,
  paginateProducts,
  sortProducts,
} from "@/website/utils/ProductUtils";
import { setTotal } from "@/redux/slices/paginationSlice";
import { RootState } from "@/redux/store";

interface ProductState {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload as any;
        state.categories = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.categories)
              ? payload.categories
              : [];
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch categories";
      })

      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch products";
      })

      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to search products";
      });
  },
});

export const getCategories = createAsyncThunk(
  "product/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchCategory();

      if (response.status === false) {
        return rejectWithValue(
          response.message || "Failed to fetch categories",
        );
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch categories");
    }
  },
);

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",

  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      const filters = state.filter.filters;

      const { sortBy, sortOrder } = state.sorting;

      const { currentPage, limit } = state.pagination;

      const activeFilters = hasActiveFilters(filters);

      const skip = (currentPage - 1) * limit;

      const response = await FetchProducts({
        category: filters.category.length > 0 ? filters.category : undefined,

        brand: filters.brand.length > 0 ? filters.brand : undefined,

        color: filters.color || undefined,

        size: filters.size || undefined,

        dressStyle: filters.dressStyle || undefined,

        minPrice: filters.minPrice ?? undefined,

        maxPrice: filters.maxPrice ?? undefined,

        rating: filters.rating ?? undefined,

        limit: activeFilters ? 0 : limit,

        skip: activeFilters ? 0 : skip,

        sortBy: activeFilters ? undefined : sortBy,

        order: activeFilters ? undefined : sortOrder,
      });

      if (response.status === false) {
        return rejectWithValue(response.message || "Failed to fetch products");
      }

      let products: Product[] = Array.isArray(response.products)
        ? response.products
        : [];

      if (activeFilters) {
        products = filterProducts(products, filters);

        products = sortProducts(products, sortBy, sortOrder);
      }

      const total = activeFilters
        ? products.length
        : (response.total ?? products.length);

      if (activeFilters) {
        products = paginateProducts(products, currentPage, limit);
      }

      dispatch(setTotal(total));

      return {
        data: products,
        total,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch products");
    }
  },
);

export const searchProducts = createAsyncThunk(
  "product/searchProducts",

  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      const filters = state.filter.filters;

      const { sortBy, sortOrder } = state.sorting;

      const { currentPage, limit } = state.pagination;

      const skip = (currentPage - 1) * limit;

      const response = await FetchSearchedProducts({
        query: filters.q,
      });

      if (response.status === false || !Array.isArray(response.products)) {
        return rejectWithValue(response.message || "Failed to search products");
      }

      let products: Product[] = response.products;

      products = filterProducts(products, filters);

      products = sortProducts(products, sortBy, sortOrder);

      const total = products.length;

      products = paginateProducts(products, currentPage, limit);

      dispatch(setTotal(total));

      return {
        data: products,
        total,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to search products");
    }
  },
);

export default productSlice.reducer;
