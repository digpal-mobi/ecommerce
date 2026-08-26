import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AddToCartApi,
  UpdateCartApi,
  GetUserCartApi,
} from "@/website/Utils/Api";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  total?: number;
  discountPercentage?: number;
  discountedTotal?: number;
}

export interface CartState {
  cartId: number | null;
  userId: number | null;
  products: CartProduct[];
  quantity: number;
  total: number;
  discountedTotal: number;
  isLoading: boolean;
  error: string | null;
  isMiniCartOpen: boolean;
}

const initialState: CartState = {
  cartId: null,
  userId: null,
  products: [],
  quantity: 0,
  total: 0,
  discountedTotal: 0,
  isLoading: false,
  error: null,
  isMiniCartOpen: false,
};

// 1. GET User Cart
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (userId: number = 5, { rejectWithValue }) => {
    try {
      const response = await GetUserCartApi(userId);
      if (response.status === false) {
        return rejectWithValue(response.message ?? "Failed to fetch user cart");
      }
      const cart =
        response.carts && response.carts.length > 0 ? response.carts[0] : null;
      return cart;
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Failed to fetch user cart");
    }
  },
);

// 2. Add to Cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (
    {
      product,
      userId = 1,
    }: {
      product: CartProduct;
      userId?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await AddToCartApi({
        userId,
        products: [
          {
            id: product.id,
            quantity: product.quantity ?? 1,
          },
        ],
      });

      if (response.status === false) {
        return rejectWithValue(response.message ?? "Failed to add to cart");
      }

      return { product, response };
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Failed to add to cart");
    }
  },
);

// 3. Update Cart
export const updateCartAsync = createAsyncThunk(
  "cart/updateCartAsync",
  async (
    {
      id,
      quantity,
      cartId = 1,
    }: {
      id: number;
      quantity: number;
      cartId?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await UpdateCartApi(cartId, {
        merge: true,
        products: [
          {
            id,
            quantity,
          },
        ],
      });

      if (response.status === false) {
        return rejectWithValue(response.message ?? "Failed to update cart");
      }

      return { id, quantity, response };
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Failed to update cart");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    openMiniCart: (state) => {
      state.isMiniCartOpen = true;
    },

    closeMiniCart: (state) => {
      state.isMiniCartOpen = false;
    },

    toggleMiniCart: (state) => {
      state.isMiniCartOpen = !state.isMiniCartOpen;
    },

    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;

      const existingProduct = state.products.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity ?? 1;
      } else {
        state.products.push({
          ...product,
          quantity: product.quantity ?? 1,
        });
      }

      state.quantity = state.products.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      state.isMiniCartOpen = true;
    },

    updateCart: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>,
    ) => {
      const { id, quantity } = action.payload;

      const product = state.products.find((item) => item.id === id);

      if (!product) return;

      if (quantity <= 0) {
        state.products = state.products.filter((item) => item.id !== id);
      } else {
        product.quantity = quantity;
      }

      state.quantity = state.products.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      if (state.products.length === 0) {
        state.isMiniCartOpen = false;
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );
      state.quantity = state.products.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      if (state.products.length === 0) {
        state.isMiniCartOpen = false;
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.discountedTotal = 0;
      state.cartId = null;
      state.userId = null;
      state.error = null;
      state.isMiniCartOpen = false;
    },
  },

  extraReducers: (builder) => {
    // Fetch User Cart
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.cartId = action.payload.id ?? 1;
          state.userId = action.payload.userId ?? null;
          state.products = (action.payload.products ?? []).map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            quantity: item.quantity,
            total: item.total,
            discountPercentage: item.discountPercentage,
            discountedTotal: item.discountedTotal,
          }));
          state.quantity =
            action.payload.totalQuantity ??
            state.products.reduce((total, item) => total + item.quantity, 0);
          state.total =
            action.payload.total ??
            state.products.reduce(
              (total, item) => total + item.price * item.quantity,
              0,
            );
          state.discountedTotal = action.payload.discountedTotal || state.total;
        }
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Failed to fetch user cart";
      });

    // Add To Cart Async
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const { product, response } = action.payload;

        if (response?.id) {
          state.cartId = response.id;
        }

        const existing = state.products.find((p) => p.id === product.id);
        if (existing) {
          existing.quantity += product.quantity ?? 1;
        } else {
          state.products.push({
            ...product,
            quantity: product.quantity ?? 1,
          });
        }

        state.quantity = state.products.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        state.total = state.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
        state.isMiniCartOpen = true;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Failed to add to cart";
      });

    // Update Cart Async
    builder
      .addCase(updateCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, quantity } = action.payload;

        const product = state.products.find((p) => p.id === id);
        if (product) {
          if (quantity <= 0) {
            state.products = state.products.filter((p) => p.id !== id);
          } else {
            product.quantity = quantity;
          }
        }

        state.quantity = state.products.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        state.total = state.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        if (state.products.length === 0) {
          state.isMiniCartOpen = false;
        }
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Failed to update cart";
      });
  },
});

export const {
  openMiniCart,
  closeMiniCart,
  toggleMiniCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
