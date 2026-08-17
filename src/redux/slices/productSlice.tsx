import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  FetchProducts,
  FetchProductsByCategory,
  FetchSearchedProducts,
} from "@/website/utils/api";

interface ProductState {
  products: any[];
  searchProducts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  searchProducts: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch products";
      })
      // search by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data || [];
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch products by category";
      })
      // search Products
      .addCase(fetchSearchedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data || [];
      })

      .addCase(fetchSearchedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to search products";
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "/products",
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const {
        status,
        message,
        products: data,
      } = await FetchProducts({ limit: 10, skip: 0 });
      if (status === true) {
        return fulfillWithValue({ data });
      } else {
        return rejectWithValue(message);
      }
    } catch (error: any) {
      console.error("Error fetching card resources:", error);
      return rejectWithValue(error?.message);
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "Product/fetchProductsByCategory",
  async (
    categoryName: string,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const {
        status,
        message,
        products: data,
      } = await FetchProductsByCategory(categoryName);
      if (status === true) {
        return fulfillWithValue({ data });
      } else {
        return rejectWithValue(message);
      }
    } catch (error: any) {
      console.error("Error fetching card resources:", error);
      return rejectWithValue(error?.message);
    }
  },
);

export const fetchSearchedProducts = createAsyncThunk(
  "Product/fetchSearchedProducts",
  async (
    { query }: { query: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const response = await FetchSearchedProducts({ query });

      if (response.status && Array.isArray(response.products)) {
        return fulfillWithValue({ data: response.products });
      } else {
        return rejectWithValue(response.message || "Failed to search products");
      }
    } catch (error: any) {
      console.error("Error fetching searched products:", error);
      return rejectWithValue(error?.message || "Something went wrong");
    }
  },
);

export default productSlice.reducer;
