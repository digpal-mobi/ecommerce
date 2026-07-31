interface ProductCardData {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

export const PRODUCT_DATA: ProductCardData[] = [
  {
    id: 1,
    image: "/products/product_1.png",
    title: "T-SHIRT WITH TAPE DETAILS",
    description: "",
    price: "122",
  },
  {
    id: 2,
    image: "/products/product_2.png",
    title: "SKINNY FIT JEANS",
    description: "",
    price: "122",
  },
  {
    id: 3,
    image: "/products/product_3.png",
    title: "CHECKERED SHIRT",
    description: "",
    price: "122",
  },
  {
    id: 4,
    image: "/products/product_4.png",
    title: "SLEEVE STRIPED T-SHIRT",
    description: "",
    price: "122",
  },
];
