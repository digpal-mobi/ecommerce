import Paragraph from "@/website/Components/common/Paragraph";
import TitleTag from "@/website/Components/common/TitleTag";

type Props = {
  data?: any;
};

const SectionProductDetails = ({ data }: Props) => {
  return (
    <section className="w-full">
      {/* Description */}
      <div>
        <TitleTag as="h3" variant="bold" className="!font-satoshi mb-4">
          Product Description
        </TitleTag>

        <Paragraph variant="normalPara">{data?.description}</Paragraph>
      </div>

      {/* Specifications */}
      <div className="mt-10">
        <TitleTag as="h3" variant="bold" className="!font-satoshi mb-[36px]">
          Product Specifications
        </TitleTag>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[16px] gap-x-[20px]  laptop:gap-x-[40px]">
          <Specification title="Brand" value={data?.brand} />

          <Specification title="Category" value={data?.category} />

          <Specification title="SKU" value={data?.sku} />

          <Specification title="Tags" value={data?.tags?.join(", ")} />

          <Specification
            title="Availability"
            value={data?.availabilityStatus}
          />

          <Specification title="Stock" value={`${data?.stock} Units`} />

          <Specification title="Weight" value={`${data?.weight} g`} />

          <Specification
            title="Dimensions"
            value={`${data?.dimensions?.width} × ${data?.dimensions?.height} × ${data?.dimensions?.depth} cm`}
          />

          <Specification
            title="Minimum Order"
            value={`${data?.minimumOrderQuantity} Units`}
          />

          <Specification title="Warranty" value={data?.warrantyInformation} />

          <Specification title="Shipping" value={data?.shippingInformation} />

          <Specification title="Return Policy" value={data?.returnPolicy} />

          <Specification title="Barcode" value={data?.meta?.barcode} />

          <Specification
            title="Created"
            value={new Date(data?.meta?.createdAt).toLocaleDateString()}
          />

          <Specification
            title="Updated"
            value={new Date(data?.meta?.updatedAt).toLocaleDateString()}
          />
        </div>
      </div>
    </section>
  );
};

const Specification = ({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) => (
  <div className="flex border-b border-gray-200 pb-3">
    <div className="w-[150px]">
      <Paragraph variant="normalPara" className="font-medium text-gray-600">
        {title}
      </Paragraph>
    </div>

    <Paragraph variant="normalPara">{value || "-"}</Paragraph>
  </div>
);

export default SectionProductDetails;
