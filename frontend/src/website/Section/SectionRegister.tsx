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
import { RegisterUser } from "@/website/Utils/Api";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SectionRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const redirect = searchParams.get("redirect");
  const loginHref = redirect
    ? `/login?redirect=${encodeURIComponent(redirect)}`
    : "/login";
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);
    setSuccessMessage(null);
    dispatch(setLoading(true));
    try {
      const response = await RegisterUser({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.status === false || response.success === false) {
        setApiError(response.message ?? "Registration failed. Please try again.");
        return;
      }

      setSuccessMessage(
        response.message ??
          "Registration successful. Please check your email for the verification code.",
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
        <header className="flex flex-col gap-[20px]">
          <TitleTag id="register-title" variant="mainHeading" as="h1">
            Create an account
          </TitleTag>
          <TitleTag as="h2" variant="satoshiBold" className="!font-[400]">
            Register to continue shopping.
          </TitleTag>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] pt-[24px] laptop:pt-[40px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="username" className="text-[15px] font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              className="border-none bg-[#EDEDED]"
              placeholder="Enter your username"
              autoComplete="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <span className="form-field-error">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="email" className="text-[15px] font-medium">
              Email
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
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="form-field-error">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="password" className="text-[15px] font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-none bg-[#EDEDED]"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="form-field-error">{errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="confirmPassword" className="text-[15px] font-medium">
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="border-none bg-[#EDEDED]"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
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
            <div className="flex flex-col gap-2 rounded-lg border border-green-200 bg-green-50 p-[14px] text-[14px] text-green-700">
              <p>{successMessage}</p>
              <Link
                href={`/verify-email?email=${encodeURIComponent(watch("email"))}`}
                className="inline-flex w-fit items-center font-semibold text-black underline hover:opacity-80"
              >
                Enter your 6-digit verification code &rarr;
              </Link>
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || isLoading || Boolean(successMessage)}
            className="w-full rounded-lg px-[20px] py-[14px] font-medium transition-opacity hover:opacity-90"
          >
            {isSubmitting || isLoading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="pt-6 text-[15px] text-black/70">
          Already have an account?{" "}
          <Link href={loginHref} className="font-medium text-black underline">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SectionRegister;
