"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Input from "@/website/Components/Common/Input";
import Button from "@/website/Components/Common/Button";
import TitleTag from "@/website/Components/Common/TitleTag";
import { useDispatch, useSelector } from "@/redux/store";
import { setLoading } from "@/redux/slices/authSlice";
import { ForgotPasswordApi } from "@/website/Utils/Api";

interface ForgotPasswordFormData {
  email: string;
}

const SectionForgotPassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setApiError(null);
    setSuccessMessage(null);
    dispatch(setLoading(true));

    try {
      const response = await ForgotPasswordApi({
        email: data.email.trim(),
      });

      if (response.status === false) {
        setApiError(
          response.message ?? "Failed to request password reset. Please try again.",
        );
        return;
      }

      setSuccessMessage(
        response.message ??
          "If an account exists with this email, password reset instructions have been sent.",
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred.";
      setApiError(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <section className="w-full max-w-[520px] rounded-[16px] bg-white p-6 shadow-xl laptop:p-10">
        <header className="flex flex-col gap-[16px]">
          <TitleTag id="forgot-password-title" variant="mainHeading" as="h1">
            Forgot Password
          </TitleTag>
          <TitleTag as="h2" variant="satoshiBold" className="!font-[400] text-black/70">
            Enter the email associated with your account and we&apos;ll send you a link to reset your password.
          </TitleTag>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] pt-[24px] laptop:pt-[36px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="email" className="text-[15px] font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              className="border-none bg-[#EDEDED]"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="form-field-error">{errors.email.message}</span>
            )}
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-[12px] text-[14px] text-red-600">
              {apiError}
            </div>
          )}

          {successMessage && (
            <div className="flex flex-col gap-2 rounded-lg border border-green-200 bg-green-50 p-[14px] text-[14px] text-green-700">
              <p className="font-medium">{successMessage}</p>
              <p className="text-[13px] text-green-800">
                Please check your inbox (and spam folder) for the password reset link.
              </p>
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full rounded-lg px-[20px] py-[14px] font-medium transition-opacity hover:opacity-90"
          >
            {isSubmitting || isLoading ? "Sending Link..." : "Send Reset Link"}
          </Button>
        </form>

        <p className="pt-6 text-[15px] text-black/70">
          Remembered your password?{" "}
          <Link href="/login" className="font-medium text-black underline">
            Back to Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SectionForgotPassword;
