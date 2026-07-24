import SectionBrandLogo from "@/website/Section/SectionBrandLogo";
import SectionMainBanner from "@/website/Section/SectionMainBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

export default function Home() {
  return (
    <div>
      <SectionMainBanner />
      <SectionBrandLogo />
    </div>
  );
}
