export interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. Their collection is remarkable, offering something for every occasion.",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    review:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection is diverse, stylish, and always on trend.",
  },
  {
    id: 4,
    name: "Emily R.",
    rating: 5,
    review:
      "Excellent customer service and fast delivery. The quality is outstanding, and every order has been exactly as expected. I'll definitely continue shopping here.",
  },
  {
    id: 5,
    name: "Michael T.",
    rating: 4,
    review:
      "The clothing fits perfectly and the materials feel premium. There are plenty of options to choose from, making it easy to find something for every season.",
  },
  {
    id: 6,
    name: "Olivia P.",
    rating: 5,
    review:
      "I love how effortless it is to find stylish outfits on Shop.co. The designs are modern, comfortable, and worth every penny.",
  },
];