const SortingOption = [
  {
    label: "Price: low to high",
    sortBy: "price",
    sortOrder: "asc",
  },
  {
    label: "Price: high to low",
    sortBy: "price",
    sortOrder: "desc",
  },
] as const;

export default SortingOption;
