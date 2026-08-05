import Container from "../Components/common/Container";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "../lib/Icons";
import { FOOTER_NAVIGATION } from "@/website/FooterNavigation/DummyFooter";

type Props = {};

const index = (props: Props) => {
  return (
    <footer>
      <Container className="laptop:mb-[-85px] desktop-lg:mb-[-90px] mb-[-99px] !py-[0px]">
        <div className={"relative"}>
          <div className="section-sub-footer bg-black laptop:flex-row laptop:items-center laptop:justify-between laptop:text-left laptop:py-[36px] laptop:px-[64px] desktop-lg:mt-[-1px] relative z-[1] flex flex-col rounded-[14px] bg-cover bg-center bg-repeat px-[20px] py-[20px] text-center">
            <div className="subfooter-col laptop:flex-[0_0_528px] desktop:flex-[0_0_628px] desktop-lg:flex-[0_0_728px] laptop:mb-[0] mb-[24px]">
              <p className="font-integral text-white text-[32px] leading-[38px] tablet:text-[40px] tablet:leading-[46px] font-[700]">
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full laptop:max-w-[349px]">
              {/* Input */}
              <div className="relative w-full">
                <MailIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-[#000000]/40" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-[#E5E5E5] bg-white py-3 pl-14 pr-5 text-[16px] font-medium text-black placeholder:text-[#000000]/40 focus:outline-none"
                />
              </div>

              {/* Button */}
              <button className="w-full cursor-pointer rounded-full bg-white py-3 text-[16px] font-medium text-black transition hover:bg-gray-100">
                Subscribe To Newsletter
              </button>
            </div>
          </div>
        </div>
      </Container>

      <Container className="bg-[#F0F0F0] laptop:!pt-[150px] pt-[120px]">
        <div className="flex flex-col gap-12 laptop:flex-row laptop:items-start">
          {/* Left */}
          <div className="w-full laptop:max-w-[250px] desktop:max-w-[260px]">
            <h2 className="text-[32px] font-black leading-none">SHOP.CO</h2>

            <p className="mt-[14px] laptop:mt-[25px] text-[14px] font-satoshi leading-[22px] font-[400] text-[#0000000]/60">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>

            <div className="laptop:mt-[35px] mt-[20px] flex items-center gap-3">
              <Link
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-[32px] w-[32px] hover:text-white text-black items-center border border-[#000000]/60 rounded-full hover:bg-[#000000] transition justify-center"
                aria-label="Twitter"
              >
                <TwitterIcon filled color="#FFFFFF" />
              </Link>

              <Link
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-[32px] w-[32px] hover:text-white text-black items-center border border-[#000000]/60 rounded-full hover:bg-[#000000] transition justify-center"
                aria-label="Facebook"
              >
                <FacebookIcon filled color="#FFFFFF" />
              </Link>

              <Link
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-[32px] w-[32px] hover:text-white text-black items-center border border-[#000000]/60 rounded-full hover:bg-[#000000] transition justify-center"
                aria-label="Instagram"
              >
                <InstagramIcon filled color="#FFFFFF" />
              </Link>

              <Link
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-[32px] w-[32px] hover:text-white text-black items-center border border-[#000000]/60 rounded-full hover:bg-[#000000] transition justify-center"
                aria-label="Github"
              >
                <GithubIcon filled color="#FFFFFF" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid flex-1 grid-cols-2 gap-y-8 tablet:grid-cols-4 laptop:gap-x-10 desktop:gap-x-16">
            {FOOTER_NAVIGATION.map((section) => (
              <div key={section.id}>
                <h4 className="mb-6 text-[14px] font-semibold uppercase tracking-[3px] text-black">
                  {section.title}
                </h4>

                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[15px] text-[#666666] transition hover:text-black"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}

        <div className="mt-[50px] mb-[25px] h-px bg-[#D9D9D9]" />

        {/* Bottom */}

        <div className="flex w-full flex-col items-center justify-between gap-6 tablet:flex-row">
          <p className="text-center w-full text-[14px] text-[#666666] tablet:text-left">
            Shop.co © 2000-2023, All Rights Reserved
          </p>

          <div className="flex flex-wrap w-full items-center justify-end gap-[12px]">
            <Image
              src="/payments/Badge.png"
              alt="Visa"
              width={46}
              height={30}
              className="h-auto max-h-[30px]"
            />

            <Image
              src="/payments/Badge (1).png"
              alt="MasterCard"
              width={46}
              height={30}
            />

            <Image
              src="/payments/Badge (2).png"
              alt="Paypal"
              width={46}
              height={30}
            />

            <Image
              src="/payments/Badge (3).png"
              alt="Apple Pay"
              width={46}
              height={30}
            />

            <Image
              src="/payments/Badge (4).png"
              alt="Google Pay"
              width={46}
              height={30}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default index;
