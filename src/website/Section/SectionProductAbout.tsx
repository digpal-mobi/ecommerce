"use client";

import React, { useState } from "react";
import Container from "@/website/components/common/Container";
import Breadcrumb from "@/website/components/common/Breadcrumb";
import SectionImageGallery from "@/website/section/SectionImageGallery";
import TitleTag from "@/website/components/common/TitleTag";

import { ApiResponse } from "@/website/utils/api";
import SectionRating from "@/website/section/SectionRating";
import SectionProductPrices from "@/website/section/SectionProductPrices";
import Paragraph from "@/website/components/common/Paragraph";
import Increment from "@/website/components/Increment";
import Button from "@/website/components/common/Button";
import { AddToCartIcon, WishlistIcon } from "@/website/lib/Icons";
import { useDispatch, useSelector } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist, WishlistProduct } from "@/redux/slices/wishlistSlice";
import { showToast } from "@/redux/slices/toastSlice";

type Props = {
  data?: ApiResponse | any;
  images?: string[];
};

const SectionProductAbout = ({ data }: Props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const wishlistItems =
    useSelector((state) => state.wishlist?.items) || [];

  const isWishlisted = Boolean(
    data?.id &&
      wishlistItems.some((item: WishlistProduct) => item.id === data.id),
  );

  const images: string[] =
    (data as any)?.images || (data as any)?.products?.images || [];

  const categoryName =
    typeof data?.category === "object"
      ? data?.category?.name || data?.category?.id
      : data?.category || "Products";

  const BreadCrumbItems = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: categoryName, url: `/shop` },
    { name: data?.title || "Details", url: "" },
  ];

  const handleAddToCart = () => {
    if (!data) return;
    const productCart = {
      id: data.id,
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail || (images.length > 0 ? images[0] : ""),
      quantity,
    };

    dispatch(addToCart(productCart));
    dispatch(
      showToast({
        title: "Success",
        message: `${data.title} added to cart`,
        type: "success",
      }),
    );
  };

  const handleToggleWishlist = () => {
    if (!data) return;
    dispatch(
      toggleWishlist({
        id: data.id,
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail || (images.length > 0 ? images[0] : ""),
        rating: data.rating,
        category: categoryName,
      }),
    );
    dispatch(
      showToast({
        title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
        message: isWishlisted
          ? `Removed "${data.title}" from your wishlist`
          : `Added "${data.title}" to your wishlist`,
        type: "success",
      }),
    );
  };

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
              <SectionRating rating={data?.rating} />
            </div>
            <SectionProductPrices
              price={data?.price}
              discountPercentage={
                data?.discountPercentage ?? data?.discountAmount
              }
            />
            <Paragraph className="mt-[20px]" variant="normalPara">
              {data?.description}
            </Paragraph>
          </div>
          <div className="flex w-full laptop:flex-row flex-col gap-[20px] laptop:gap-0 justify-between py-[0px] tablet:py-[20px] ">
            <div className="flex flex-col gap-[10px]">
              <TitleTag variant="bold" as="h3">
                Brand
              </TitleTag>
              <TitleTag variant="satoshiBold" as="h4">
                {data?.brand || "Generic"}
              </TitleTag>
            </div>
            <div className="flex flex-col gap-[10px]">
              <TitleTag variant="bold" as="h3">
                SKU
              </TitleTag>
              <TitleTag variant="satoshiBold" as="h4">
                {data?.sku || "N/A"}
              </TitleTag>
            </div>
            <div className="flex flex-col gap-[10px]">
              <TitleTag variant="bold" as="h3">
                Category
              </TitleTag>
              <TitleTag variant="satoshiBold" as="h4">
                {categoryName}
              </TitleTag>
            </div>
          </div>
          <div className="flex w-full flex-col tablet:flex-row gap-[24px] mt-[24px] items-center">
            <div className="w-[40%] flex">
              <Increment
                value={quantity}
                onChange={(val) => setQuantity(val)}
                className="w-full flex"
              />
            </div>
            <Button
              onClick={handleAddToCart}
              variant="primary"
              className="gap-[10px] w-full"
            >
              <AddToCartIcon className="h-[22px] w-[22px]" />
              <TitleTag as="span" variant="satoshiBold">
                Add to Cart
              </TitleTag>
            </Button>
          </div>
          <div className="flex w-full items-center mt-[20px]">
            <Button
              onClick={handleToggleWishlist}
              variant={isWishlisted ? "primary" : "outline"}
              className={`flex-1 shrink-0 gap-[10px] transition-all ${
                isWishlisted
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : ""
              }`}
            >
              <WishlistIcon
                filled={isWishlisted}
                className="h-[22px] w-[22px]"
              />
              <TitleTag as="span" variant="satoshiBold">
                {isWishlisted ? "In Wishlist" : "Add to wishlist"}
              </TitleTag>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SectionProductAbout;
