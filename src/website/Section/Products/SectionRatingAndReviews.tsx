import Button from "@/website/Components/common/Button";
import Paragraph from "@/website/Components/common/Paragraph";
import TitleTag from "@/website/Components/common/TitleTag";
import { FormatDate } from "@/website/helpers/helper";
import SectionRating from "@/website/Section/SectionRating";

export interface Review {
  rating: number;
  comment?: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

type Props = {
  data?: Review[];
};

const SectionRatingAndReviews = ({ data }: Props) => {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <TitleTag
          variant="satoshiBold"
          className="!text-[20px] laptop:text-[24px] !font-[700]"
        >
          All Reviews
        </TitleTag>

        <div>
          <Button variant="primary">Write a Review</Button>
        </div>
      </div>
      <div className="grid tablet:grid-cols-2 grid-cols-1 mt-[24px] gap-[20px]">
        {data?.map((rev: Review, index: number) => (
          <div
            className="flex border py-[25px] px-[32px] border-[#000000]/20 rounded-[10px]"
            key={index}
          >
            <div className="flex flex-col gap-[15px] justify-between">
              <SectionRating rating={rev.rating} />
              <div>
                <TitleTag as="h4" variant="satoshiBold">
                  {rev?.reviewerName}
                </TitleTag>
                <TitleTag as="h4" variant="satoshiBold">
                  {rev?.comment}
                </TitleTag>
                <Paragraph className="mt-[24px]" variant="normalPara">
                  Posted on : {FormatDate(rev.date)}
                </Paragraph>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionRatingAndReviews;
