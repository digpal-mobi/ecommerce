"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import Input from "@/website/Components/Common/Input";
import Button from "@/website/Components/Common/Button";
import TitleTag from "@/website/Components/Common/TitleTag";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setLoading,
  setUserDetails,
  loginSuccess,
  closeLoginModal,
} from "@/redux/slices/authSlice";
import { fetchUserCart } from "@/redux/slices/cartSlice";
import { LoginUser } from "@/website/Utils/Api";
import { setCookie } from "@/website/Helpers/Helper";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LoginModal = ({ isOpen, onClose }: Readonly<LoginModalProps>) => {
  const dispatch = useDispatch();
  const { isLoading, isLoginModalOpen } = useSelector(
    (state: any) => state.auth,
  );
  const activeIsOpen = isOpen !== undefined ? isOpen : isLoginModalOpen;
  const [apiError, setApiError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleClose = useCallback(() => {
    dispatch(closeLoginModal());
    if (onClose) onClose();
  }, [dispatch, onClose]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Portal target only exists client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset form/error state whenever the modal opens
  useEffect(() => {
    if (activeIsOpen) {
      reset();
      setApiError(null);
    }
  }, [activeIsOpen, reset]);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (activeIsOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeIsOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose],
  );

  useEffect(() => {
    if (!activeIsOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIsOpen, handleKeyDown]);

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    dispatch(setLoading(true));
    try {
      const response = await LoginUser({
        username: data.username,
        password: data.password,
      });

      if (
        response.status !== false &&
        (response.token || response.accessToken || response.id)
      ) {
        const accessToken = response.accessToken || response.token;
        const refreshToken = response.refreshToken;
        if (accessToken) {
          setCookie("USER_ACCESS", accessToken, 7);
        }
        if (refreshToken) {
          setCookie("USER_RefreshToken", refreshToken, 7);
        }

        dispatch(setUserDetails(response));
        dispatch(loginSuccess(response));
        dispatch(fetchUserCart(Number(response.id ?? 0)));
        handleClose();
      } else {
        setApiError(
          response.message ?? "Login failed. Please check your credentials.",
        );
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      setApiError(error?.message ?? "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!mounted || !activeIsOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-[16px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 cursor-pointer"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto bg-white rounded-[16px] shadow-xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close login modal"
          className="absolute top-[16px] right-[16px] z-10 flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#EDEDED] hover:bg-[#dedede] transition-colors cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex flex-col laptop:flex-row items-center w-full gap-[20px] p-[24px] laptop:p-[40px]">
          <div className="w-full flex items-center justify-center">
            <article className="w-full">
              <header className="flex flex-col gap-[30px]">
                <TitleTag id="login-title" variant="mainHeading" as="h1">
                  Welcome Back
                </TitleTag>

                <TitleTag as="h2" variant="satoshiBold" className="!font-[400]">
                  Sign in to your account to continue shopping.
                </TitleTag>
              </header>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[24px]"
              >
                {/* Username */}
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="username" className="text-[15px] font-medium">
                    Username
                  </label>

                  <Input
                    id="username"
                    type="text"
                    className="bg-[#EDEDED] border-none"
                    placeholder="Enter your username"
                    autoComplete="username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />

                  {errors.username && (
                    <span className="form-field-error">
                      {errors.username.message}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center justify-between gap-[10px]">
                    <label
                      htmlFor="password"
                      className="text-[15px] font-medium"
                    >
                      Password
                    </label>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-[#EDEDED] border-none"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />

                  {errors.password && (
                    <span className="form-field-error">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {apiError && (
                  <div className="p-[12px] bg-red-50 border border-red-200 text-red-600 text-[14px] rounded-lg">
                    {apiError}
                  </div>
                )}

                {/* Submit */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full rounded-lg px-[20px] py-[14px] font-medium transition-opacity hover:opacity-90"
                >
                  {isSubmitting || isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </article>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default LoginModal;
