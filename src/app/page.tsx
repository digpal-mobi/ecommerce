import SectionBrandLogo from "@/website/section/SectionBrandLogo";
import SectionBrowseByDressStyle from "@/website/section/SectionBrowseByDressStyle";
import SectionCustomerTestimonial from "@/website/section/SectionCustomerTestimonial";
import SectionMainBanner from "@/website/section/SectionMainBanner";
import SectionNewArrival from "@/website/section/SectionNewArrival";
import SectionTopSelling from "@/website/section/SectionTopSelling";
import { FetchProductsByCategory } from "@/website/utils/api";
import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

const OPTIONS: EmblaOptionsType = { loop: true };

export default async function Home() {
  const topSellingResult = await FetchProductsByCategory("womens-dresses", 4);

  const NewArrivalResult = await FetchProductsByCategory("tops", 4);

  return (
    <div>
      <SectionMainBanner />
      <SectionBrandLogo />
      <SectionNewArrival products={NewArrivalResult?.products || []} />
      <SectionTopSelling products={topSellingResult?.products || []} />
      <SectionBrowseByDressStyle />
      <SectionCustomerTestimonial />
    </div>
  );
}
