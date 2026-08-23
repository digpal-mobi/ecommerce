import Link from "next/link";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import TitleTag from "@/website/Components/Common/TitleTag";
import Paragraph from "@/website/Components/Common/Paragraph";
import Button from "@/website/Components/Common/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found || Ecommerce",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-[60px]">
      <MainContainer>
        <Container>
          <div className="flex flex-col items-center justify-center text-center max-w-[600px] mx-auto">
            <TitleTag
              as="h1"
              variant="mainHeading"
              className="!text-[80px] !font-satoshi tablet:!text-[120px] !leading-none font-bold text-black"
            >
              404
            </TitleTag>

            <TitleTag
              as="h2"
              variant="heading"
              className="mt-4 !text-[24px] tablet:!text-[36px] uppercase"
            >
              Page Not Found
            </TitleTag>

            <Paragraph
              variant="normalPara"
              className="mt-3 text-[16px] text-black/60 max-w-[450px]"
            >
              Sorry, the page you are looking for doesn&apos;t exist, has been
              removed, or is temporarily unavailable.
            </Paragraph>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/">
                <Button variant="primary" className="!px-8 !py-3 rounded-full">
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  variant="secondary"
                  className="!px-8 !py-3 rounded-full"
                >
                  Browse Shop
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </MainContainer>
    </main>
  );
}
