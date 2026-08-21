import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";
import authSlice from "@/redux/slices/authSlice";
import paginationSlice from "@/redux/slices/paginationSlice";
import cartSlice from "@/redux/slices/cartSlice";
import currencySlice from "@/redux/slices/currencySlice";
import filterSlice from "@/redux/slices/filterSlice";
import sortingSlice from "@/redux/slices/sortingSlice";
import productSlice from "@/redux/slices/productSlice";
import wishlistSlice from "@/redux/slices/wishlistSlice";
// Custom logger middleware
const logger: Middleware = (storeApi) => (next) => (action) => {
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Extract the dispatch function from the store for convenience
const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// Create a custom useDispatch hook with typed dispatch
const useDispatch = () => useAppDispatch<AppDispatch>();

// Export the Redux store, dispatch, useSelector, and useDispatch for use in components
export { store, dispatch, useSelector, useDispatch };
