"use client";

import SectionRating from "@/website/section/SectionRating";
import Button from "@/website/components/common/Button";
import { AddToCartIcon, WishlistIcon } from "@/website/lib/Icons";
import TitleTag from "@/website/components/common/TitleTag";
import Paragraph from "@/website/components/common/Paragraph";
import Increment from "@/website/components/Increment";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist, WishlistProduct } from "@/redux/slices/wishlistSlice";
import LazyImage from "./common/LazyImage";
import { useState } from "react";
import { showToast } from "@/redux/slices/toastSlice";
import { AddToCart } from "../utils/api";
import { useSelector } from "@/redux/store";
import { CurrencyConverter } from "../helpers/helper";

type Props = {
  products?: Array<any>;
};

const ProductCard = ({ products }: Props) => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const currency = useSelector((state: any) => state.currency.currency);
  const wishlistItems = useSelector((state: any) => state.wishlist?.items) || [];

  const isWishlisted = (id: number) => {
    return wishlistItems.some((item: WishlistProduct) => item.id === id);
  };

  const handleToggleWishlist = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlisted = isWishlisted(item.id);
    dispatch(
      toggleWishlist({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        rating: item.rating,
        category:
          typeof item.category === "object"
            ? item.category?.name || item.category?.id
            : item.category,
      }),
    );
    dispatch(
      showToast({
        title: wishlisted ? "Removed from Wishlist" : "Added to Wishlist",
        message: wishlisted
          ? `Removed "${item.title}" from wishlist`
          : `Added "${item.title}" to wishlist`,
        type: "success",
      }),
    );
  };

  const getQuantity = (id: number) => {
    return quantities[id] ?? 1;
  };

  const handlePrice = (price: number) => {
    const newPrice = CurrencyConverter(price, currency);
    return newPrice;
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const HandleAddToCart = (product: any) => {
    const quantity = getQuantity(product.id);
    const productCart = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    };

    dispatch(addToCart(productCart));
    const AddProductToCart = AddToCart(productCart);
    dispatch(
      showToast({
        title: "Success",
        message: "Item added to cart",
        variant: "success",
      }),
    );
  };

  return (
    <section className="w-full py-[32px] laptop:py-[55px]">
      <div className="flex gap-[20px] laptop:justify-center justify-start">
        {products?.map((items) => (
          <div key={items.id} className="flex flex-col shrink-0 w-[295px]">
            <Link href={`/shop/${items.id}`} className="relative block">
              <LazyImage
                src={items.thumbnail}
                width={295}
                height={298}
                alt="product image"
                className="bg-[#F0EEED] rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer w-full h-auto"
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
                    className="h-[18px] w-[18px]"
                  />
                </button>
              </div>
            </Link>

            <div className="mt-[16px] flex flex-col items-start">
              <div className="!h-[48px] overflow-hidden">
                <TitleTag
                  variant="satoshiBold"
                  as="h3"
                  className="line-clamp-2 leading-[24px]"
                >
                  {items.title}
                </TitleTag>
              </div>

              <SectionRating rating={items.rating} />

              <div className="flex items-center justify-between w-full">
                <Paragraph variant="boldPara">
                  {handlePrice(items.price)}
                </Paragraph>

                <Increment
                  value={getQuantity(items.id)}
                  onChange={(quantity) =>
                    handleQuantityChange(items.id, quantity)
                  }
                />
              </div>
            </div>

            <div className="mt-[16px] flex items-center justify-center w-full">
              <Button
                onClick={() => HandleAddToCart(items)}
                variant="primary"
                className="w-full gap-[10px]"
              >
                <AddToCartIcon className="h-[20px] w-[20px]" />

                <TitleTag as="span" variant="satoshiBold">
                  Add to Cart
                </TitleTag>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCard;
