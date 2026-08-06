import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FetchProducts, FetchProductsByCategory } from "@/website/utils/api";

interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
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
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "/products",
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      // Make an HTTP GET request to the API
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
  "/products-by-category",
  async (
    categoryName: string,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      // Make an HTTP GET request to the API
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

export default productSlice.reducer;
