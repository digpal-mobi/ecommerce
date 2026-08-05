import React from "react";
import Container from "../Components/common/Container";
import Breadcrumb from "../Components/common/Breadcrumb";
import SectionImageGallery from "./SectionImageGallery";
import TitleTag from "../Components/common/TitleTag";

import { ApiResponse } from "../utils/api";
import SectionRating from "./SectionRating";
import SectionProductPrices from "./SectionProductPrices";
import Paragraph from "../Components/common/Paragraph";
import Increment from "../Components/Increment";
import Button from "../Components/common/Button";
import { AddToCartIcon, WishlistIcon } from "../lib/Icons";

type Props = {
  data?: ApiResponse | any;
  images?: string[];
};

const BreadCrumbItems = [
  { name: "Home", url: "/" },
  { name: "Shop", url: "/shop" },
  { name: "Mens", url: "/shop/mens" },
  { name: "T-shirts", url: "/shop/mens/t-shirts" },
];

const SectionProductAbout = ({ data }: Props) => {
  const images: string[] =
    (data as any)?.images || (data as any)?.products?.images || [];

  console.log("Data", data);
  return (
    <Container className="!pt-[24px] !pb-[36px] border-t border-[#000000]/10">
      <section>
        <Breadcrumb items={BreadCrumbItems} />
      </section>
      <div className="flex flex-col mt-[16px] tablet:mt-[36px] tablet-lg:flex-row items-start gap-[24px] laptop:gap-[36px]">
        <div className="flex w-full tablet-lg:w-[50%]">
          <SectionImageGallery images={images} />
        </div>
        <div className="flex w-full tablet-lg:w-[50%] flex-col ">
          <div className=" flex flex-col border-b border-[#000000]/20 pb-[20px]">
            <TitleTag as="h2" variant="heading">
              {data?.title}
            </TitleTag>
            <div className="tablet:mt-[16px] mt-[10px]">
              <SectionRating rating={data.rating} />
            </div>
            <SectionProductPrices
              price={data?.price}
              discountPercentage={
                data?.discountPercentage ?? data?.discountAmount
              }
            />
            <Paragraph className="mt-[20px]" variant="normalPara">
              {data.description}
            </Paragraph>
          </div>
          <div className="flex w-full justify-between py-[20px] ">
            <div className="flex flex-col gap-[10px]">
              <TitleTag variant="bold" as="h3">
                Brand
              </TitleTag>
              <TitleTag variant="satoshiBold" as="h4">
                {data?.brand}
              </TitleTag>
            </div>
            <div className="flex flex-col gap-[10px]">
              <TitleTag variant="bold" as="h3">
                SKU
              </TitleTag>
              <TitleTag variant="satoshiBold" as="h4">
                {data?.sku}
              </TitleTag>
            </div>
            <div className="flex flex-col gap-[10px]">
              <TitleTag variant="bold" as="h3">
                Category
              </TitleTag>
              <TitleTag variant="satoshiBold" as="h4">
                {data?.category}
              </TitleTag>
            </div>
          </div>
          <div className="flex w-full gap-[24px] mt-[24px] items-center">
            <Increment className="w-[170px] shrink-0" />
            <Button variant="primary" className="flex-1 shrink-0">
              <AddToCartIcon className="h-[20px] w-[20px]" />
              <span>Add to Cart</span>
            </Button>
          </div>
          <div className="flex w-full items-center mt-[20px]">
            <Button variant="outline" className="flex-1">
              <WishlistIcon className="h-[20px] w-[20px]" />
              <span>Add to Whislist</span>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SectionProductAbout;
