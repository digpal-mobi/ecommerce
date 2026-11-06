import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetails {
  id?: number | string;
  username?: string;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  [key: string]: unknown;
}

export interface AuthSession {
  user: UserDetails;
  accessToken: string;
}

export interface AuthState {
  accessToken: string | null;
  userDetails: UserDetails;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  userDetails: {},
  isAuthenticated: false,
  isLoading: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<AuthSession>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.userDetails = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logoutSuccess: (state) => {
      state.userDetails = {};
      state.isAuthenticated = false;
      state.isLoading = false;
      state.accessToken = null;
    },
  },
});

export const {
  setLoading,
  setUserDetails,
  setAccessToken,
  loginSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
