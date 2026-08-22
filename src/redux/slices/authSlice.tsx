import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetails {
  id?: number | string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

export interface AuthState {
  userDetails: UserDetails;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginModalOpen: boolean;
}

const initialState: AuthState = {
  userDetails: {},
  isAuthenticated: false,
  isLoading: false,
  isLoginModalOpen: false,
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
      state.isLoginModalOpen = false;
      if (action.payload) {
        state.userDetails = action.payload;
      }
    },
    logoutSuccess: (state) => {
      state.userDetails = {};
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isLoginModalOpen = false;
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    setLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginModalOpen = action.payload;
    },
  },
});

export const {
  setLoading,
  setUserDetails,
  loginSuccess,
  logoutSuccess,
  openLoginModal,
  closeLoginModal,
  setLoginModalOpen,
} = authSlice.actions;
export default authSlice.reducer;
