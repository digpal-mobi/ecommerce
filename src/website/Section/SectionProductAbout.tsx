"use client";

import React, { useState } from "react";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Breadcrumb from "@/website/Components/Common/Breadcrumb";
import SectionImageGallery from "@/website/Section/SectionImageGallery";
import TitleTag from "@/website/Components/Common/TitleTag";

import { ApiResponse } from "@/website/Utils/Api";
import SectionRating from "@/website/Section/SectionRating";
import SectionProductPrices from "@/website/Section/SectionProductPrices";
import Paragraph from "@/website/Components/Common/Paragraph";
import Increment from "@/website/Components/Increment";
import Button from "@/website/Components/Common/Button";
import { AddToCartIcon, WishlistIcon } from "@/website/Lib/Icons";
import { useDispatch, useSelector } from "@/redux/store";
import { addToCartAsync } from "@/redux/slices/cartSlice";
import { toggleWishlist, WishlistProduct } from "@/redux/slices/wishlistSlice";
import { openLoginModal } from "@/redux/slices/authSlice";

type Props = {
  data?: ApiResponse | any;
  images?: string[];
};

const SectionProductAbout = ({ data }: Readonly<Props>) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { isAuthenticated, userDetails } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist?.items) ?? [];

  const isWishlisted = Boolean(
    data?.id &&
    wishlistItems.some((item: WishlistProduct) => item.id === data.id),
  );

  const images: string[] =
    (data as any)?.images ?? (data as any)?.products?.images ?? [];

  const categorySlug =
    typeof data?.category === "object"
      ? (data?.category?.slug ?? data?.category?.id ?? data?.category?.name)
      : data?.category;

  const categoryName =
    typeof data?.category === "object"
      ? (data?.category?.name ?? data?.category?.id)
      : (data?.category ?? "Products");

  const BreadCrumbItems = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    ...(categorySlug
      ? [
          {
            name: categoryName,
            url: `/shop?category=${encodeURIComponent(categorySlug)}`,
          },
        ]
      : []),
    { name: data?.title ?? "Details", url: "" },
  ];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
    if (!data) return;
    const productCart = {
      id: data.id,
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail || (images.length > 0 ? images[0] : ""),
      quantity,
    };

    dispatch(
      addToCartAsync({
        product: productCart,
        userId: Number(userDetails?.id) || 1,
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
  };

  return (
    <MainContainer>
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
                  {data?.brand ?? "Generic"}
                </TitleTag>
              </div>
              <div className="flex flex-col gap-[10px]">
                <TitleTag variant="bold" as="h3">
                  SKU
                </TitleTag>
                <TitleTag variant="satoshiBold" as="h4">
                  {data?.sku ?? "N/A"}
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

              <div className="flex w-full gap-[12px] items-center">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  className="gap-[10px] flex-1"
                >
                  <AddToCartIcon className="h-[22px] w-[22px]" />
                  <TitleTag as="span" variant="satoshiBold">
                    Add to Cart
                  </TitleTag>
                </Button>

                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-pressed={isWishlisted}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className={`flex items-center justify-center shrink-0 w-[52px] h-[52px] rounded-lg border transition-all duration-200 active:scale-90 ${
                    isWishlisted
                      ? "border-black bg-black"
                      : "border-[#000000]/15 bg-white hover:border-[#000000]/40"
                  }`}
                >
                  <WishlistIcon
                    filled={isWishlisted}
                    className={`h-[22px] w-[22px] transition-transform duration-200 ${
                      isWishlisted ? "scale-110 text-white" : "text-black"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionProductAbout;
