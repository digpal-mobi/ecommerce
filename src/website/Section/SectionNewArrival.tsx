import React from "react";
import ProductCard from "@/website/Components/ProductCard";
import Container from "../Components/Container";
import Button from "../Components/Button";

type Props = {};

const SectionNewArrival = (props: Props) => {
  return (
    <Container className="w-full">
      <div className="flex justify-center items-center w-full">
        <h1 className="font-integral laptop:text-[48px] text-[32px] leading-[1em] font-[700]">
          NEW ARRIVALS
        </h1>
      </div>
      <div className="overflow-x-auto scrollbar-hide w-full">
        <ProductCard />
      </div>

      <div>
        <Button className="mx-auto" btnText="View All" variant="secondary" />
      </div>
    </Container>
  );
};

export default SectionNewArrival;
