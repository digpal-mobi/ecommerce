import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterValues {
  category: string[];
  brand: string[];
  minPrice: number | null;
  maxPrice: number | null;
  rating: number | null;
  color: string | null;
  size: string | null;
  dressStyle: string | null;
  q: string;
}

export interface FilterState {
  filters: FilterValues;
  isSideFiltersModalOpen: boolean;
}

export const MIN_PRICE = 0;
export const MAX_PRICE = 3000;

export const DEFAULT_FILTERS: FilterValues = {
  category: [],
  brand: [],
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  rating: null,
  color: null,
  size: null,
  dressStyle: null,
  q: "",
};

const initialState: FilterState = {
  filters: { ...DEFAULT_FILTERS },
  isSideFiltersModalOpen: false,
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterValues>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearAllFilter: (state) => {
      state.filters = { ...DEFAULT_FILTERS };
    },
    openSideFiltersModal: (state) => {
      state.isSideFiltersModalOpen = true;
    },
    closeSideFiltersModal: (state) => {
      state.isSideFiltersModalOpen = false;
    },
  },
});

export const {
  setFilters,
  clearAllFilter,
  openSideFiltersModal,
  closeSideFiltersModal,
} = filterSlice.actions;

export default filterSlice.reducer;
