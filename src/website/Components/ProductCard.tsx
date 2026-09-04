"use client";

import SectionRating from "@/website/Section/SectionRating";
import Button from "@/website/Components/Common/Button";
import { AddToCartIcon, WishlistIcon } from "@/website/Lib/Icons";
import TitleTag from "@/website/Components/Common/TitleTag";
import Paragraph from "@/website/Components/Common/Paragraph";
import Increment from "@/website/Components/Increment";
import Link from "next/link";
import { useDispatch, useSelector } from "@/redux/store";
import { addToCartAsync } from "@/redux/slices/cartSlice";
import { toggleWishlist, WishlistProduct } from "@/redux/slices/wishlistSlice";
import { openLoginModal } from "@/redux/slices/authSlice";
import LazyImage from "./Common/LazyImage";
import { useState } from "react";
import {
  ConvertToFinalPrice,
  CurrencyConverter,
} from "@/website/Helpers/Helper";

type Props = Readonly<{
  products?: Array<any>;
}>;

const ProductCard = ({ products }: Readonly<Props>) => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const { isAuthenticated, userDetails } = useSelector(
    (state: any) => state.auth,
  );
  const currency = useSelector((state: any) => state.currency.currency);
  const wishlistItems =
    useSelector((state: any) => state.wishlist?.items) ?? [];

  const isWishlisted = (id: number) => {
    return wishlistItems.some((item: WishlistProduct) => item.id === id);
  };

  const handleToggleWishlist = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    const discount = Number(item.discountPercentage ?? 0);
    const finalPrice =
      discount > 0 ? ConvertToFinalPrice(item.price, discount) : item.price;

    dispatch(
      toggleWishlist({
        id: item.id,
        title: item.title,
        price: finalPrice,
        thumbnail: item.thumbnail,
        rating: item.rating,
        category:
          typeof item.category === "object"
            ? item.category?.name || item.category?.id
            : item.category,
      }),
    );
  };

  const getQuantity = (id: number) => {
    return quantities[id] ?? 1;
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const HandleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }

    const quantity = getQuantity(product.id);
    const discount = Number(product.discountPercentage ?? 0);
    const finalPrice =
      discount > 0
        ? ConvertToFinalPrice(product.price, discount)
        : product.price;

    const productCart = {
      id: product.id,
      title: product.title,
      price: finalPrice,
      thumbnail: product.thumbnail,
      quantity,
    };

    dispatch(
      addToCartAsync({
        product: productCart,
        userId: Number(userDetails?.id) || 1,
      }),
    );
  };

  return (
    <section className="w-full pt-[32px] pb-[32px] laptop:pt-[67px] laptop:pb-[55px]">
      <div className="flex gap-[20px] justify-start">
        {products?.map((items) => {
          const discount = Number(items.discountPercentage ?? 0);
          const finalPrice =
            discount > 0
              ? ConvertToFinalPrice(items.price, discount)
              : items.price;

          return (
            <div
              key={items.id}
              className="flex flex-col justify-between shrink-0 w-[295px] "
            >
              <Link
                href={`/shop/${items.id}`}
                aria-label={`View details for ${items.title}`}
                className="relative block"
              >
                <LazyImage
                  src={items.thumbnail}
                  width={295}
                  height={298}
                  alt={items.title}
                  className="bg-[#F0EEED] max-h-[298px] rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer w-full h-auto"
                />

                <div className="absolute top-3 right-3 z-10">
                  <button
                    type="button"
                    onClick={(e) => handleToggleWishlist(e, items)}
                    aria-label={
                      isWishlisted(items.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                  >
                    <WishlistIcon
                      filled={isWishlisted(items.id)}
                      className="h-[18px] cursor-pointer w-[18px]"
                    />
                  </button>
                </div>
              </Link>

              <div className="mt-[16px] flex flex-col items-start">
                <div className="overflow-hidden">
                  <TitleTag
                    variant="satoshiBold"
                    as="h3"
                    className="line-clamp-2 !tracking-[0.4px] leading-[24px]"
                  >
                    {items.title}
                  </TitleTag>
                </div>

                <SectionRating rating={items.rating} />

                <div className="mt-[12px] flex items-center gap-[10px] flex-wrap w-full">
                  <Paragraph variant="boldPara" suppressHydrationWarning>
                    <span
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: CurrencyConverter(finalPrice, currency),
                      }}
                    />
                  </Paragraph>

                  {discount > 0 && (
                    <>
                      <Paragraph
                        variant="boldPara"
                        className="text-[14px] line-through font-satoshi font-bold text-black/40"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: CurrencyConverter(items.price, currency),
                          }}
                        />
                      </Paragraph>

                      <span className="rounded-full px-[5px] py-[3px] laptop:px-[13.5px] laptop:py-[6px] leading-[1em] font-satoshi text-[10px] laptop:text-[12px] font-medium text-[#FF3333] bg-[#FF3333]/10">
                        -{Math.round(discount)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-[16px] flex items-center gap-[10px] w-full">
                <Increment
                  value={getQuantity(items.id)}
                  onChange={(quantity) =>
                    handleQuantityChange(items.id, quantity)
                  }
                  className="!h-[46px] !min-w-[95px] !px-[12px] shrink-0"
                />

                <Button
                  onClick={() => HandleAddToCart(items)}
                  variant="primary"
                  className="flex-1 gap-[8px] !py-[12px] !px-[14px] whitespace-nowrap"
                >
                  <AddToCartIcon className="h-[18px] w-[18px]" />

                  <TitleTag
                    as="span"
                    variant="satoshiBold"
                    className="!text-[14px]"
                  >
                    Add to Cart
                  </TitleTag>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCard;
