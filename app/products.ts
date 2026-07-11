export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  onSale?: boolean;
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: "1",
    slug: "mango",
    name: "Mango",
    brand: "Orzino",
    category: "Freeze Dried",
    image: "/products/mango.png",
    price: 99,
    originalPrice: 149,
    isNew: true,
    onSale: true,
    description:
      "Experience the perfect blend of quality and taste. Our freeze-dried mango locks in natural sweetness and nutrients with zero added sugar, giving you a crunchy, guilt-free snack anytime.",
    features: ["100% natural, no additives", "No added sugar", "Vegan friendly", "Long shelf life, no refrigeration needed"],
  },
  {
    id: "2",
    slug: "mixed-fruit-cup",
    name: "Mixed Fruit Cup",
    brand: "Orzino",
    category: "Fresh Cut",
    image: "/products/mixed-fruit.png",
    price: 120,
    isNew: true,
    description: "A healthy mix of fresh seasonal fruits, cut daily and packed hygienically for a balanced snack.",
    features: ["Cut fresh every morning", "Seasonal fruit mix", "Hygienically sealed", "No preservatives"],
  },
  {
    id: "3",
    slug: "watermelon-cup",
    name: "Watermelon Cup",
    brand: "Orzino",
    category: "Fresh Cut",
    image: "/products/watermelon.png",
    price: 50,
    onSale: true,
    originalPrice: 65,
    description: "Refreshing and juicy watermelon slices, perfect for a hot day pick-me-up.",
    features: ["High water content", "Naturally sweet", "No added sugar", "Chilled on delivery"],
  },
  {
    id: "4",
    slug: "pineapple-cup",
    name: "Pineapple Cup",
    brand: "Orzino",
    category: "Fresh Cut",
    image: "/products/pineapple.png",
    price: 70,
    description: "Freshly cut pineapple pieces, tangy and sweet with every bite.",
    features: ["Rich in Vitamin C", "Hand-cut daily", "No preservatives", "Recyclable packaging"],
  },
  {
    id: "5",
    slug: "apple-fruit-cup",
    name: "Apple Fruit Cup",
    brand: "Orzino",
    category: "Fresh Cut",
    image: "/products/apple.png",
    price: 100,
    description: "Crisp and fresh apple slices, lightly treated to stay fresh without browning.",
    features: ["Crisp texture", "No browning agents added artificially", "Rich in fiber", "Kid-friendly snack"],
  },
  {
    id: "6",
    slug: "healthy-fruit-bowl",
    name: "Healthy Fruit Bowl",
    brand: "Orzino",
    category: "Premium",
    image: "/products/fruit-bowl.png",
    price: 150,
    originalPrice: 199,
    onSale: true,
    description: "A premium curated fruit bowl for a complete, balanced, healthy lifestyle snack.",
    features: ["Curated seasonal mix", "Premium packaging", "Balanced nutrition", "Ideal for sharing"],
  },
];