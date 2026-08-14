import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  products: CartProduct[];
  quantity: number;
}

const initialState: CartState = {
  products: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;

      const existingProduct = state.products.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
      } else {
        state.products.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      state.quantity = state.products.reduce(
        (total, item) => total + item.quantity,
        0,
      );
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
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const { addToCart, updateCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
