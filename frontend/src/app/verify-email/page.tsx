import SectionVerifyEmail from "@/website/Section/SectionVerifyEmail";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email || Ecommerce",
  description: "Verify your email address.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center py-16">Loading...</main>}>
      <SectionVerifyEmail />
    </Suspense>
  );
}

