import { Metadata } from "next";
import SectionCart from "@/website/section/SectionCart";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cart || Ecommerce",
  description: "Review and manage your cart items before checkout.",
};

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <main className="min-h-[70vh]">
        <SectionCart />
      </main>
    </Suspense>
  );
}
