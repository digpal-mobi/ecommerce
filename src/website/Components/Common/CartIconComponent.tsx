import { CartIcon, CrossIcon } from "@/website/Lib/Icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LazyImage from "./LazyImage";
import { RootState, useDispatch } from "@/redux/store";
import {
  clearCart,
  updateCart,
  closeMiniCart,
  toggleMiniCart,
} from "@/redux/slices/cartSlice";
import TitleTag from "./TitleTag";
import Paragraph from "./Paragraph";
import Increment from "../Increment";
import { CurrencyConverter } from "@/website/Helpers/Helper";

const CartIconComponent = () => {
  const router = useRouter();
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  const products = useSelector((state: RootState) => state.cart.products);
  const isMiniCartOpen = useSelector(
    (state: RootState) => state.cart.isMiniCartOpen,
  );

  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [newProductId, setNewProductId] = useState<string | number | null>(
    null,
  );

  const cartRef = useRef<HTMLDivElement>(null);
  const previousProductsRef = useRef<any[]>([]);

  const dispatch = useDispatch();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const handleRemoveCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(clearCart());
    dispatch(closeMiniCart());
  };

  const handleViewCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(closeMiniCart());
    router.push("/cart");
  };

  /** Animate cart icon and highlight newly added product */
  useEffect(() => {
    const prevProducts = previousProductsRef.current;
    if (prevProducts.length > 0 && products.length > prevProducts.length) {
      const addedProduct = products.find(
        (p: any) => !prevProducts.some((prev: any) => prev.id === p.id),
      );
      if (addedProduct) {
        setNewProductId(addedProduct.id);
        const timer = setTimeout(() => {
          setNewProductId(null);
        }, 1200);
        previousProductsRef.current = products;
        return () => clearTimeout(timer);
      }
    }

    if (quantity > 0 && prevProducts.length > 0) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => {
        setIsCartAnimating(false);
      }, 400);
      previousProductsRef.current = products;
      return () => clearTimeout(timer);
    }

    previousProductsRef.current = products;
  }, [products, quantity]);

  /** Close cart when clicking outside. */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest('[data-cart-container="true"]') ||
        cartRef.current?.contains(target as Node) ||
        target
          ?.closest("button")
          ?.textContent?.toLowerCase()
          .includes("cart") ||
        target?.closest("[data-add-to-cart]")
      ) {
        return;
      }
      dispatch(closeMiniCart());
    };

    if (isMiniCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMiniCartOpen, dispatch]);

  return (
    <div
      ref={cartRef}
      data-cart-container="true"
      className="relative flex items-center justify-center"
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => dispatch(toggleMiniCart())}
        className="relative flex items-center justify-center cursor-pointer focus:outline-none"
        aria-label="Toggle Cart Dropdown"
        aria-expanded={isMiniCartOpen}
        aria-haspopup="dialog"
      >
        {/* Cart Icon */}
        <div
          className={`transition-transform duration-300 ${
            isCartAnimating ? "scale-125" : "scale-100"
          }`}
        >
          <CartIcon />
        </div>

        <span
          className={`absolute top-[-8px] right-[-1px] font-[700] w-[18px] h-[18px] flex items-center justify-center text-white rounded-full text-[12px] bg-red-500 transition-transform duration-300 ${
            isCartAnimating ? "scale-125" : "scale-100"
          }`}
        >
          {quantity}
        </span>
      </button>

      {isMiniCartOpen && (
        <div
          className="
            absolute right-0 top-full mt-[10px]
            w-[350px] sm:w-[400px]
            max-h-[460px]
            flex flex-col
            rounded-[20px]
            bg-white
            py-[20px]
            px-[16px]
            shadow-[0px_10px_40px_rgba(0,0,0,0.12)]
            z-50
            border border-black/10
            animate-[miniCartIn_250ms_ease-out]
          "
        >
          {products?.length > 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[280px] pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                {products.map((product: any) => {
                  const isNewProduct = newProductId === product.id;

                  return (
                    <div
                      key={product.id}
                      className={`
                        flex w-full items-center justify-between
                        transition-all duration-500 ease-out
                        ${
                          isNewProduct
                            ? "translate-y-[-10px] opacity-0 animate-[cartItemIn_500ms_ease-out_forwards]"
                            : "translate-y-0 opacity-100"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <LazyImage
                          src={product.thumbnail}
                          width={75}
                          height={75}
                          alt={`${product.title} image`}
                          className="
                            bg-[#F0EEED]
                            rounded-[14px]
                            hover:scale-[1.05]
                            transition-all
                            cursor-pointer
                            shrink-0
                          "
                        />

                        <div className="flex flex-col gap-1">
                          <TitleTag
                            as="h3"
                            variant="satoshiBold"
                            className="line-clamp-1 !text-[15px]"
                          >
                            {product.title}
                          </TitleTag>

                          <Paragraph
                            variant="normalPara"
                            className="!text-[14px] text-black/70"
                          >
                            {product.quantity} x{" "}
                            {CurrencyConverter(product.price, currency)}
                          </Paragraph>
                        </div>
                      </div>

                      <div className="flex items-center shrink-0">
                        <Increment
                          value={product.quantity}
                          onChange={(quantity) => {
                            dispatch(
                              updateCart({
                                id: product.id,
                                quantity,
                              }),
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pinned Action Buttons */}
              <div className="flex w-full justify-between items-center pt-4 mt-3 border-t border-black/10 gap-3">
                <button
                  type="button"
                  onClick={handleViewCart}
                  className="flex-1 rounded-full py-[12px] px-[16px] bg-black text-white hover:opacity-80 font-satoshi text-[14px] font-[500] leading-[1.3em] transition-all text-center cursor-pointer"
                >
                  View Cart
                </button>

                <button
                  type="button"
                  onClick={handleRemoveCart}
                  className="flex-1 rounded-full py-[12px] px-[16px] border border-black/10 bg-white text-black hover:opacity-80 font-satoshi text-[14px] font-[500] leading-[1.3em] transition-all text-center cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row-reverse gap-1">
              <button
                type="button"
                className="text-[#000000]/60 px-[10px] hover:text-black cursor-pointer"
                onClick={() => dispatch(closeMiniCart())}
                aria-label="Close empty cart"
              >
                <CrossIcon color="#000000" />
              </button>

              <TitleTag
                as="span"
                variant="satoshiBold"
                className="flex items-center justify-start w-full"
              >
                Your cart is empty
              </TitleTag>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIconComponent;
