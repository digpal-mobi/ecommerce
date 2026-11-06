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
import { LoginUser } from "@/website/Utils/Api";
import { setCookie } from "@/website/Helpers/Helper";

interface LoginFormData {
  id: string;
  password: string;
}

function safeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

const SectionLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const registerHref = searchParams.get("redirect")
    ? `/register?redirect=${encodeURIComponent(redirectTo)}`
    : "/register";
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    dispatch(setLoading(true));
    try {
      const response = await LoginUser({
        id: data.id,
        password: data.password,
      });

      const user = response.data?.user;
      const accessToken = response.data?.accessToken;

      if (response.status === false || !user || !accessToken) {
        setApiError(response.message ?? "Login failed. Please try again.");
        return;
      }

      setCookie("USER_ACCESS", accessToken, 7);
      dispatch(loginSuccess({ user, accessToken }));
      router.push(redirectTo);
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
      <section className="w-full max-w-155 rounded-[16px] bg-white p-6 shadow-xl laptop:p-10">
        <header className="flex flex-col gap-[20px]">
          <TitleTag id="login-title" variant="mainHeading" as="h1">
            Welcome Back
          </TitleTag>
          <TitleTag as="h2" variant="satoshiBold" className="!font-[400]">
            Sign in to your account to continue shopping.
          </TitleTag>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] pt-[24px] laptop:pt-[40px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="id" className="text-[15px] font-medium">
              Username or Email
            </label>
            <Input
              id="id"
              type="text"
              className="border-none bg-[#EDEDED]"
              placeholder="Enter your username or email"
              autoComplete="username"
              {...register("id", {
                required: "Username or email is required",
              })}
            />
            {errors.id && (
              <span className="form-field-error">{errors.id.message}</span>
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
              <span className="form-field-error">{errors.password.message}</span>
            )}
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-[12px] text-[14px] text-red-600">
              {apiError}
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full rounded-lg px-[20px] py-[14px] font-medium transition-opacity hover:opacity-90"
          >
            {isSubmitting || isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="pt-6 text-[15px] text-black/70">
          Don&apos;t have an account?{" "}
          <Link href={registerHref} className="font-medium text-black underline">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SectionLogin;
