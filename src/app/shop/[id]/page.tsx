import SectionProductAbout from "@/website/section/SectionProductAbout";
import SectionProductDetails from "@/website/section/SectionProductDetails";
import SectionSimilarProducts from "@/website/section/SectionSimilarProducts";
import {
  FetchProductsByCategory,
  FetchProductsById,
} from "@/website/utils/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Details Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

export default async function ProductsDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const data = await FetchProductsById(Number(id));

  const categoryName =
    typeof data?.category === "object" ? data.category.id : data?.category;
  const relatedProducts = await FetchProductsByCategory(categoryName);

  return (
    <div>
      <SectionProductAbout data={data} />
      <SectionProductDetails data={data} />
      <SectionSimilarProducts products={relatedProducts?.products || []} />
    </div>
  );
}
