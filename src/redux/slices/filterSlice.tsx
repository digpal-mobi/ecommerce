import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string[];
  brand: string[];
  minPrice: number | null;
  maxPrice: number | null;
  rating: number | null;
  sort: string | null;
}

const initialState: FilterState = {
  category: [],
  brand: [],
  minPrice: null,
  maxPrice: null,
  rating: null,
  sort: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setCategory: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload;
    },
    setBrand: (state, action: PayloadAction<string[]>) => {
      state.brand = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | null>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.maxPrice = action.payload;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    setSort: (state, action: PayloadAction<string | null>) => {
      state.sort = action.payload;
    },
    clearFilter: (state) => {
      state.category = [];
      state.brand = [];
      state.minPrice = null;
      state.maxPrice = null;
      state.rating = null;
      state.sort = null;
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
  clearFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
