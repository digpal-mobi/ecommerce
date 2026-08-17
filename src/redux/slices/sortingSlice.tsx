import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortingState {
  sortBy: string;
  sortOrder: string;
  sortingLabel: string;
}

const initialState: SortingState = {
  sortBy: "priceAsc",
  sortOrder: "asc",
  sortingLabel: "Price: low to high",
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
  },
});

export const { setSortBy, setSortOrder, setSortingLabel } =
  SortingSlice.actions;
export default SortingSlice.reducer;
