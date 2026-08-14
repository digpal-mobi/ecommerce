import Breadcrumb from "@/website/components/common/Breadcrumb";
import Container from "@/website/components/common/Container";
import Pagination from "@/website/components/common/Pagination";
import SectionProductList from "@/website/section/products/SectionProductList";
import SectionFilter from "@/website/section/SectionFilters";
import { FetchProducts } from "@/website/utils/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Products({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const limit = 9;
  const skip = (currentPage - 1) * limit;

  const data = await FetchProducts({
    limit,
    skip,
  });

  const BreadCrumbItems = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];
  return (
    <Container className="!py-[0px]">
      <div className="py-[24px]">
        <Breadcrumb items={BreadCrumbItems} />
      </div>
      <div className="flex w-full items-center flex-col laptop:pb-[80px] pb-[50px]">
        <div className="flex w-full flex-col gap-[20px] laptop:flex-row">
          <SectionFilter />
          <SectionProductList data={data?.products} />
        </div>
        <Pagination
          currentPage={currentPage}
          total={data?.total ?? 0}
          limit={limit}
        />
      </div>
    </Container>
  );
}
