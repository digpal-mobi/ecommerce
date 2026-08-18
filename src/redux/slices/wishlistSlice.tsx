import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating?: number;
  category?: string;
}

interface WishlistState {
  items: WishlistProduct[];
}

const loadWishlistFromStorage = (): WishlistProduct[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("ecommerce_wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (items: WishlistProduct[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("ecommerce_wishlist", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save wishlist to localStorage", error);
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistProduct>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    toggleWishlist: (state, action: PayloadAction<WishlistProduct>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
    initializeWishlist: (state) => {
      state.items = loadWishlistFromStorage();
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  initializeWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
