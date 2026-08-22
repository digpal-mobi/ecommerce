"use client";

import Paragraph from "@/website/Components/Common/Paragraph";
import Increment from "@/website/Components/Increment";
import SectionRating from "../SectionRating";
import TitleTag from "@/website/Components/Common/TitleTag";
import Image from "next/image";
import Pagination from "@/website/Components/Common/Pagination";
import Link from "next/link";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import Button from "@/website/Components/Common/Button";
import { AddToCartIcon, WishlistIcon } from "@/website/Lib/Icons";
import { CurrencyConverter } from "@/website/Helpers/Helper";
import SortingComponent from "@/website/Components/Common/Sorting";
import { useFilters } from "@/website/Hooks/UseFilters";
import { setTotal } from "@/redux/slices/paginationSlice";
import { toggleWishlist, WishlistProduct } from "@/redux/slices/wishlistSlice";
import { addToCartAsync } from "@/redux/slices/cartSlice";
import { openLoginModal } from "@/redux/slices/authSlice";

type Props = {
  data?: any[];
  initialTotal?: number;
};

const SectionProductList = ({ data, initialTotal = 0 }: Props) => {
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const currency = useSelector((state: RootState) => state.currency.currency);
  const wishlistItems =
    useSelector((state: RootState) => state.wishlist?.items) || [];

  const { isAuthenticated, userDetails } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    total: reduxTotal,
    currentPage,
    limit,
  } = useSelector((state: RootState) => state.pagination);

  const total = reduxTotal || initialTotal;
  const { changePage, resetFilters } = useFilters();

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
  };

  useEffect(() => {
    if (initialTotal !== undefined) {
      dispatch(setTotal(initialTotal));
    }
  }, [initialTotal, dispatch]);

  const displayProducts = data || [];

  const getQuantity = (id: number) => {
    return quantities[id] ?? 1;
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const handleAddToCart = (product: any) => {
    try {
      if (!isAuthenticated) {
        dispatch(openLoginModal());
        return;
      }
      const quantity = getQuantity(product.id);

      const productCart = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
      };

      dispatch(
        addToCartAsync({
          product: productCart,
          userId: Number(userDetails?.id) || 1,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex-1">
      <div className="mb-[16px] flex flex-col laptop:flex-row items-center justify-between">
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
              Showing {displayProducts.length} out of {total}
            </Paragraph>
          </div>

          <SortingComponent />
        </div>
      </div>

      {displayProducts.length > 0 ? (
        <>
          <div className="grid laptop:grid-cols-3 grid-cols-1 gap-x-[16px] gap-y-[30px]">
            {displayProducts.map((items: any) => (
              <div
                key={items.id}
                className="flex flex-col justify-between shrink-0"
              >
                <div className="relative block">
                  <Link className="w-full block" href={`/shop/${items.id}`}>
                    <Image
                      src={items.thumbnail}
                      width={295}
                      height={298}
                      alt={items.title || "product image"}
                      className="bg-[#F0EEED] w-full h-auto rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer"
                    />
                  </Link>

                  <div className="absolute top-3 right-3 z-10">
                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(e, items)}
                      aria-label={"Add to Wishlist"}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                    >
                      <WishlistIcon
                        filled={isWishlisted(items.id)}
                        className="h-[18px] cursor-pointer w-[18px]"
                      />
                    </button>
                  </div>
                </div>

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
                    onClick={() => handleAddToCart(items)}
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

          <Pagination
            currentPage={currentPage}
            total={total}
            limit={limit}
            onPageChange={changePage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-[60px] px-[20px] text-center bg-[#F9F9F9] rounded-[20px] border border-[#EEEEEE] my-[10px] w-full">
          <div className="w-[68px] h-[68px] rounded-full bg-white flex items-center justify-center shadow-xs mb-[16px]">
            <svg
              className="w-[34px] h-[34px] text-[#000000]/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <TitleTag as="h3" variant="heading" className="!text-[22px] mb-[8px]">
            No Products Available
          </TitleTag>
          <Paragraph
            variant="normalPara"
            className="text-[#000000]/60 max-w-[420px] mb-[24px]"
          >
            We couldn&apos;t find any products matching your search or active filters. Try adjusting your search keywords or resetting filters.
          </Paragraph>
          <Button
            variant="primary"
            onClick={resetFilters}
            className="!px-[28px] !py-[12px]"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </main>
  );
};

export default SectionProductList;
