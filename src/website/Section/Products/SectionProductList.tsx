"use client";

import Paragraph from "@/website/Components/Common/Paragraph";
import Increment from "@/website/Components/Increment";
import SectionRating from "../SectionRating";
import TitleTag from "@/website/Components/Common/TitleTag";
import LazyImage from "@/website/Components/Common/LazyImage";
import Pagination from "@/website/Components/Common/Pagination";
import Link from "next/link";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/website/Components/Common/Button";
import { AddToCartIcon, WishlistIcon } from "@/website/Lib/Icons";
import { CurrencyConverter } from "@/website/Helpers/Helper";
import SortingComponent from "@/website/Components/Common/Sorting";
import { useFilters } from "@/website/Hooks/UseFilters";
import { setTotal } from "@/redux/slices/paginationSlice";
import { toggleWishlist, WishlistProduct } from "@/redux/slices/wishlistSlice";
import { addToCartAsync } from "@/redux/slices/cartSlice";
import { openLoginModal } from "@/redux/slices/authSlice";
import { ProductGridSkeleton } from "@/website/Components/Common/ProductSkeleton";
import { FetchProducts } from "@/website/Utils/Api";
import { useSearchParams } from "next/navigation";
import { getPaginationFromSearchParams } from "@/website/Utils/ProductUrl";

type Props = Readonly<{
  data?: any[];
  initialTotal?: number;
}>;

const SectionProductList = ({ data, initialTotal = 0 }: Readonly<Props>) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const [products, setProducts] = useState<any[]>(data ?? []);
  const [totalCount, setTotalCount] = useState<number>(initialTotal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const isFirstMount = useRef(true);

  const currency = useSelector((state: RootState) => state.currency.currency);
  const wishlistItems =
    useSelector((state: RootState) => state.wishlist?.items) ?? [];

  const { isAuthenticated, userDetails } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    total: reduxTotal,
    currentPage: reduxPage,
    limit: reduxLimit,
  } = useSelector((state: RootState) => state.pagination);

  const urlPagination = useMemo(
    () => getPaginationFromSearchParams(searchParams),
    [searchParams],
  );

  const currentPage = urlPagination.currentPage || reduxPage;
  const limit = urlPagination.limit || reduxLimit;

  const total = reduxTotal || totalCount;
  const { changePage, resetFilters } = useFilters();

  const isWishlisted = (id: number) => {
    return wishlistItems.some((item: WishlistProduct) => item.id === id);
  };

  const handleToggleWishlist = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      toggleWishlist({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        rating: item.rating,
        category:
          typeof item.category === "object"
            ? (item.category?.name ?? item.category?.id)
            : item.category,
      }),
    );
  };

  // Sync server props when data changes
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
    if (initialTotal !== undefined) {
      setTotalCount(initialTotal);
      dispatch(setTotal(initialTotal));
    }
  }, [data, initialTotal, dispatch]);

  // Client-side fetch on filter / searchParams change (skips first render)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    let isMounted = true;
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        const pageParam = searchParams.get("page");
        const limitParam = searchParams.get("limit");
        const category = searchParams.get("category");
        const brand = searchParams.get("brand");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const rating = searchParams.get("rating");
        const color = searchParams.get("color");
        const size = searchParams.get("size");
        const dressStyle = searchParams.get("dressStyle");
        const sortBy = searchParams.get("sortBy");
        const sortOrder = searchParams.get("sortOrder");
        const q = searchParams.get("q");

        const currLimit = limitParam ? Number(limitParam) : (limit ?? 9);
        const currPage = pageParam ? Number(pageParam) : 1;
        const skip = (currPage - 1) * currLimit;

        const response = await FetchProducts({
          limit: currLimit,
          skip,
          category: category ?? undefined,
          brand: brand ?? undefined,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          rating: rating ? Number(rating) : undefined,
          color: color ?? undefined,
          size: size ?? undefined,
          dressStyle: dressStyle ?? undefined,
          sortBy: sortBy ?? undefined,
          order: sortOrder ?? undefined,
          q: q ?? undefined,
        });

        if (isMounted) {
          if (response.status !== false && Array.isArray(response.products)) {
            setProducts(response.products);
            const count = response.total ?? response.products.length;
            setTotalCount(count);
            dispatch(setTotal(count));
          } else {
            setProducts([]);
            setTotalCount(0);
            dispatch(setTotal(0));
          }
        }
      } catch {
        if (isMounted) {
          setProducts([]);
          setTotalCount(0);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFilteredProducts();

    return () => {
      isMounted = false;
    };
  }, [searchParamsString, searchParams, dispatch, limit]);

  const displayProducts = products;

  const categoryTitle = useMemo(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      return categoryParam.split(",")[0].replaceAll("-", " ");
    }
    if (products.length > 0 && products[0]?.category) {
      return String(products[0].category).replaceAll("-", " ");
    }
    return "Products";
  }, [searchParams, products]);

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
      console.error(error);
    }
  };
  const renderProductContent = () => {
    if (isLoading) {
      return <ProductGridSkeleton count={limit ?? 9} />;
    }

    if (displayProducts.length === 0) {
      return (
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
            We couldn&apos;t find any products matching your search or active
            filters. Try adjusting your search keywords or resetting filters.
          </Paragraph>
          <Button
            variant="primary"
            onClick={resetFilters}
            className="!px-[28px] !py-[12px]"
          >
            Clear Filters
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className="grid min-desktop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-x-[16px] gap-y-[30px]">
          {displayProducts.map((items: any) => (
            <div
              key={items.id}
              className="flex flex-col justify-between shrink-0"
            >
              <div className="relative block">
                <Link className="w-full block" href={`/shop/${items.id}`}>
                  <LazyImage
                    src={items.thumbnail}
                    width={295}
                    height={298}
                    alt={items.title ?? "product image"}
                    className="bg-[#F0EEED] w-full h-auto rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer"
                  />
                </Link>

                <div className="absolute top-3 right-3 z-10">
                  <button
                    type="button"
                    onClick={(e) => handleToggleWishlist(e, items)}
                    aria-label="Add to Wishlist"
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
                  <Paragraph variant="boldPara" suppressHydrationWarning>
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
    );
  };

  return (
    <main className="flex-1">
      <div className="mb-[16px] flex flex-col laptop:flex-row justify-between">
        <div className="flex w-full items-start laptop:items-center">
          <TitleTag
            className="!laptop:text-[32px] !text-left !text-[24px] capitalize"
            variant="heading"
            as="h2"
          >
            {categoryTitle}
          </TitleTag>
        </div>

        <div className="flex items-center laptop:justify-end justify-between w-full gap-[15px]">
          <div>
            <Paragraph variant="normalPara">
              Showing {displayProducts.length} out of {total}
            </Paragraph>
          </div>

          <SortingComponent />
        </div>
      </div>

      {renderProductContent()}
    </main>
  );
};

export default SectionProductList;
