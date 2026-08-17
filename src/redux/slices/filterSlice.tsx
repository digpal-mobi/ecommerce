import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  category: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
  rating: number;
  sort: string;
  color: string | null;
  size: string | null;
  dressStyle: string | null;
}

const initialState: FilterState = {
  category: [],
  brand: [],
  minPrice: 0,
  maxPrice: 3000,
  rating: 0,
  sort: "",
  color: null,
  size: null,
  dressStyle: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string[] | string>) => {
      if (Array.isArray(action.payload)) {
        state.category = action.payload;
      } else if (action.payload) {
        state.category = [action.payload];
      } else {
        state.category = [];
      }
    },

    setBrand: (state, action: PayloadAction<string[] | string>) => {
      if (Array.isArray(action.payload)) {
        state.brand = action.payload;
      } else if (action.payload) {
        state.brand = [action.payload];
      } else {
        state.brand = [];
      }
    },

    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },

    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },

    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },

    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },

    setColor: (state, action: PayloadAction<string | null>) => {
      state.color = action.payload;
    },

    setSize: (state, action: PayloadAction<string | null>) => {
      state.size = action.payload;
    },

    setDressStyle: (state, action: PayloadAction<string | null>) => {
      state.dressStyle = action.payload;
    },

    clearAllFilter: (state) => {
      state.category = [];
      state.brand = [];
      state.minPrice = 0;
      state.maxPrice = 3000;
      state.rating = 0;
      state.sort = "";
      state.color = null;
      state.size = null;
      state.dressStyle = null;
    },
  },
});

export const {
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
} = filterSlice.actions;

export default filterSlice.reducer;