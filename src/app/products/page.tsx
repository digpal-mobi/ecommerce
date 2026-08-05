import SectionProductAbout from "@/website/Section/SectionProductAbout";
import { FetchProductsById } from "@/website/utils/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

export default async function Products() {
  const data = await FetchProductsById(121);
  return (
    <div>
      <SectionProductAbout data={data} />
    </div>
  );
}
