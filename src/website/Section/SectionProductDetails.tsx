"use client";

import { useState } from "react";
import Container from "@/website/Components/common/Container";
import TitleTag from "@/website/Components/common/TitleTag";
import ProductDetailsContent from "@/website/Section/Products/SectionProductDetails";
import SectionRatingAndReviews from "@/website/Section/Products/SectionRatingAndReviews";
import SectionFAQs from "@/website/Section/Products/SectionFAQs";

type Tab = "details" | "reviews" | "faqs";

const SectionProductDetails = ({ data }: any) => {
  const [activeTab, setActiveTab] = useState<Tab>("details");

  const tabs = [
    {
      id: "details",
      label: "Product Details",
    },
    {
      id: "reviews",
      label: "Reviews & Ratings",
    },
    {
      id: "faqs",
      label: "FAQs",
    },
  ];

  return (
    <Container>
      <div className="flex items-center justify-center border-b border-black/10">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full pb-[24px] flex items-center justify-center border-b-2 transition-all cursor-pointer ${
                active
                  ? "border-black text-black"
                  : "border-transparent text-black/60 hover:border-black/30 hover:text-black"
              }`}
            >
              <TitleTag
                as="span"
                variant="satoshiBold"
                className="font-satoshi text-[16px] laptop:text-[20px]"
              >
                {tab.label}
              </TitleTag>
            </button>
          );
        })}
      </div>

      <div className="pt-[30px]">
        {activeTab === "details" && <ProductDetailsContent data={data} />}

        {activeTab === "reviews" && (
          <SectionRatingAndReviews data={data.reviews} />
        )}

        {activeTab === "faqs" && <SectionFAQs />}
      </div>
    </Container>
  );
};

export default SectionProductDetails;
