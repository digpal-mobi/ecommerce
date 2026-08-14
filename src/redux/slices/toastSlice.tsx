import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  type: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    hideToast: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
