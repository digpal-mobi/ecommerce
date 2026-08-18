import { Metadata } from "next";
import SectionCart from "@/website/section/SectionCart";

export const metadata: Metadata = {
  title: "Cart || Ecommerce",
  description: "Review and manage your cart items before checkout.",
};

export default function CartPage() {
  return (
    <main className="min-h-[70vh]">
      <SectionCart />
    </main>
  );
}
