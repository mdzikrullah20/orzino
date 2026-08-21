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
    name: "Pineapple Slices",
    category: "Fruit Cubes",
    image: "./images/pineappleB.jpeg",
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
    name: "MANGO SLICES",
    category: "Crispy Slices",
    image: "./images/mango.jpeg",
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
    name: "Banana Chips",
    category: "Jars",
    image: "./images/banana.jpeg",
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
    name: "Pineapple Slices",
    category: "Pouches",
    image: "./images/pineapple.jpeg",
    price: 79,
    originalPrice: 119,
    rating: 4.7,
    weight: "30g",
    isSale: true,
    reviews: [],
  },
  {
    id: 5,
    name: "Apple Chips",
    category: "Fruit Cubes",
    image: "./images/apple.jpeg",
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
    name: "Guava Snacks",
    category: "Crispy Slices",
    image: "./images/guava.jpeg",
    price: 89,
    originalPrice: 129,
    rating: 4.6,
    weight: "45g",
    isSale: true,
    reviews: [],
  },
  {
    id: 7,
    name: "Strawberry Guac",
    category: "Pouches",
    image: "./images/strawberry.jpeg",
    price: 89,
    originalPrice: 120,
    rating: 4.7,
    weight: "40g",
    isSale: false,
    reviews: [],
  },
  {
    id: 8,
    name: "PINEAPPLE BITES",
    category: "Crispy Slices",
    image: "./images/pineapple.jpeg",
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

        {/* Products Grid */}
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
                  className="group relative overflow-hidden rounded-[22px] border border-[#F2B892] bg-[#FFF4E6] shadow-[0_4px_14px_rgba(126,55,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(126,55,20,0.14)] flex flex-col"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${product.id}`}
                    className="relative mx-2.5 mt-2.5 block overflow-hidden rounded-[15px] bg-[#E9DDCB] aspect-square cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />

                    {/* Item Count */}
                    <div className="absolute left-2.5 top-2.5 z-10 rounded-[5px] bg-white px-2.5 py-1 text-[11px] font-black text-[#3B2A20] shadow-sm">
                      {qty} {qty === 1 ? "Item" : "Items"}
                    </div>

                    {/* Discount */}
                    {product.isSale && discountPercent > 0 && (
                      <div className="absolute right-2.5 top-2.5 z-10 rounded-[5px] bg-white px-2.5 py-1 text-[11px] font-black text-[#B74418] shadow-sm">
                        {discountPercent}% OFF
                      </div>
                    )}

                    {/* Wishlist */}
                    <button
                      type="button"
                      aria-label={`Add ${product.name} to wishlist`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute bottom-2.5 right-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Heart
                        size={18}
                        className={
                          wishlist.includes(product.id)
                            ? "fill-[#E8115B] text-[#E8115B]"
                            : "text-[#7A421D]"
                        }
                      />
                    </button>
                  </Link>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="min-h-[30px] text-[18px] leading-[1.2] font-extrabold text-[#8B2E08] transition-colors group-hover:text-[#B74418]">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Product details */}
                    <div className="mt-3 min-h-[42px] flex flex-wrap content-start gap-1.5">
                      <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#B74418]">
                        {product.category}
                      </span>

                      {product.badge && (
                        <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#B74418]">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Weight */}
                    <div className="mt-3 self-start rounded-[6px] border border-[#E96F32] bg-white/50 px-2.5 py-1 text-[10px] font-black text-[#B74418]">
                      {product.weight}
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex min-h-[34px] items-baseline gap-2">
                      <span className="text-[18px] font-black text-[#B74418]">
                        ₹{totalPrice}/-
                      </span>

                      {product.originalPrice > product.price && (
                        <span className="text-[13px] font-bold text-[#9CA3AF] line-through">
                          ₹{product.originalPrice * qty}
                        </span>
                      )}
                    </div>

                    {/* Quantity discount — keeps the existing pricing logic */}
                    {qtyDiscountPct > 0 && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-extrabold text-green-700">
                        <Sparkles size={11} />
                        {qtyDiscountPct}% extra discount
                      </div>
                    )}

                    {/* Quantity + Actions */}
                    <div className="mt-auto pt-4">
                      <div className="mb-2 flex items-center justify-between rounded-full bg-white/70 px-3 py-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wide text-[#8B6B5A]">
                          Quantity
                        </span>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            aria-label={`Decrease quantity for ${product.name}`}
                            onClick={() => updateQuantity(product.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A421D] shadow-sm transition-colors hover:bg-[#F8E2CF] cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="w-4 text-center text-xs font-black text-[#3B2A20]">
                            {qty}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase quantity for ${product.name}`}
                            onClick={() => updateQuantity(product.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A421D] shadow-sm transition-colors hover:bg-[#F8E2CF] cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `Added ${qty}x ${product.name} to cart for ₹${totalPrice}!`
                          )
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-[#B74418] py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-sm transition-all hover:bg-[#9D3812] hover:shadow-md active:scale-[0.98] cursor-pointer"
                      >
                        <span>ADD</span>
                        <Plus size={17} strokeWidth={3} />
                      </button>

                      {/* Combo remains available without changing product details */}
                      <button
                        type="button"
                        onClick={() => toggleComboProduct(product)}
                        className={`mt-2 w-full rounded-[10px] py-2 text-[10px] font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
                          isInCombo
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-transparent text-[#8B6B5A] border border-[#E8C7B0] hover:bg-white hover:text-[#7A421D]"
                        }`}
                      >
                        {isInCombo ? (
                          <span className="flex items-center justify-center gap-1">
                            <Check size={12} /> In Combo Cart
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1">
                            <Plus size={12} /> Add To Custom Combo
                          </span>
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