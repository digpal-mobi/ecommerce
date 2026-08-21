import Breadcrumb from "@/website/Components/Common/Breadcrumb";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import SectionProductList from "@/website/Section/products/SectionProductList";
import SectionFilter from "@/website/Section/SectionFilters";
import { FetchCategory, FetchProducts } from "@/website/utils/api";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    color?: string;
    size?: string;
    dressStyle?: string;
    sortBy?: string;
    sortOrder?: string;
    q?: string;
  }>;
};

export default async function Products({ searchParams }: Props) {
  const params = await searchParams;
  const data = await FetchProducts({
    limit: params?.limit ? Number(params.limit) : 9,
    skip: params?.page
      ? (Number(params.page) - 1) * (params?.limit ? Number(params.limit) : 9)
      : 0,
    category: params?.category,
    brand: params?.brand,
    q: params?.q,
    sortBy: params?.sortBy,
    order: params?.sortOrder,
    minPrice: params?.minPrice,
    maxPrice: params?.maxPrice,
    rating: params?.rating,
    color: params?.color,
    size: params?.size,
    dressStyle: params?.dressStyle,
  });

  const categories = await FetchCategory();

  const BreadCrumbItems: { name: string; url?: string }[] = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];

  return (
    <MainContainer>
      <Container className="!py-[0px]">
        <div className="py-[24px]">
          <Breadcrumb items={BreadCrumbItems} />
        </div>
        <div className="flex w-full gap-[20px] flex-col tablet:flex-row laptop:pb-[80px] pb-[50px]">
          <Suspense fallback={null}>
            <SectionFilter categories={categories} />
          </Suspense>
          <div className="flex w-full flex-col">
            <Suspense fallback={null}>
              <SectionProductList
                data={data?.products}
                initialTotal={data?.total}
              />
            </Suspense>
          </div>
        </div>
      </Container>
    </MainContainer>
  );
}
