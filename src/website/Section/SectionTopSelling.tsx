import React from "react";
import ProductCard from "@/website/Components/ProductCard";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Button from "@/website/Components/Common/Button";
import TitleTag from "../Components/Common/TitleTag";
import Link from "next/link";

type Props = {
  products: Array<any>;
  viewAllHref?: string;
};

const SectionTopSelling = ({
  products,
  viewAllHref = "/shop?category=womens-dresses",
}: Readonly<Props>) => {
  return (
    <MainContainer>
      <Container>
        <div className="laptop:pt-[80px] pt-[50px]">
          <div className="flex justify-center items-center w-full">
            <TitleTag as="h2" variant="heading">
              TOP SELLING
            </TitleTag>
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

export default SectionTopSelling;
