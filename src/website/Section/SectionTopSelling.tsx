import React from "react";
import ProductCard from "@/website/Components/ProductCard";
import Container from "@/website/Components/Container";
import Button from "@/website/Components/Button";

type Props = {};

const SectionTopSelling = (props: Props) => {
  return (
    <Container className="w-full ">
      <div className="flex justify-center items-center w-full">
        <h1 className="font-integral laptop:text-[48px] text-[32px] leading-[1em] font-[700]">
          YOP SELLING
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

export default SectionTopSelling;
