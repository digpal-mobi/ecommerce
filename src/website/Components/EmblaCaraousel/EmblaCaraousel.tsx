"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCaraouselArrowButton";
import Container from "../Container";

type PropType = {
  slides?: number[];
  options?: EmblaOptionsType;
  children: React.ReactNode;
  title?: string;
  showButtons?: boolean;
};

const EmblaCarousel = (props: PropType) => {
  const { options, children, title, showButtons = true } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      {(title || showButtons) && (
        <div className="flex pb-[40px]">
          {title ? (
            <h2 className="font-integral w-full text-center laptop:text-[48px] text-[32px] leading-[1em] font-[700] uppercase">
              {title}
            </h2>
          ) : (
            <div />
          )}
          {showButtons && (
            <div className="flex items-center justify-end gap-3">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          )}
        </div>
      )}
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">{children}</div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
