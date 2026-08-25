import React from "react";
import ProductCard from "@/website/Components/ProductCard";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Button from "@/website/Components/Common/Button";
import Link from "next/link";

type Props = {
  products: Array<any>;
  viewAllHref?: string;
};

const SectionNewArrival = ({
  products,
  viewAllHref = "/shop?category=tops",
}: Readonly<Props>) => {
  return (
    <MainContainer>
      <Container>
        <div className="laptop:pt-[80px] pt-[50px]">
          <div className="flex justify-center items-center w-full">
            <h2 className="font-integral laptop:text-[48px] text-[32px] leading-[1em] font-[700]">
              NEW ARRIVALS
            </h2>
          </div>
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide w-full">
            <ProductCard products={products} />
          </div>

          <div className="flex items-center justify-center mt-[10px]">
            <Link href={viewAllHref}>
              <Button variant="secondary" className="!px-[54px] !py-[16px]">
                View All
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionNewArrival;
