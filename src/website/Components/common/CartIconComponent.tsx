import { CartIcon, CrossIcon } from "@/website/lib/Icons";
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
import { CurrencyConverter } from "@/website/helpers/helper";

type Props = {};

const CartIconComponent = (props: Props) => {
  const quantity = useSelector((state: any) => state?.cart?.quantity);
  const products = useSelector((state: any) => state?.cart?.products);
  const [isIconClicked, setIsIconClicked] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const currency = useSelector((state: RootState) => state.currency.currency);
  const handleRemoveCart = () => {
    dispatch(clearCart());
  };

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
        <CartIcon />
        <span className="absolute top-[-8px] right-[-1px] font-[700] w-[18px] h-[18px] flex items-center justify-center text-white rounded-full text-[12px] bg-red-500">
          {quantity}
        </span>
      </button>

      {isIconClicked ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full mt-[10px] w-[400px] rounded-lg bg-white py-[16px] shadow-lg z-50 border border-black/5"
        >
          {products?.length > 0 ? (
            <div className="flex flex-col gap-5 p-[16px]">
              {products?.map((product: any) => (
                <div
                  key={product.id}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src={product.thumbnail}
                      width={100}
                      height={100}
                      alt={`${product.title} image`}
                      className="bg-[#F0EEED] rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer"
                    />
                    <div className="flex flex-col gap-1">
                      <TitleTag as="h3" variant="satoshiBold">
                        {product.title}
                      </TitleTag>
                      <Paragraph variant="normalPara">
                        {product.quantity} x{" "}
                        {CurrencyConverter(product.price, currency)}
                      </Paragraph>
                    </div>
                  </div>
                  <div className="flex items-center">
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
              ))}
              <div className="flex w-full justify-between items-center">
                <Link href="/cart" onClick={() => setIsIconClicked(false)}>
                  <Button variant="primary">View Cart</Button>
                </Link>
                <Button onClick={handleRemoveCart} variant="secondary">
                  Clear Cart
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col gap-1 px-[16px]!">
              <Button
                variant="secondary"
                className="absolute top-0 right-0 border-none! "
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
      ) : null}
    </div>
  );
};

export default CartIconComponent;
