"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import LazyImage from "@/website/Components/Common/LazyImage";
import Input from "@/website/Components/Common/Input";
import Button from "@/website/Components/Common/Button";
import TitleTag from "@/website/Components/Common/TitleTag";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setLoading,
  setUserDetails,
  loginSuccess,
} from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/website/utils/api";

interface LoginFormData {
  username: string;
  password: string;
}

const SectionLogin = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.auth);
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

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
        dispatch(setUserDetails(response));
        dispatch(loginSuccess(response));
        router.push("/");
      } else {
        setApiError(
          response.message || "Login failed. Please check your credentials.",
        );
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      setApiError(error?.message || "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <main>
      <section>
        <MainContainer>
          <Container>
            <div className="flex flex-col laptop:flex-row items-center justify-center w-full gap-[20px]">
              {/* Image */}
              <div className="w-full laptop:w-1/2">
                <LazyImage
                  src="/ecommerce-login.avif"
                  alt="Login Image"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Login Form */}
              <div className="w-full laptop:w-1/2 flex items-center justify-center laptop:mt-0 mt-[40px]">
                <article className="w-full">
                  <header className="mb-[30px] flex flex-col gap-[30px]">
                    <TitleTag id="login-title" variant="mainHeading" as="h1">
                      Welcome Back
                    </TitleTag>

                    <TitleTag
                      as="h2"
                      variant="satoshiBold"
                      className="!font-[400]"
                    >
                      Sign in to your account to continue shopping.
                    </TitleTag>
                  </header>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[24px]"
                  >
                    {/* Email */}
                    <div className="flex flex-col gap-[8px]">
                      <label
                        htmlFor="username"
                        className="text-[15px] font-medium"
                      >
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

                        <a
                          href="/forgot-password"
                          className="text-[14px] underline"
                        >
                          Forgot Password?
                        </a>
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

                    {/* Register */}
                    <p className="text-center text-[14px] text-gray-600">
                      Don&apos;t have an account?{" "}
                      <a
                        href="/register"
                        className="font-medium text-black underline"
                      >
                        Create an account
                      </a>
                    </p>
                  </form>
                </article>
              </div>
            </div>
          </Container>
        </MainContainer>
      </section>
    </main>
  );
};

export default SectionLogin;
