"use client";

import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={`embla__button embla__button--prev inline-flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
        disabled ? "embla__button--disabled" : ""
      }`}
      type="button"
      aria-label="Previous slide"
      {...restProps}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.70406 4.4541L2.95406 11.2041C2.84918 11.3086 2.76597 11.4328 2.70919 11.5696C2.6524 11.7063 2.62317 11.8529 2.62317 12.001C2.62317 12.149 2.6524 12.2957 2.70919 12.4324C2.76597 12.5691 2.84918 12.6933 2.95406 12.7979L9.70406 19.5479C9.91541 19.7592 10.2021 19.8779 10.5009 19.8779C10.7998 19.8779 11.0865 19.7592 11.2978 19.5479C11.5092 19.3365 11.6279 19.0499 11.6279 18.751C11.6279 18.4521 11.5092 18.1654 11.2978 17.9541L6.46875 13.125L20.25 13.125C20.5484 13.125 20.8345 13.0065 21.0455 12.7955C21.2565 12.5846 21.375 12.2984 21.375 12C21.375 11.7017 21.2565 11.4155 21.0455 11.2045C20.8345 10.9936 20.5484 10.875 20.25 10.875L6.46875 10.875L11.2988 6.04598C11.5101 5.83463 11.6288 5.54799 11.6288 5.2491C11.6288 4.95022 11.5101 4.66357 11.2988 4.45223C11.0874 4.24088 10.8008 4.12215 10.5019 4.12215C10.203 4.12215 9.91634 4.24088 9.705 4.45223L9.70406 4.4541Z"
          fill="black"
        />
      </svg>

      {children}
    </button>
  );
};

export const NextButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={`embla__button embla__button--next inline-flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
        disabled ? "embla__button--disabled" : ""
      }`}
      type="button"
      aria-label="Next slide"
      {...restProps}
    >
      <svg
        width="19"
        height="16"
        viewBox="0 0 19 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6709 0.332033L18.4209 7.08203C18.5258 7.18655 18.609 7.31074 18.6658 7.44749C18.7226 7.58423 18.7518 7.73084 18.7518 7.87891C18.7518 8.02697 18.7226 8.17358 18.6658 8.31033C18.609 8.44708 18.5258 8.57127 18.4209 8.67578L11.6709 15.4258C11.4596 15.6371 11.1729 15.7559 10.8741 15.7559C10.5752 15.7559 10.2885 15.6371 10.0772 15.4258C9.86584 15.2144 9.74711 14.9278 9.74711 14.6289C9.74711 14.33 9.86584 14.0434 10.0772 13.832L14.9063 9.00297L1.125 9.00297C0.826632 9.00297 0.540483 8.88444 0.329505 8.67347C0.118527 8.46249 9.03849e-08 8.17634 9.39429e-08 7.87797C9.75009e-08 7.5796 0.118527 7.29345 0.329505 7.08248C0.540483 6.8715 0.826632 6.75297 1.125 6.75297L14.9063 6.75297L10.0763 1.92391C9.86491 1.71256 9.74617 1.42592 9.74617 1.12703C9.74617 0.828148 9.86491 0.541504 10.0763 0.330159C10.2876 0.118815 10.5742 8.02347e-05 10.8731 8.02383e-05C11.172 8.02419e-05 11.4587 0.118815 11.67 0.330159L11.6709 0.332033Z"
          fill="black"
        />
      </svg>

      {children}
    </button>
  );
};
