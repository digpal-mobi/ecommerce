import Breadcrumb from "@/website/Components/common/Breadcrumb";
import Container from "@/website/Components/common/Container";
import SectionProductList from "@/website/Section/Products/SectionProductList";
import SectionFilter from "@/website/Section/SectionFilters";
import { FetchProducts } from "@/website/utils/api";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Products Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

export default async function Products() {
  const data = await FetchProducts();

  const BreadCrumbItems = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];
  return (
    <Container className="!py-[0px]">
      <div className="py-[24px]">
        <Breadcrumb items={BreadCrumbItems} />
      </div>
      <div className="flex flex-col gap-[20px] laptop:pb-[80px] pb-[50px] laptop:flex-row">
        <SectionFilter />
        <SectionProductList data={data?.products} />
      </div>
    </Container>
  );
}
