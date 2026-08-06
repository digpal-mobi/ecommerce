import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    loginSuccess: (state) => {
      return { ...state, isAuthenticated: true };
    },
    logoutSuccess: (state) => {
      return {
        ...state,
        userDetails: {},
        isAuthenticated: false,
      };
    },
  },
});

export const { setUserDetails, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
