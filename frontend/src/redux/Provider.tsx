"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useDispatch } from "@/redux/store";
import {
  loginSuccess,
  logoutSuccess,
  setAccessToken,
} from "@/redux/slices/authSlice";
import { fetchUserCart, clearCart } from "@/redux/slices/cartSlice";
import { getCookie, deleteCookie } from "@/website/Helpers/Helper";
import { GetCurrentUserApi } from "@/website/Utils/Api";

function AuthInitializer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = getCookie("USER_ACCESS");
      if (!accessToken) return;

      try {
        dispatch(setAccessToken(accessToken));
        const response = await GetCurrentUserApi();
        const user = response.data;
        if (
          response.status !== false &&
          user &&
          (user.id || user.username)
        ) {
          dispatch(
            loginSuccess({
              user,
              accessToken: store.getState().auth.accessToken ?? accessToken,
            }),
          );
          dispatch(fetchUserCart(Number(user.id) || 5));
        } else {
          // If token expired or invalid, clear cookie & reset
          deleteCookie("USER_ACCESS");
          deleteCookie("USER_RefreshToken");
          dispatch(logoutSuccess());
          dispatch(clearCart());
        }
      } catch (error) {
        console.error("Error restoring session from cookies:", error);
      }
    };

    restoreSession();
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
