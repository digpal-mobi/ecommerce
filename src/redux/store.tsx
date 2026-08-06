import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import authSlice from "@/redux/slices/authSlice";
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
  //   cart: cartSlice,
  //   products: productsSlice,
  //   sidebar: sidebarSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Extract the dispatch function from the store for convenience
const { dispatch } = store;

const useSelector = useAppSelector;

// Create a custom useDispatch hook with typed dispatch
const useDispatch = () => useAppDispatch();

// Export the Redux store, dispatch, useSelector, and useDispatch for use in components
export { store, dispatch, useSelector, useDispatch };
