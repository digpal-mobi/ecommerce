"use client";

import Paragraph from "@/website/components/common/Paragraph";
import Increment from "@/website/components/Increment";
import SectionRating from "../SectionRating";
import TitleTag from "@/website/components/common/TitleTag";
import Image from "next/image";
import Pagination from "@/website/components/common/Pagination";
import Link from "next/link";
import { dispatch, RootState, useDispatch, useSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { addToCart } from "@/redux/slices/cartSlice";
import Button from "@/website/components/common/Button";
import { AddToCartIcon } from "@/website/lib/Icons";
import { CurrencyConverter } from "@/website/helpers/helper";
import SortingComponent from "@/website/components/common/Sorting";
import {
  fetchProducts,
  fetchSearchedProducts,
} from "@/redux/slices/productSlice";
import { useSearchParams } from "next/navigation";

type Props = {
  data?: any[];
};

export const selectDisplayedProducts = (state: RootState) => {
  return state.product.searchProducts.length > 0
    ? state.product.searchProducts
    : state.product.products;
};

const SectionProductList = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const currency = useSelector((state: RootState) => state.currency.currency);
  const totalProduct = useSelector(
    (state) => state.pagination.setTotalProductCount,
  );

  const { products } = useSelector((state: any) => state.product);

  const displayProducts =
    products && products.length > 0 ? products : data || [];

  useEffect(() => {
    if (search) {
      dispatch(fetchSearchedProducts({ query: search }));
    } else {
      dispatch(fetchProducts());
    }
  }, [search, dispatch]);

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
  };
  return (
    <main className="flex-1">
      <div className="mb-[16px] flex items-center justify-between">
        <div>
          <TitleTag
            className="!laptop:text-[32px] !text-[24px]"
            variant="heading"
            as="h2"
          >
            {data && data.length > 0 ? data[0].category : "Products"}
          </TitleTag>
        </div>
        <div className="flex items-center gap-[15px]">
          <div>
            <Paragraph variant="normalPara">
              Showing {data?.length} out of {totalProduct}
            </Paragraph>
          </div>
          <div>
            <SortingComponent />
          </div>
        </div>
      </div>
      <div className="grid laptop:grid-cols-3 grid-cols-1 gap-x-[16px] gap-y-[30px]">
        {displayProducts?.map((items: any) => (
          <div key={items.id} className="flex flex-col shrink-0">
            <Link className="w-full" href={`/shop/${items.id}`}>
              <Image
                src={items.thumbnail}
                width={295}
                height={298}
                alt="product image"
                className="bg-[#F0EEED] w-full h-auto rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer"
              />
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
                  {CurrencyConverter(items.price, currency)}
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
      <div>
        <Pagination />
      </div>
    </main>
  );
};

export default SectionProductList;
