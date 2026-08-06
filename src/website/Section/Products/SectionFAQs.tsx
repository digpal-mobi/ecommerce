import Paragraph from "@/website/Components/common/Paragraph";
import TitleTag from "@/website/Components/common/TitleTag";
import { ChevronDown } from "@/website/lib/Icons";
import React, { useState } from "react";

type Props = {};

export interface FAQItem {
  id: number;
  category:
    | "Shipping & Delivery"
    | "Returns & Refunds"
    | "Orders & Tracking"
    | "Product & Stock"
    | "Payments & Security";
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: 1,
    category: "Shipping & Delivery",
    question: "How long will it take to receive my order?",
    answer:
      "Standard shipping typically takes 3 to 5 business days. Expedited options (1-2 business days) are available at checkout.",
  },
  {
    id: 2,
    category: "Returns & Refunds",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day risk-free return policy. Items must be unworn, unused, and in original packaging with tags attached.",
  },
  {
    id: 3,
    category: "Orders & Tracking",
    question: "How can I track my shipment?",
    answer:
      "Once your order ships, you will receive an email containing a tracking link and shipment details.",
  },
  {
    id: 4,
    category: "Product & Stock",
    question: "What if an item is out of stock?",
    answer:
      "You can sign up on the product page to receive an email notification as soon as the item is restocked.",
  },
  {
    id: 5,
    category: "Payments & Security",
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
  },
];

const SectionFAQs = (props: Props) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };
  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        {faqs?.map((faq, index) => {
          const isItemOpen = isOpen === index;
          const panelId = `panel-${faq.id}`;

          return (
            <div
              className="flex flex-col w-full py-[20px] border-b border-black/10"
              key={index}
            >
              <button
                onClick={() => handleToggle(index)}
                className="flex items-center justify-between gap-[20px] w-full cursor-pointer"
              >
                <Paragraph
                  variant="boldPara"
                  className="text-black !text-[14px] !laptop:text-[16px] text-left"
                >
                  {faq?.question}
                </Paragraph>
                <TitleTag as="span">
                  {isItemOpen ? (
                    <ChevronDown className="rotate-180 transition-transform !font-[700] h-[10px] w-[10px]" />
                  ) : (
                    <ChevronDown className="transition-transform !font-[700] h-[10px] w-[10px]" />
                  )}
                </TitleTag>
              </button>
              <div
                id={panelId}
                className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isItemOpen ? "1fr" : "0fr",
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <Paragraph className=" pt-[20px] text-black/60 !text-[14px] !font-[400] !laptop:text-[16px]">
                    {faq.answer}
                  </Paragraph>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SectionFAQs;
