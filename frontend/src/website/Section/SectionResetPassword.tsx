"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "@/website/Components/Common/Input";
import Button from "@/website/Components/Common/Button";
import TitleTag from "@/website/Components/Common/TitleTag";
import { useDispatch, useSelector } from "@/redux/store";
import { setLoading } from "@/redux/slices/authSlice";
import { ResetPasswordApi } from "@/website/Utils/Api";

interface ResetPasswordFormData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

const SectionResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading } = useSelector((state) => state.auth);

  const queryToken = searchParams.get("token") ?? "";

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      token: queryToken,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (queryToken) {
      setValue("token", queryToken);
    }
  }, [queryToken, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setApiError(null);
    setSuccessMessage(null);

    const token = data.token.trim();
    if (!token) {
      setApiError("Reset token is missing. Please check your reset link.");
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await ResetPasswordApi({
        token,
        newPassword: data.newPassword,
      });

      if (response.status === false) {
        setApiError(
          response.message ?? "Failed to reset password. The link may have expired.",
        );
        return;
      }

      setSuccessMessage(
        response.message ??
          "Your password has been reset successfully! You can now log in with your new password.",
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
          <TitleTag id="reset-password-title" variant="mainHeading" as="h1">
            Reset Password
          </TitleTag>
          <TitleTag as="h2" variant="satoshiBold" className="!font-[400] text-black/70">
            Enter your new password below to secure your account.
          </TitleTag>
        </header>

        {!queryToken && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[14px] text-amber-800">
            No reset token was detected in the URL. If you received a code/token via email, please paste it into the field below.
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] pt-[24px] laptop:pt-[36px]"
        >
          {/* If token was not in query params, show an input so user can paste it */}
          {!queryToken && (
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="token" className="text-[15px] font-medium">
                Reset Token
              </label>
              <Input
                id="token"
                type="text"
                className="border-none bg-[#EDEDED] font-mono text-[14px]"
                placeholder="Paste the 64-character reset token"
                {...register("token", {
                  required: "Reset token is required",
                })}
              />
              {errors.token && (
                <span className="form-field-error">{errors.token.message}</span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="newPassword" className="text-[15px] font-medium">
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              className="border-none bg-[#EDEDED]"
              autoComplete="new-password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 64,
                  message: "Password cannot exceed 64 characters",
                },
              })}
            />
            {errors.newPassword && (
              <span className="form-field-error">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="confirmPassword" className="text-[15px] font-medium">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              className="border-none bg-[#EDEDED]"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className="form-field-error">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-[12px] text-[14px] text-red-600">
              {apiError}
            </div>
          )}

          {successMessage && (
            <div className="flex flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-[14px] text-[14px] text-green-700">
              <p className="font-medium">{successMessage}</p>
              <Button
                variant="primary"
                type="button"
                onClick={() => router.push("/login")}
                className="w-full rounded-lg py-2.5 text-[14px] font-medium"
              >
                Proceed to Login &rarr;
              </Button>
            </div>
          )}

          {!successMessage && (
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full rounded-lg px-[20px] py-[14px] font-medium transition-opacity hover:opacity-90"
            >
              {isSubmitting || isLoading ? "Updating Password..." : "Reset Password"}
            </Button>
          )}
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

export default SectionResetPassword;

