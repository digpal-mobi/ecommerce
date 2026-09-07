import SectionBrandLogo from "@/website/Section/SectionBrandLogo";
import SectionBrowseByDressStyle from "@/website/Section/SectionBrowseByDressStyle";
import SectionCustomerTestimonial from "@/website/Section/SectionCustomerTestimonial";
import SectionMainBanner from "@/website/Section/SectionMainBanner";
import SectionNewArrival from "@/website/Section/SectionNewArrival";
import SectionTopSelling from "@/website/Section/SectionTopSelling";
import { FetchProductsByCategory } from "@/website/Utils/Api";
import { Metadata } from "next";
import { PRODUCTS_DATA_1, PRODUCTS_DATA_2 } from "@/website/Data/ProductData";
import Container from "@/website/Components/Common/Container";

export const metadata: Metadata = {
  title: "Home Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

export default async function Home() {
  // const topSellingResult = await FetchProductsByCategory("womens-dresses", 4);

  // const NewArrivalResult = await FetchProductsByCategory("tops", 4);

  return (
    <div>
      <SectionMainBanner />
      <SectionBrandLogo />
      <SectionNewArrival
        products={PRODUCTS_DATA_1}
        viewAllHref="/shop?category=tops"
      />
      <div className="mx-auto w-full max-w-[1920px] px-[16px] tablet-lg:px-[30px] laptop:px-[80px] desktop:px-[100px]">
        <div className="h-[1px] w-full bg-black/10" />
      </div>
      <SectionTopSelling
        products={PRODUCTS_DATA_2}
        viewAllHref="/shop?category=womens-dresses"
      />
      <SectionBrowseByDressStyle />
      <SectionCustomerTestimonial />
    </div>
  );
}
