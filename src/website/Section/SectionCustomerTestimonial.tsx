"use client";

import React from "react";
import EmblaCarousel from "@/website/Components/EmblaCaraousel/EmblaCaraousel";
import ReviewCard from "@/website/Components/ReviewCard";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import { TESTIMONIALS } from "@/website/Data/TestimonialData";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { loop: true };

const SectionCustomerTestimonial = () => {
  return (
    <MainContainer data-testid="section-customer-testimonial">
      <Container className="w-full">
        <div className="pt-[80px] pb-[40px]">
          <EmblaCarousel options={OPTIONS} title="OUR HAPPY CUSTOMERS">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="embla__slide flex-[0_0_100%] mobile-lg:flex-[0_0_calc((100%-20px)/2)] desktop-lg:flex-[0_0_calc((30%-90px))] desktop:flex-[0_0_calc((100%-40px)/3)] laptop:flex-[0_0_calc((100%-40px)/2.5)] pl-0 mobile-lg:pl-[20px]"
              >
                <ReviewCard
                  name={testimonial.name}
                  review={testimonial.review}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </EmblaCarousel>
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionCustomerTestimonial;
