import { CartIcon, CrossIcon } from "@/website/Lib/Icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Button from "./Button";
import LazyImage from "./LazyImage";
import { RootState, useDispatch } from "@/redux/store";
import { clearCart, updateCart } from "@/redux/slices/cartSlice";
import TitleTag from "./TitleTag";
import Paragraph from "./Paragraph";
import Increment from "../Increment";
import { CurrencyConverter } from "@/website/Helpers/Helper";

const CartIconComponent = () => {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  const products = useSelector((state: RootState) => state.cart.products);

  const [isIconClicked, setIsIconClicked] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [newProductId, setNewProductId] = useState<string | number | null>(
    null,
  );

  const cartRef = useRef<HTMLDivElement>(null);
  const previousProductsRef = useRef<any[]>([]);

  const dispatch = useDispatch();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const handleRemoveCart = () => {
    dispatch(clearCart());
    setIsIconClicked(false);
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

  /**Close cart when clicking outside.*/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsIconClicked(false);
      }
    };

    if (isIconClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isIconClicked]);

  return (
    <div ref={cartRef} className="relative flex items-center justify-center">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsIconClicked((prev) => !prev)}
        className="relative flex items-center justify-center cursor-pointer focus:outline-none"
        aria-label="Toggle Cart Dropdown"
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

      {isIconClicked && (
        <div
          role="button"
          onClick={(e) => e.stopPropagation()}
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
              {/* Scrollable Products List */}
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
              <div className="flex w-full justify-between items-center pt-4 mt-3 border-t border-black/10">
                <Link href="/cart" onClick={() => setIsIconClicked(false)}>
                  <Button variant="primary">View Cart</Button>
                </Link>

                <Button onClick={handleRemoveCart} variant="secondary">
                  Clear Cart
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col gap-1 px-[16px] py-4">
              <Button
                variant="secondary"
                className="absolute top-0 right-0 border-none! px-0! py-0! pr-[16px]!"
                onClick={() => setIsIconClicked(false)}
              >
                <CrossIcon color="#000000" />
              </Button>

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
