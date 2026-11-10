import SectionRegister from "@/website/Section/SectionRegister";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register || Ecommerce",
  description: "Create an account.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center py-16">Loading...</main>}>
      <SectionRegister />
    </Suspense>
  );
}
