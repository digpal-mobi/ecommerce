import React from "react";
import ProductCard from "@/website/components/ProductCard";
import Container from "@/website/components/common/Container";
import Button from "@/website/components/common/Button";
import TitleTag from "../components/common/TitleTag";

type Props = {
  products: Array<any>;
};

const SectionTopSelling = ({ products }: Props) => {
  return (
    <Container className="w-full !pb-[0px]">
      <div className="flex justify-center items-center w-full">
        <TitleTag as="h2" variant="heading">
          TOP SELLING
        </TitleTag>
      </div>
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide w-full">
        <ProductCard products={products} />
      </div>
      <div className="flex items-center justify-center">
        <Button variant="secondary">View All</Button>
      </div>
    </Container>
  );
};

export default SectionTopSelling;
