"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "@/website/Components/Common/Input";
import Button from "@/website/Components/Common/Button";
import TitleTag from "@/website/Components/Common/TitleTag";
import { useDispatch, useSelector } from "@/redux/store";
import { loginSuccess, setLoading } from "@/redux/slices/authSlice";
import { VerifyEmailApi } from "@/website/Utils/Api";
import { setCookie } from "@/website/Helpers/Helper";

interface VerifyEmailFormData {
  token: string;
}

function safeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

const SectionVerifyEmail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  const queryToken = searchParams.get("token") ?? "";
  const queryEmail = searchParams.get("email") ?? "";
  const redirectTo = safeRedirect(searchParams.get("redirect"));

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailFormData>({
    defaultValues: {
      token: queryToken,
    },
  });

  useEffect(() => {
    if (queryToken) {
      setValue("token", queryToken);
    }
  }, [queryToken, setValue]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  const onSubmit = async (data: VerifyEmailFormData) => {
    setApiError(null);
    setSuccessMessage(null);
    dispatch(setLoading(true));

    try {
      const response = await VerifyEmailApi({
        token: data.token.trim(),
      });

      if (response.status === false) {
        setApiError(
          response.message ?? "Email verification failed. Please try again.",
        );
        return;
      }

      const user = response.data?.user;
      const accessToken = response.data?.accessToken;

      setSuccessMessage("Email verified successfully! Logging you in...");

      if (user && accessToken) {
        setCookie("USER_ACCESS", accessToken, 7);
        dispatch(loginSuccess({ user, accessToken }));
      }

      setTimeout(() => {
        router.push(redirectTo);
      }, 1200);
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
          <TitleTag id="verify-email-title" variant="mainHeading" as="h1">
            Verify Your Email
          </TitleTag>
          <TitleTag as="h2" variant="satoshiBold" className="!font-[400] text-black/70">
            {queryEmail ? (
              <>
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold text-black">{queryEmail}</span>.
              </>
            ) : (
              "Enter the 6-digit code sent to your email to activate your account."
            )}
          </TitleTag>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] pt-[24px] laptop:pt-[36px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="token" className="text-[15px] font-medium">
              Verification Code
            </label>
            <Input
              id="token"
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="border-none bg-[#EDEDED] text-center font-mono text-[20px] tracking-[0.35em]"
              placeholder="123456"
              autoComplete="one-time-code"
              {...register("token", {
                required: "Verification code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Verification code must be exactly 6 digits",
                },
              })}
            />
            {errors.token && (
              <span className="form-field-error">{errors.token.message}</span>
            )}
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-[12px] text-[14px] text-red-600">
              {apiError}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-[12px] text-[14px] text-green-700">
              {successMessage}
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || isLoading || Boolean(successMessage)}
            className="w-full rounded-lg px-[20px] py-[14px] font-medium transition-opacity hover:opacity-90"
          >
            {isSubmitting || isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <div className="pt-6 text-[15px] text-black/70 flex flex-col gap-2">
          <p>
            Already verified?{" "}
            <Link href="/login" className="font-medium text-black underline">
              Sign In
            </Link>
          </p>
          <p className="text-[13px] text-black/60">
            Didn&apos;t receive the code? Please check your spam folder or try registering again.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SectionVerifyEmail;

