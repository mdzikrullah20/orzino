"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Sparkles,
  Filter,
  Clock,
  MessageSquare,
  Plus,
  Minus,
  X,
  Check,
  PackagePlus,
  Flame,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number; // Discounted/Current selling price
  originalPrice: number; // MRP / Original Price
  rating: number;
  weight: string;
  badge?: string;
  isSale?: boolean;
  offerEndsAt?: string; // ISO string for countdown
  reviews: Review[];
};

// Tiered quantity discounts
const QUANTITY_DISCOUNT_TIERS = [
  { minQty: 5, discountPercent: 15, label: "15% OFF (Buy 5+)" },
  { minQty: 3, discountPercent: 10, label: "10% OFF (Buy 3-4)" },
  { minQty: 2, discountPercent: 5, label: "5% OFF (Buy 2)" },
  { minQty: 1, discountPercent: 0, label: "No discount" },
];

const getQuantityDiscountPercent = (qty: number): number => {
  const tier = QUANTITY_DISCOUNT_TIERS.find((t) => qty >= t.minQty);
  return tier ? tier.discountPercent : 0;
};

// Initial Mock Products
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Freeze-Dried Jamun Cubes",
    category: "Fruit Cubes",
    image:
      "https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540",
    price: 99,
    originalPrice: 149,
    rating: 4.9,
    weight: "35g",
    badge: "Best Seller",
    isSale: true,
    offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    reviews: [
      {
        id: "r1",
        author: "Aarav S.",
        rating: 5,
        comment: "Insanely crunchy and retains the natural tartness of Jamun!",
        date: "2 days ago",
      },
      {
        id: "r2",
        author: "Pooja M.",
        rating: 4,
        comment: "Great healthy snack for diabetic parents.",
        date: "1 week ago",
      },
    ],
  },
  {
    id: 2,
    name: "Crispy Alphonso Mango Slices",
    category: "Crispy Slices",
    image: "https://orzino.com/wp-content/uploads/2026/05/MANGO-SNACKS.jpeg",
    price: 99,
    originalPrice: 139,
    rating: 4.8,
    weight: "40g",
    badge: "Popular",
    isSale: true,
    offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    reviews: [
      {
        id: "r3",
        author: "Rohan V.",
        rating: 5,
        comment: "Pure mango sweetness without added sugar.",
        date: "3 days ago",
      },
    ],
  },
  {
    id: 3,
    name: "Berry Mix Crunch Jar",
    category: "Jars",
    image:
      "https://themoonstore.in/cdn/shop/files/73.png?v=1783330409&width=540",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    weight: "50g",
    badge: "Trending",
    isSale: true,
    offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    reviews: [
      {
        id: "r4",
        author: "Sneha K.",
        rating: 5,
        comment: "Goes amazing with my morning Greek yogurt and oatmeal bowl.",
        date: "Yesterday",
      },
    ],
  },
  {
    id: 4,
    name: "Strawberry Crunch Pouch",
    category: "Pouches",
    image:
      "https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540",
    price: 79,
    originalPrice: 119,
    rating: 4.7,
    weight: "30g",
    isSale: true,
    reviews: [],
  },
  {
    id: 5,
    name: "Freeze-Dried Blueberry Bites",
    category: "Fruit Cubes",
    image:
      "https://themoonstore.in/cdn/shop/files/70_d0bd2cdb-5e24-4f7e-82d8-7bd548014028.png?v=1783330409&width=800",
    price: 119,
    originalPrice: 159,
    rating: 4.8,
    weight: "35g",
    badge: "New",
    isSale: false,
    reviews: [],
  },
  {
    id: 6,
    name: "Crispy Pineapple Rings",
    category: "Crispy Slices",
    image:
      "https://themoonstore.in/cdn/shop/files/58.png?v=1782990977&width=800",
    price: 89,
    originalPrice: 129,
    rating: 4.6,
    weight: "45g",
    isSale: true,
    reviews: [],
  },
  {
    id: 7,
    name: "Pink Guava Crunch Pouch",
    category: "Pouches",
    image:
      "https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540",
    price: 89,
    originalPrice: 120,
    rating: 4.7,
    weight: "40g",
    isSale: false,
    reviews: [],
  },
  {
    id: 8,
    name: "Freeze-Dried Kiwi Slices",
    category: "Crispy Slices",
    image:
      "https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540",
    price: 109,
    originalPrice: 149,
    rating: 4.8,
    weight: "30g",
    isSale: true,
    reviews: [],
  },
];

const categories = [
  "All",
  "Fruit Cubes",
  "Crispy Slices",
  "Jars",
  "Pouches",
  "Combos",
];

// Countdown Component
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds, expired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.expired) return null;

  return (
    <div className="flex items-center gap-1.5 bg-[#181410] text-[#FFC300] px-2.5 py-1 rounded-full text-[11px] font-mono font-bold shadow-sm">
      <Clock size={12} className="animate-spin text-[#E8115B]" />
      <span>
        Ends in:{" "}
        {String(timeLeft.hours).padStart(2, "0")}h:
        {String(timeLeft.minutes).padStart(2, "0")}m:
        {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
    </div>
  );
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Combo Builder State: { [productId]: quantityInCombo }
  const [comboCart, setComboCart] = useState<Record<number, number>>({});
  const [isComboDrawerOpen, setIsComboDrawerOpen] = useState(false);

  // Review Modal State
  const [activeReviewProduct, setActiveReviewProduct] = useState<Product | null>(
    null
  );
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const toggleComboProduct = (product: Product) => {
    setComboCart((prev) => {
      const current = prev[product.id] || 0;
      if (current > 0) {
        const { [product.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [product.id]: 1 };
    });
  };

  const updateComboQuantity = (productId: number, delta: number) => {
    setComboCart((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewProduct || !newReviewAuthor || !newReviewComment) return;

    const newReview: Review = {
      id: Date.now().toString(),
      author: newReviewAuthor,
      comment: newReviewComment,
      rating: newReviewRating,
      date: "Just now",
    };

    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === activeReviewProduct.id) {
          const updatedReviews = [newReview, ...p.reviews];
          const newAvgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvgRating,
          };
        }
        return p;
      })
    );

    setActiveReviewProduct((prev) =>
      prev
        ? {
            ...prev,
            reviews: [newReview, ...prev.reviews],
          }
        : null
    );

    setNewReviewAuthor("");
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  // Dynamic Combo Totals
  const comboSummary = useMemo(() => {
    let totalItems = 0;
    let originalTotal = 0;
    let discountedTotal = 0;

    Object.entries(comboCart).forEach(([pId, qty]) => {
      const prod = productsList.find((p) => p.id === Number(pId));
      if (prod) {
        totalItems += qty;
        originalTotal += prod.originalPrice * qty;
        discountedTotal += prod.price * qty;
      }
    });

    // Additional 10% combo incentive discount if 3 or more items are selected
    const comboBonusPercent = totalItems >= 3 ? 10 : 0;
    const finalPrice = Math.round(
      discountedTotal * (1 - comboBonusPercent / 100)
    );
    const totalSavings = originalTotal - finalPrice;

    return {
      totalItems,
      originalTotal,
      finalPrice,
      totalSavings,
      comboBonusPercent,
    };
  }, [comboCart, productsList]);

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search, productsList]);

  return (
    <div className="min-h-screen bg-[#E5E9EE] text-[#181410]">
      {/* Main Categories & Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Category Filters Bar */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-[#181410] shrink-0 mr-2">
            <Filter size={16} className="text-[#E8115B]" />
            Filter By:
          </div>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#181410] text-[#FFC300] shadow-lg scale-105"
                  : "bg-white border-2 border-gray-200 text-[#181410] hover:bg-[#FFC300]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid with Larger Display Size */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const discountPercent = Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              );
              const qtyDiscountPct = getQuantityDiscountPercent(qty);
              const unitPriceAfterQtyDiscount =
                product.price * (1 - qtyDiscountPct / 100);
              const totalPrice = Math.round(unitPriceAfterQtyDiscount * qty);
              const isInCombo = (comboCart[product.id] || 0) > 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-[28px] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 flex flex-col justify-between"
                >
                  {/* Clickable Product Header & Enlarged Image */}
                  <Link
                    href={`/products/${product.id}`}
                    className="block relative bg-[#F8F9FA] p-6 flex items-center justify-center overflow-hidden border-b border-gray-100 min-h-[260px] cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={280}
                      height={280}
                      unoptimized
                      className="object-contain h-[210px] w-auto group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* SALE Label (Left Side) */}
                    {product.isSale && (
                      <div className="absolute top-3.5 left-3.5 flex flex-col gap-1 z-10">
                        <span className="bg-[#E8115B] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Flame size={12} className="fill-white" /> SALE
                        </span>
                        {product.badge && (
                          <span className="bg-[#181410] text-[#FFC300] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Wishlist Button (Stop propagation to allow clicking without triggering Link) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3.5 right-3.5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer z-10"
                    >
                      <Heart
                        size={20}
                        className={
                          wishlist.includes(product.id)
                            ? "fill-[#E8115B] text-[#E8115B]"
                            : "text-gray-400 hover:text-red-400"
                        }
                      />
                    </button>

                    {/* Countdown Timer overlay if applicable */}
                    {product.offerEndsAt && (
                      <div className="absolute bottom-3 left-3.5 z-10">
                        <CountdownTimer targetDate={product.offerEndsAt} />
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        <span className="text-[#E8115B] font-extrabold">
                          {product.category}
                        </span>
                        <span>{product.weight}</span>
                      </div>

                      {/* Clickable Title */}
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg font-black text-[#181410] line-clamp-1 group-hover:text-[#E8115B] transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Reviews & Ratings Bar */}
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <Star
                            size={16}
                            fill="#FFC300"
                            className="text-[#FFC300]"
                          />
                          <span className="font-black text-xs text-[#181410]">
                            {product.rating}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveReviewProduct(product)}
                          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#E8115B] transition-colors cursor-pointer"
                        >
                          <MessageSquare size={13} />
                          <span>
                            {product.reviews.length}{" "}
                            {product.reviews.length === 1
                              ? "Review"
                              : "Reviews"}
                          </span>
                        </button>
                      </div>

                      {/* Price Section */}
                      <div className="mt-3 bg-[#F8F9FA] p-3 rounded-2xl border border-gray-100">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-2xl font-black text-[#181410] font-mono">
                            ₹{totalPrice}
                          </span>
                          <span className="text-sm font-bold text-gray-400 line-through font-mono">
                            ₹{product.originalPrice * qty}
                          </span>
                          <span className="text-xs font-extrabold text-[#E8115B] bg-pink-50 px-2 py-0.5 rounded-md">
                            {discountPercent}% OFF
                          </span>
                        </div>

                        {/* Quantity Discount Tiers Indicator */}
                        <div className="mt-2 text-[11px] font-bold text-gray-600">
                          {qtyDiscountPct > 0 ? (
                            <span className="text-green-600 font-extrabold flex items-center gap-1">
                              <Sparkles size={12} /> Tier Applied:{" "}
                              {qtyDiscountPct}% Extra Discount!
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Buy 2 for 5% OFF, Buy 5 for 15% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Controls (Quantity & Actions) */}
                    <div className="flex flex-col gap-2.5">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between bg-gray-100 rounded-full px-3 py-1.5">
                        <span className="text-[11px] font-black uppercase text-gray-500 ml-2">
                          Quantity
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-7 h-7 bg-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm hover:bg-gray-200 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-mono font-black text-sm w-4 text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-7 h-7 bg-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm hover:bg-gray-200 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Add To Cart Button */}
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `Added ${qty}x ${product.name} to cart for ₹${totalPrice}!`
                          )
                        }
                        className="w-full py-3 rounded-full bg-[#FFC300] hover:bg-yellow-400 text-[#181410] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-98"
                      >
                        <ShoppingCart size={16} />
                        <span>Add To Cart</span>
                      </button>

                      {/* Add to Combo Button */}
                      <button
                        type="button"
                        onClick={() => toggleComboProduct(product)}
                        className={`w-full py-2 rounded-full font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          isInCombo
                            ? "bg-green-100 border-green-400 text-green-800"
                            : "bg-white border-gray-300 text-gray-700 hover:border-gray-900"
                        }`}
                      >
                        {isInCombo ? (
                          <>
                            <Check size={14} /> In Combo Cart
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add To Custom Combo
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[28px] shadow-sm border border-gray-200">
            <h3 className="text-2xl font-black text-[#181410] uppercase">
              No snacks found!
            </h3>
            <p className="text-gray-500 mt-2 text-sm font-medium">
              Try searching for another fruit or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearch("");
              }}
              className="mt-5 px-6 py-2.5 bg-[#FFC300] text-[#181410] font-extrabold text-xs uppercase rounded-full shadow-md hover:bg-yellow-400 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Build Your Own Combo Drawer / Modal */}
      <AnimatePresence>
        {isComboDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsComboDrawerOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase text-[#181410]">
                    Custom Combo Box
                  </h2>
                  <p className="text-xs font-semibold text-gray-500">
                    Add 3+ items for an extra 10% combo discount!
                  </p>
                </div>
                <button
                  onClick={() => setIsComboDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Combo Items List */}
              <div className="p-6 overflow-y-auto flex-grow space-y-4">
                {Object.keys(comboCart).length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <PackagePlus size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-sm">Your combo box is empty.</p>
                    <p className="text-xs mt-1">
                      Add snacks from the catalog to build your custom bundle!
                    </p>
                  </div>
                ) : (
                  Object.entries(comboCart).map(([idStr, qty]) => {
                    const item = productsList.find((p) => p.id === Number(idStr));
                    if (!item) return null;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F9FA] border border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="rounded-lg object-contain bg-white p-1"
                            unoptimized
                          />
                          <div>
                            <h4 className="font-bold text-xs text-[#181410] line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs font-mono font-bold text-[#E8115B]">
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateComboQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-sm hover:bg-gray-200"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-xs font-bold w-4 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateComboQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-sm hover:bg-gray-200"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Combo Summary Footer */}
              <div className="p-6 bg-[#F8F9FA] border-t border-gray-200">
                <div className="space-y-2 mb-4 text-xs font-bold">
                  <div className="flex justify-between text-gray-500">
                    <span>Original Price:</span>
                    <span className="line-through font-mono">
                      ₹{comboSummary.originalTotal}
                    </span>
                  </div>
                  {comboSummary.comboBonusPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Combo Multi-Pack Bonus:</span>
                      <span>-10%</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-[#181410] pt-2 border-t border-gray-200">
                    <span>Final Combo Price:</span>
                    <span className="font-mono text-[#E8115B]">
                      ₹{comboSummary.finalPrice}
                    </span>
                  </div>
                  <p className="text-[11px] text-green-700 font-bold">
                    You save ₹{comboSummary.totalSavings} on this combo!
                  </p>
                </div>

                <button
                  disabled={comboSummary.totalItems === 0}
                  onClick={() => {
                    alert(
                      `Added Custom Combo (${comboSummary.totalItems} items) for ₹${comboSummary.finalPrice}!`
                    );
                    setIsComboDrawerOpen(false);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#FFC300] hover:bg-yellow-400 disabled:opacity-50 text-[#181410] font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-98 cursor-pointer"
                >
                  Add Combo to Cart (₹{comboSummary.finalPrice})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {activeReviewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveReviewProduct(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl z-10 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-black uppercase text-[#181410]">
                    Reviews
                  </h3>
                  <p className="text-xs font-bold text-gray-500">
                    {activeReviewProduct.name}
                  </p>
                </div>
                <button
                  onClick={() => setActiveReviewProduct(null)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Existing Reviews List */}
              <div className="overflow-y-auto my-4 pr-1 space-y-3 max-h-56">
                {activeReviewProduct.reviews.length === 0 ? (
                  <p className="text-center py-6 text-sm text-gray-400 font-bold">
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  activeReviewProduct.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-[#181410]">
                          {rev.author}
                        </span>
                        <div className="flex items-center gap-1 text-[#FFC300]">
                          <Star size={12} fill="#FFC300" />
                          <span className="font-bold text-[#181410]">
                            {rev.rating}.0
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600">{rev.comment}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        {rev.date}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Submit Review Form */}
              <form
                onSubmit={handleAddReview}
                className="mt-auto pt-4 border-t border-gray-100 space-y-3"
              >
                <h4 className="text-xs font-black uppercase tracking-wider text-[#181410]">
                  Write a Review
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        size={18}
                        className={
                          star <= newReviewRating
                            ? "fill-[#FFC300] text-[#FFC300]"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 font-bold focus:outline-none focus:border-[#E8115B]"
                />

                <textarea
                  placeholder="What did you think of the crunch and flavor?"
                  required
                  rows={2}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 font-medium focus:outline-none focus:border-[#E8115B]"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#181410] text-[#FFC300] hover:bg-black font-extrabold text-xs uppercase tracking-wider transition-transform active:scale-98 cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}