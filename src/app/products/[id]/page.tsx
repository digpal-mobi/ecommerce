import SectionProductAbout from "@/website/Section/SectionProductAbout";
import { FetchProductsById } from "@/website/utils/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Details Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

export default async function ProductsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  const data = await FetchProductsById(Number(id));
  return (
    <div>
      <SectionProductAbout data={data} />
    </div>
  );
}
