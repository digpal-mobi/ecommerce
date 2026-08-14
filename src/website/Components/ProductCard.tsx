"use client";

import Image from "next/image";
import SectionRating from "@/website/section/SectionRating";
import Button from "@/website/components/common/Button";
import { AddToCartIcon, WishlistIcon } from "@/website/lib/Icons";
import TitleTag from "@/website/components/common/TitleTag";
import Paragraph from "@/website/components/common/Paragraph";
import Increment from "@/website/components/Increment";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import LazyImage from "./common/LazyImage";
import { useState } from "react";
import { showToast } from "@/redux/slices/toastSlice";
import { AddToCart } from "../utils/api";

type Props = {
  products?: Array<any>;
};

const ProductCard = ({ products }: Props) => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

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
          <div key={items.id} className="flex flex-col shrink-0">
            <Link href={`/shop/${items.id}`} className="relative">
              <LazyImage
                src={items.thumbnail}
                width={295}
                height={298}
                alt="product image"
                className="bg-[#F0EEED] rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer"
              />

              <div className="absolute top-0 right-0">
                <button>
                  <WishlistIcon />
                </button>
              </div>
            </Link>
            <div className="mt-[16px] flex flex-col items-start">
              <TitleTag variant="satoshiBold" as="h3">
                {items.title}
              </TitleTag>
              <SectionRating rating={items.rating} />
              <div className="flex items-center justify-between w-full">
                <Paragraph variant="boldPara">${items.price}</Paragraph>
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
                onClick={() => {
                  HandleAddToCart(items);
                }}
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
