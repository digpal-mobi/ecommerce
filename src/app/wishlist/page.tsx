import { Metadata } from "next";
import SectionWishlist from "@/website/Section/SectionWishlist";

export const metadata: Metadata = {
  title: "My Wishlist || Ecommerce",
  description: "View and manage your saved wishlist products.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-[70vh]">
      <SectionWishlist />
    </main>
  );
}
