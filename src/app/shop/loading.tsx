import React from "react";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Breadcrumb from "@/website/Components/Common/Breadcrumb";
import { ProductGridSkeleton } from "@/website/Components/Common/ProductSkeleton";

export default function ShopLoading() {
  const BreadCrumbItems = [
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
          {/* Filter Sidebar Skeleton */}
          <aside className="w-full max-w-[295px] rounded-[16px] border border-[#E8E8E8] bg-white p-[18px] hidden laptop:block animate-pulse shrink-0 h-[600px]">
            <div className="h-[24px] bg-[#E8E8E8] rounded-md w-1/3 mb-6" />
            <div className="space-y-4">
              <div className="h-[40px] bg-[#E8E8E8] rounded-md w-full" />
              <div className="h-[40px] bg-[#E8E8E8] rounded-md w-full" />
              <div className="h-[40px] bg-[#E8E8E8] rounded-md w-full" />
              <div className="h-[40px] bg-[#E8E8E8] rounded-md w-full" />
            </div>
          </aside>

          {/* Product Grid Skeleton */}
          <div className="flex w-full flex-col">
            <div className="mb-[16px] flex flex-col laptop:flex-row items-center justify-between animate-pulse">
              <div className="h-[32px] w-[140px] bg-[#E8E8E8] rounded-md" />
              <div className="h-[20px] w-[120px] bg-[#E8E8E8] rounded-md" />
            </div>
            <ProductGridSkeleton count={9} />
          </div>
        </div>
      </Container>
    </MainContainer>
  );
}
