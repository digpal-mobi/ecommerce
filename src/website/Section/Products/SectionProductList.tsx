import Paragraph from "@/website/Components/common/Paragraph";
import Increment from "@/website/Components/Increment";
import SectionRating from "../SectionRating";
import TitleTag from "@/website/Components/common/TitleTag";
import Image from "next/image";
import Pagination from "@/website/Components/common/Pagination";

type Props = {
  data?: any[];
};

const SectionProductList = ({ data }: Props) => {
  return (
    <main className="flex-1">
      <div className="mb-[24px] flex items-center justify-between">
        <h2 className="text-[14px] font-semibold text-[#111111]">Products</h2>
      </div>
      <div className="grid laptop:grid-cols-3 grid-cols-1 gap-x-[16px] gap-y-[30px]">
        {data?.map((items: any) => (
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
          </div>
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </main>
  );
};

export default SectionProductList;
