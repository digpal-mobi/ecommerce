import Image from "next/image";
import SectionRating from "@/website/Section/SectionRating";
import { PRODUCT_DATA } from "@/website/data/ProductData";

type Props = {};

const ProductCard = (props: Props) => {
  return (
    <section className="w-full py-[32px] laptop:py-[55px]">
      <div className="flex gap-[20px] justify-start laptop:justify-center">
        {PRODUCT_DATA.map((items) => (
          <div key={items.id} className="flex flex-col shrink-0">
            <button>
              <Image
                src={items.image}
                width={295}
                height={298}
                alt="product image"
              />
            </button>
            <div className="mt-[16px] flex flex-col items-start">
              <h2 className="text-[16px] font-satoshi laptop:text-[20px] font-[500] leading-[1em]">
                {items.title}
              </h2>
              <SectionRating />
              <p className="text-[20px] mt-[8px] font-satoshi laptop:text-[24px] font-[700] leading-[1em] text-black">
                ₹{items.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCard;
