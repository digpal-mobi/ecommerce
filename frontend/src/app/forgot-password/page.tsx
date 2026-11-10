import SectionForgotPassword from "@/website/Section/SectionForgotPassword";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Forgot Password || Ecommerce",
  description: "Reset your account password.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center py-16">Loading...</main>}>
      <SectionForgotPassword />
    </Suspense>
  );
}

