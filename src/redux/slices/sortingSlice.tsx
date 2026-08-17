import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortingState {
  sortBy: string;
  sortOrder: string;
  sortingLabel: string;
  searchQuery: string;
}

const initialState: SortingState = {
  sortBy: "priceAsc",
  sortOrder: "asc",
  sortingLabel: "Price: low to high",
  searchQuery: "",
};

const SortingSlice = createSlice({
  name: "Sorting",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    setSortingLabel: (state, action: PayloadAction<string>) => {
      state.sortingLabel = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSortBy, setSortOrder, setSortingLabel, setSearchQuery } =
  SortingSlice.actions;
export default SortingSlice.reducer;
