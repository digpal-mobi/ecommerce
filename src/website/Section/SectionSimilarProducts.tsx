import TitleTag from "@/website/components/common/TitleTag";
import ProductCard from "@/website/components/ProductCard";

type Props = {
  products: Array<any>;
};

const SectionSimilarProducts = ({ products }: Props) => {
  return (
    <section className="w-full !pb-[0px]">
      <div className="flex justify-center items-center w-full">
        <TitleTag as="h2" variant="heading">
          You might also like
        </TitleTag>
      </div>
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide w-full">
        <ProductCard products={products} />
      </div>
    </section>
  );
};

export default SectionSimilarProducts;
