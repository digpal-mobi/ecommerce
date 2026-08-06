import Image from "next/image";
import SectionRating from "@/website/Section/SectionRating";
import Button from "@/website/Components/common/Button";
import { AddToCartIcon } from "@/website/lib/Icons";
import TitleTag from "@/website/Components/common/TitleTag";
import Paragraph from "@/website/Components/common/Paragraph";
import Increment from "@/website/Components/Increment";

type Props = {
  products?: Array<any>;
};

const ProductCard = ({ products }: Props) => {
  return (
    <section className="w-full py-[32px] laptop:py-[55px]">
      <div className="flex gap-[20px] justify-start">
        {products?.map((items) => (
          <div key={items.id} className="flex flex-col shrink-0">
            <button>
              <Image
                src={items.thumbnail}
                width={295}
                height={298}
                alt="product image"
                className="bg-[#F0EEED] rounded-[20px] hover:scale-[1.05] transition-all cursor-pointer"
              />
            </button>
            <div className="mt-[16px] flex flex-col items-start">
              <TitleTag variant="satoshiBold" as="h3">
                {items.title}
              </TitleTag>
              <SectionRating rating={items.rating} />
              <div className="flex items-center justify-between w-full">
                <Paragraph variant="boldPara">${items.price}</Paragraph>
                <Increment />
              </div>
            </div>
            <div className="mt-[16px] flex items-center justify-center w-full">
              <Button variant="primary">
                <AddToCartIcon className="h-[20px] w-[20px]" />
                <TitleTag as="span" variant="satoshiBold">
                  Add to Cart
                </TitleTag>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCard;
