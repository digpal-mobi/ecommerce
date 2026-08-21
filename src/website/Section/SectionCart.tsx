"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Breadcrumb from "@/website/Components/Common/Breadcrumb";
import TitleTag from "@/website/Components/Common/TitleTag";
import Paragraph from "@/website/Components/Common/Paragraph";
import Button from "@/website/Components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "@/redux/store";
import {
  clearCart,
  removeFromCart,
  updateCart,
  CartProduct,
} from "@/redux/slices/cartSlice";
import {
  ArrowRightIcon,
  CartIcon,
  PromoTagIcon,
  TrashIcon,
} from "@/website/lib/Icons";
import { CurrencyConverter } from "@/website/helpers/helper";
import Increment from "@/website/Components/Increment";
import Input from "../Components/Common/Input";

const BreadCrumbItems = [
  { name: "Home", url: "/" },
  { name: "Cart", url: "/cart" },
];

const SectionCart = () => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const cartProducts = useSelector((state) => state.cart?.products) || [];
  const currency = useSelector((state) => state.currency.currency);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const products: CartProduct[] = isMounted ? cartProducts : [];

  // Calculations
  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Discount applies only when promo code is applied
  const discountRate = appliedPromo
    ? appliedPromo === "DISCOUNT25"
      ? 0.25
      : 0
    : 0;
  const discountAmount = appliedPromo ? subtotal * discountRate : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount);

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCart({ id, quantity }));
  };

  const handleRemoveProduct = (id: number, title: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearAll = () => {
    dispatch(clearCart());
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();

    const code = promoCode.trim().toUpperCase();

    if (!code) return;

    if (code === "DISCOUNT25") {
      setAppliedPromo(code);
    } else {
      setAppliedPromo(null);
    }
  };

  return (
    <MainContainer>
      <Container className="!py-0">
        <div className="py-[24px]">
          <Breadcrumb items={BreadCrumbItems} />
        </div>

        <div className="pb-[80px]">
          <div className="pb-[20px]">
            <TitleTag
              as="h1"
              variant="heading"
              className="!text-[28px] sm:!text-[36px] laptop:!text-[40px]"
            >
              Your Cart
            </TitleTag>
          </div>

          {products.length > 0 ? (
            <div className="flex flex-col laptop:flex-row gap-[24px] items-start mt-[16px]">
              {/* Left Side*/}
              <div className="w-full laptop:w-[60%] flex flex-col rounded-[20px] border border-[#000000]/10 p-[16px] sm:p-[24px] bg-white">
                <div className="flex items-center justify-between pb-[16px] border-b border-[#000000]/10">
                  <Paragraph variant="boldPara" className="text-[#000000]/60">
                    {products.length}{" "}
                    {products.length === 1 ? "Product" : "Products"} in Cart
                  </Paragraph>

                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="flex items-center gap-1 text-[13px] font-medium text-red-600 hover:text-red-700 cursor-pointer transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-[#000000]/10">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] py-[20px]"
                    >
                      <div className="flex items-center gap-[16px] w-full sm:w-auto">
                        <Link
                          href={`/shop/${item.id}`}
                          className="relative h-[90px] w-[90px] sm:h-[110px] sm:w-[110px] shrink-0 overflow-hidden rounded-[16px] bg-[#F0EEED]"
                        >
                          <Image
                            src={item.thumbnail}
                            alt={item.title || "Product image"}
                            fill
                            sizes="(max-width: 640px) 90px, 110px"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </Link>

                        <div className="flex flex-col gap-1 flex-1">
                          <Link href={`/shop/${item.id}`}>
                            <TitleTag
                              as="h3"
                              variant="satoshiBold"
                              className="line-clamp-2 !text-[16px] sm:!text-[18px] hover:underline"
                            >
                              {item.title}
                            </TitleTag>
                          </Link>

                          <Paragraph
                            variant="boldPara"
                            className="!text-[16px] sm:!text-[18px] text-black"
                          >
                            {CurrencyConverter(item.price, currency)}
                          </Paragraph>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-[16px]">
                        <Increment
                          value={item.quantity}
                          onChange={(qty) => handleQuantityChange(item.id, qty)}
                          className="!h-[38px] !min-w-[95px] !px-[12px] !py-[8px] !gap-[10px]"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveProduct(item.id, item.title)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <TrashIcon className="h-[18px] w-[18px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <div className="w-full laptop:w-[40%] flex flex-col rounded-[20px] border border-[#000000]/10 p-[20px] sm:p-[24px] bg-white sticky top-[100px]">
                <TitleTag
                  as="h2"
                  variant="satoshiBold"
                  className="!text-[20px] sm:!text-[24px]"
                >
                  Order Summary
                </TitleTag>

                <div className="mt-[20px] flex flex-col gap-[16px]">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-[16px]">
                    <Paragraph
                      variant="normalPara"
                      className="text-[#000000]/60"
                    >
                      Subtotal
                    </Paragraph>
                    <Paragraph variant="boldPara">
                      {CurrencyConverter(subtotal, currency)}
                    </Paragraph>
                  </div>

                  {/* Discount (Only shown when PromoCode is applied) */}
                  {appliedPromo && discountAmount > 0 && (
                    <div className="flex items-center justify-between text-[16px]">
                      <Paragraph
                        variant="normalPara"
                        className="text-[#000000]/60"
                      >
                        Discount (-{Math.round(discountRate * 100)}%)
                      </Paragraph>
                      <Paragraph variant="boldPara" className="text-red-500">
                        -{CurrencyConverter(discountAmount, currency)}
                      </Paragraph>
                    </div>
                  )}

                  <div className="h-[1px] w-full bg-[#000000]/10 my-[4px]" />

                  {/* Total */}
                  <div className="flex items-center justify-between text-[18px] sm:text-[20px]">
                    <TitleTag as="span" variant="satoshiBold">
                      Total
                    </TitleTag>
                    <TitleTag
                      as="span"
                      variant="satoshiBold"
                      className="!text-[22px]"
                    >
                      {CurrencyConverter(totalAmount, currency)}
                    </TitleTag>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form
                  onSubmit={handleApplyPromo}
                  className="mt-[24px] flex gap-[12px]"
                >
                  <div className="relative flex-1 flex items-center rounded-full bg-[#F0F0F0] px-[16px]">
                    <PromoTagIcon className="h-[20px] w-[20px] text-[#000000]/40 shrink-0 mr-2" />
                    <Input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Add promo code"
                      className="w-full bg-transparent uppercase font-satoshi text-[14px] text-black outline-none placeholder:text-[#000000]/40"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="!px-[24px] !py-[12px] text-[14px] rounded-full shrink-0"
                  >
                    Apply
                  </Button>
                </form>

                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-[13px] text-green-600 font-medium">
                    <Paragraph variant="normalPara">
                      Promo code &ldquo;{appliedPromo}&rdquo; applied!
                    </Paragraph>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedPromo(null);
                        setPromoCode("");
                      }}
                      className="text-red-500 hover:underline cursor-pointer ml-2 text-[12px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Checkout CTA */}
                <div className="mt-[24px]">
                  <Button
                    variant="primary"
                    className="w-full gap-[12px] !py-[14px] rounded-full text-[16px]"
                  >
                    <span>Go to Checkout</span>
                    <ArrowRightIcon className="h-[18px] w-[18px]" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart State */
            <div className="flex flex-col items-center justify-center py-[80px] text-center">
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#F0F0F0] mb-6">
                <CartIcon className="h-[50px] w-[50px] text-[#000000]/40" />
              </div>
              <TitleTag
                as="h2"
                variant="heading"
                className="!text-[24px] sm:!text-[30px]"
              >
                Your Cart is Empty
              </TitleTag>
              <Paragraph
                variant="normalPara"
                className="mt-3 max-w-[440px] text-[#000000]/60 text-[15px]"
              >
                Looks like you haven&apos;t added any items to your cart yet.
                Explore our collection to find items you love!
              </Paragraph>
              <div className="mt-8">
                <Link href="/shop">
                  <Button
                    variant="primary"
                    className="!px-[32px] !py-[14px] rounded-full"
                  >
                    Explore Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionCart;
