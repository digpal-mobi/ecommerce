import React from "react";
import ProductCard from "@/website/Components/ProductCard";
import Container from "@/website/Components/common/Container";
import Button from "@/website/Components/common/Button";

type Props = {
  products: Array<any>;
};

const SectionNewArrival = ({ products }: Props) => {
  return (
    <Container className="w-full !pb-[0px]">
      <div className="flex justify-center items-center w-full">
        <h1 className="font-integral laptop:text-[48px] text-[32px] leading-[1em] font-[700]">
          NEW ARRIVALS
        </h1>
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

export default SectionNewArrival;
