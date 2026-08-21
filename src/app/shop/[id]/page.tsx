import SectionProductAbout from "@/website/Section/SectionProductAbout";
import SectionProductDetails from "@/website/Section/SectionProductDetails";
import SectionSimilarProducts from "@/website/Section/SectionSimilarProducts";
import {
  FetchProductsByCategory,
  FetchProductsById,
} from "@/website/utils/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const productId = Number(id);

  if (isNaN(productId) || productId <= 0) {
    notFound();
  }

  const data = await FetchProductsById(productId);

  if (!data || !data.id || data.status === false) {
    notFound();
  }

  const categoryName =
    typeof data?.category === "object" ? data.category.id : data?.category;
  const relatedProducts = await FetchProductsByCategory(categoryName, 5);

  return (
    <div>
      <SectionProductAbout data={data} />
      <SectionProductDetails data={data} />
      <SectionSimilarProducts products={relatedProducts?.products || []} />
    </div>
  );
}
