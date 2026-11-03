import Container, {
  MainContainer,
} from "@/website/Components/Common/Container";
import ProductCard from "@/website/Components/ProductCard";
import TitleTag from "@/website/Components/Common/TitleTag";

type Props = {
  products: Array<any>;
};

const SectionSimilarProducts = ({ products }: Readonly<Props>) => {
  return (
    <MainContainer>
      <Container>
        <section className="w-full laptop:pt-[80px] pt-[50px] !pb-[0px]">
          <div className="flex justify-center items-center w-full">
            <TitleTag as="h2" variant="heading">
              You might also like
            </TitleTag>
          </div>
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide w-full">
            <ProductCard products={products} />
          </div>
        </section>
      </Container>
    </MainContainer>
  );
};

export default SectionSimilarProducts;
