import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortOrder = "asc" | "desc";

export type SortBy = "price";

interface SortingState {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

const initialState: SortingState = {
  sortBy: "price",
  sortOrder: "asc",
};

const sortingSlice = createSlice({
  name: "sorting",

  initialState,

  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },

    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },

    resetSorting: (state) => {
      state.sortBy = "price";
      state.sortOrder = "asc";
    },
  },
});

export const { setSortBy, setSortOrder, resetSorting } = sortingSlice.actions;

export default sortingSlice.reducer;
