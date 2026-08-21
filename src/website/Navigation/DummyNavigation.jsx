export const NAVIGATION_ITEMS = [
  {
    id: 1,
    title: "Shop",
    href: "/shop",
    children: [
      {
        title: "Men",
        href: "/shop?category=mens-shirts",
      },
      {
        title: "Women",
        href: "/shop?category=womens-dresses",
      },
      {
        title: "Kids",
        href: "/shop",
      },
      {
        title: "Accessories",
        href: "/shop?category=sunglasses,mens-watches,womens-bags",
      },
      {
        title: "Footwear",
        href: "/shop?category=mens-shoes,womens-shoes",
      },
      {
        title: "Sale Items",
        href: "/sale-items",
      },
    ],
  },
  {
    id: 2,
    title: "On Sale",
    href: "/on-sale",
  },
  {
    id: 3,
    title: "New Arrivals",
    href: "/new-arrivals",
  },
  {
    id: 4,
    title: "Brands",
    href: "/brands",
  },
];
