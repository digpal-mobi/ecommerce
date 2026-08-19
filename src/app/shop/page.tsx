import Breadcrumb from "@/website/components/common/Breadcrumb";
import Container from "@/website/components/common/Container";
import SectionProductList from "@/website/section/products/SectionProductList";
import SectionFilter from "@/website/section/SectionFilters";
import { FetchCategory, FetchProducts } from "@/website/utils/api";
import { Metadata } from "next";

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
  const data = await FetchProducts({
    limit: 9,
    skip: 0,
  });

  const categories = await FetchCategory();

  const BreadCrumbItems = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];
  return (
    <Container className="!py-[0px]">
      <div className="py-[24px]">
        <Breadcrumb items={BreadCrumbItems} />
      </div>
      <div className="flex w-full gap-[20px] flex-col tablet:flex-row laptop:pb-[80px] pb-[50px]">
        <SectionFilter categories={categories} />
        <div className="flex w-full flex-col">
          <SectionProductList
            data={data?.products}
            initialTotal={data?.total}
          />
        </div>
      </div>
    </Container>
  );
}
