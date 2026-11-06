import SectionLogin from "@/website/Section/SectionLogin";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login || Ecommerce",
  description: "Sign in to your account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center py-16">Loading...</main>}>
      <SectionLogin />
    </Suspense>
  );
}
