import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  total: number;
  limit: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  total: 0,
  limit: 9,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.currentPage = 1;
    },

    resetPagination: (state) => {
      state.currentPage = 1;
      state.total = 0;
    },
  },
});

export const { setCurrentPage, setTotal, setLimit, resetPagination } =
  paginationSlice.actions;

export default paginationSlice.reducer;
