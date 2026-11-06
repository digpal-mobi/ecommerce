import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";
import authSlice, { logoutSuccess, setAccessToken } from "@/redux/slices/authSlice";
import paginationSlice from "@/redux/slices/paginationSlice";
import cartSlice, { clearCart } from "@/redux/slices/cartSlice";
import currencySlice from "@/redux/slices/currencySlice";
import filterSlice from "@/redux/slices/filterSlice";
import sortingSlice from "@/redux/slices/sortingSlice";
import productSlice from "@/redux/slices/productSlice";
import wishlistSlice from "@/redux/slices/wishlistSlice";
import { setAccessTokenGetter, setAuthHandlers } from "@/website/Utils/ApiHandlers";
import { deleteCookie, setCookie } from "@/website/Helpers/Helper";
// Custom logger middleware
const logger: Middleware = () => (next) => (action) => {
  const result = next(action);
  return result;
};

const rootReducer = combineReducers({
  auth: authSlice,
  pagination: paginationSlice,
  cart: cartSlice,
  currency: currencySlice,
  filter: filterSlice,
  sorting: sortingSlice,
  product: productSlice,
  wishlist: wishlistSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

setAccessTokenGetter(() => store.getState().auth.accessToken);

let sessionRedirectStarted = false;

setAuthHandlers({
  onAccessToken: (token) => {
    store.dispatch(setAccessToken(token));
    setCookie("USER_ACCESS", token, 7);
  },
  onLogout: () => {
    deleteCookie("USER_ACCESS");
    deleteCookie("USER_RefreshToken");
    deleteCookie("USER_DATA");
    store.dispatch(logoutSuccess());
    store.dispatch(clearCart());

    if (typeof window === "undefined" || sessionRedirectStarted) return;

    const path = window.location.pathname;
    if (path === "/login" || path === "/register") return;

    sessionRedirectStarted = true;
    const redirect = `${path}${window.location.search}`;
    window.location.assign(`/login?redirect=${encodeURIComponent(redirect)}`);
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  

// Extract the dispatch function from the store for convenience
const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// Create a custom useDispatch hook with typed dispatch
const useDispatch = () => useAppDispatch<AppDispatch>();

// Export the Redux store, dispatch, useSelector, and useDispatch for use in components
export { store, dispatch, useSelector, useDispatch };
