"use client";

import React from "react";
import EmblaCarousel from "@/website/Components/EmblaCaraousel/EmblaCaraousel";
import ReviewCard from "@/website/Components/ReviewCard";
import Container from "@/website/Components/common/Container";
import { TESTIMONIALS } from "@/website/data/TestimonialData";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { loop: true };

const SectionCustomerTestimonial = () => {
  return (
    <Container className="w-full py-10">
      <EmblaCarousel options={OPTIONS} title="OUR HAPPY CUSTOMERS">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="embla__slide flex-[0_0_100%] laptop:flex-[0_0_calc((100%-40px)/3)] pl-[20px]"
          >
            <ReviewCard
              name={testimonial.name}
              review={testimonial.review}
              rating={testimonial.rating}
            />
          </div>
        ))}
      </EmblaCarousel>
    </Container>
  );
};

export default SectionCustomerTestimonial;
