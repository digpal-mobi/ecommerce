import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";
import authSlice from "@/redux/slices/authSlice";
import paginationSlice from "@/redux/slices/pagination";
// import cartSlice from "@/redux/slices/cartSlice";
// import productsSlice from "@/redux/slices/productsSlice";
// import sidebarSlice from "@/redux/slices/sidebarSlice";

// Custom logger middleware
const logger: Middleware = (storeApi) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next state:", storeApi.getState());
  return result;
};

const rootReducer = combineReducers({
  auth: authSlice,
  pagination: paginationSlice,
  //   cart: cartSlice,
  //   products: productsSlice,
  //   sidebar: sidebarSlice,
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
