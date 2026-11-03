"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Breadcrumb from "@/website/Components/Common/Breadcrumb";
import TitleTag from "@/website/Components/Common/TitleTag";
import Paragraph from "@/website/Components/Common/Paragraph";
import Button from "@/website/Components/Common/Button";
import LazyImage from "@/website/Components/Common/LazyImage";
import Link from "next/link";
import { useDispatch, useSelector } from "@/redux/store";
import {
  clearWishlist,
  removeFromWishlist,
  WishlistProduct,
} from "@/redux/slices/wishlistSlice";
import { addToCartAsync } from "@/redux/slices/cartSlice";
import { AddToCartIcon, TrashIcon, WishlistIcon } from "@/website/Lib/Icons";
import { CurrencyConverter } from "@/website/Helpers/Helper";
import SectionRating from "./SectionRating";
import { openLoginModal } from "@/redux/slices/authSlice";

const BreadCrumbItems = [
  { name: "Home", url: "/" },
  { name: "Wishlist", url: "/wishlist" },
];

const SectionWishlist = () => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  const { isAuthenticated, userDetails } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist?.items) ?? [];
  const currency = useSelector((state) => state.currency.currency);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = isMounted ? wishlistItems : [];

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  const handleClearAll = () => {
    dispatch(clearWishlist());
  };

  const handleAddToCart = (item: WishlistProduct) => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }

    dispatch(
      addToCartAsync({
        product: {
          id: item.id,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          quantity: 1,
        },
        userId: Number(userDetails?.id) || 1,
      }),
    );
  };

  const handleAddAllToCart = () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }

    items.forEach((item) => {
      dispatch(
        addToCartAsync({
          product: {
            id: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            quantity: 1,
          },
          userId: Number(userDetails?.id) || 1,
        }),
      );
    });
  };

  return (
    <MainContainer>
      <Container className="!py-0">
        <div className="py-[24px]">
          <Breadcrumb items={BreadCrumbItems} />
        </div>

        <div className="pb-[80px]">
          {/* Header Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-[24px] border-b border-[#000000]/10">
            <div>
              <TitleTag
                as="h1"
                variant="heading"
                className="!text-[28px] sm:!text-[36px]"
              >
                My Wishlist
              </TitleTag>
              <Paragraph
                variant="normalPara"
                className="mt-1 text-[#000000]/60"
              >
                {items.length} {items.length === 1 ? "item" : "items"} saved for
                later
              </Paragraph>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleAddAllToCart}
                  variant="primary"
                  className="gap-2 !py-[10px] !px-[16px] text-[14px]"
                >
                  <AddToCartIcon className="h-4 w-4" />
                  <span>Add All to Cart</span>
                </Button>
                <Button
                  onClick={handleClearAll}
                  variant="secondary"
                  className="gap-2 !py-[10px] !px-[16px] text-[14px] !bg-red-50 !text-red-600 cursor-pointer hover:!bg-red-100"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Clear All</span>
                </Button>
              </div>
            )}
          </div>

          {/* Wishlist Items Content */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 laptop:grid-cols-4 gap-[24px] mt-[32px]">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-[20px] border border-[#000000]/10 bg-white p-[16px] transition-all duration-300 hover:shadow-lg hover:border-black/20"
                >
                  <div>
                    {/* Thumbnail with Remove Heart Button */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#F0EEED]">
                      <Link
                        href={`/shop/${item.id}`}
                        className="block h-full w-full"
                      >
                        <LazyImage
                          src={item.thumbnail}
                          alt={item.title ?? "product image"}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white text-red-500"
                      >
                        <WishlistIcon
                          filled={true}
                          className="h-[18px] w-[18px]"
                        />
                      </button>

                      {item.category && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-[10px] py-[3px] text-[11px] font-medium text-[#000000]/70 backdrop-blur-sm capitalize">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="mt-[16px] flex flex-col items-start gap-1">
                      <Link
                        href={`/shop/${item.id}`}
                        className="hover:underline text-left"
                      >
                        <TitleTag
                          as="h3"
                          variant="satoshiBold"
                          className="line-clamp-1 !text-[16px] leading-[22px]"
                        >
                          {item.title}
                        </TitleTag>
                      </Link>

                      {item.rating !== undefined && (
                        <SectionRating rating={item.rating} />
                      )}

                      <div className="mt-2">
                        <Paragraph variant="boldPara" className="!text-[18px]">
                          {CurrencyConverter(item.price, currency)}
                        </Paragraph>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-[20px] flex items-center gap-2 pt-2 border-t border-[#000000]/10">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="primary"
                      className="w-full gap-2 !py-[10px] text-[14px]"
                    >
                      <AddToCartIcon className="h-[18px] w-[18px]" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-[80px] text-center">
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-red-50 mb-6">
                <WishlistIcon
                  filled={false}
                  color="#EF4444"
                  className="h-[56px] w-[56px] text-red-500 stroke-[1.5]"
                />
              </div>
              <TitleTag
                as="h2"
                variant="heading"
                className="!text-[24px] sm:!text-[30px]"
              >
                Your Wishlist is Empty
              </TitleTag>
              <Paragraph
                variant="normalPara"
                className="mt-3 max-w-[440px] text-[#000000]/60 text-[15px]"
              >
                Seems like you haven&apos;t added any items to your wishlist
                yet. Browse our catalog and save your favorites!
              </Paragraph>
              <div className="mt-8">
                <Link href="/shop">
                  <Button variant="primary" className="!px-[32px] !py-[14px]">
                    Explore Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionWishlist;
