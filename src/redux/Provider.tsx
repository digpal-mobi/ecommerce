"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useDispatch } from "@/redux/store";
import { loginSuccess, setUserDetails, logoutSuccess } from "@/redux/slices/authSlice";
import { fetchUserCart, clearCart } from "@/redux/slices/cartSlice";
import { getCookie, deleteCookie } from "@/website/helpers/helper";
import { GetCurrentUserApi } from "@/website/utils/api";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = getCookie("USER_ACCESS");
      if (!accessToken) return;

      try {
        const response = await GetCurrentUserApi(accessToken);
        if (response.status !== false && (response.id || response.username)) {
          dispatch(setUserDetails(response));
          dispatch(loginSuccess({ ...response, accessToken }));
          dispatch(fetchUserCart(Number(response.id) || 5));
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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
