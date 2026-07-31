import SectionBrandLogo from "@/website/Section/SectionBrandLogo";
import SectionBrowseByDressStyle from "@/website/Section/SectionBrowseByDressStyle";
import SectionCustomerTestimonial from "@/website/Section/SectionCustomerTestimonial";
import SectionMainBanner from "@/website/Section/SectionMainBanner";
import SectionNewArrival from "@/website/Section/SectionNewArrival";
import SectionTopSelling from "@/website/Section/SectionTopSelling";
import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

const OPTIONS: EmblaOptionsType = { loop: true };

export default function Home() {
  return (
    <div>
      <SectionMainBanner />
      <SectionBrandLogo />
      <SectionNewArrival />
      <SectionTopSelling />
      <SectionBrowseByDressStyle />
      <SectionCustomerTestimonial />
    </div>
  );
}
