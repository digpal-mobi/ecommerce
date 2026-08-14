import { CartIcon } from "@/website/lib/Icons";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import LazyImage from "./LazyImage";
import { useDispatch } from "@/redux/store";
import { clearCart, updateCart } from "@/redux/slices/cartSlice";
import TitleTag from "./TitleTag";
import Paragraph from "./Paragraph";
import Increment from "../Increment";

type Props = {};

const CartIconComponent = (props: Props) => {
  const quantity = useSelector((state: any) => state?.cart?.quantity);
  const products = useSelector((state: any) => state?.cart?.products);
  const [isIconClicked, setIsIconClicked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleRemoveCart = () => {
    dispatch(clearCart());
    // setIsIconClicked(false);
  };

  return (
    <div
      role="button"
      onClick={() => setIsIconClicked((prev) => !prev)}
      className="relative flex items-center justify-center"
    >
      <CartIcon />
      <span className="absolute top-[-8px] right-[-1px] font-[700] w-[18px] h-[18px] flex items-center justify-center text-white rounded-full text-[12px] bg-red-500">
        {quantity}
      </span>

      {isIconClicked ? (
        <div className="absolute right-0 top-full mt-[10px] w-[400px] rounded-lg bg-white py-[16px] shadow-lg z-50">
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
                        {product.quantity} x ${product.price}
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
                <Button variant="primary">Checkout</Button>
                <Button onClick={handleRemoveCart} variant="secondary">
                  Clear Cart
                </Button>
              </div>
            </div>
          ) : (
            <>
              <TitleTag
                as="span"
                variant="satoshiBold"
                className="flex items-center justify-center w-full"
              >
                No items Available in cart
              </TitleTag>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CartIconComponent;
<div>No items Available in cart</div>;
