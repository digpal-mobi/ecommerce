import SectionResetPassword from "@/website/Section/SectionResetPassword";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password || Ecommerce",
  description: "Reset your account password.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center py-16">Loading...</main>}>
      <SectionResetPassword />
    </Suspense>
  );
}

