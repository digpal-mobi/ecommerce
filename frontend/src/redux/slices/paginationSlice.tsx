import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  total: number;
  limit: number;
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 9;

const initialState: PaginationState = {
  currentPage: DEFAULT_PAGE,
  total: 0,
  limit: DEFAULT_LIMIT,
};

const paginationSlice = createSlice({
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
      if (state.limit !== action.payload) {
        state.limit = action.payload;
        state.currentPage = DEFAULT_PAGE;
      }
    },

    resetPagination: (state) => {
      state.currentPage = DEFAULT_PAGE;
      state.total = 0;
    },
  },
});

export const { setCurrentPage, setTotal, setLimit, resetPagination } =
  paginationSlice.actions;

export default paginationSlice.reducer;
