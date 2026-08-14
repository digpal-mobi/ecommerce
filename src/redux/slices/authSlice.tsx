import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<any | void>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      if (action.payload) {
        state.userDetails = action.payload;
      }
    },
    logoutSuccess: (state) => {
      state.userDetails = {};
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setUserDetails, loginSuccess, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
