"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Sparkles,
  Filter,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  weight: string;
  badge?: string;
};

// 🍓 12 ORZINO Freeze-Dried Fruit Products
const products: Product[] = [
  {
    id: 1,
    name: "Freeze-Dried Jamun Cubes",
    category: "Fruit Cubes",
    image:
      "https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540",
    price: 99,
    oldPrice: 129,
    rating: 4.9,
    weight: "35g",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Crispy Alphonso Mango Slices",
    category: "Crispy Slices",
    image: "https://orzino.com/wp-content/uploads/2026/05/MANGO-SNACKS.jpeg",
    price: 99,
    rating: 4.8,
    weight: "40g",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Berry Mix Crunch Jar",
    category: "Jars",
    image:
      "https://themoonstore.in/cdn/shop/files/73.png?v=1783330409&width=540",
    price: 149,
    oldPrice: 189,
    rating: 4.9,
    weight: "50g",
    badge: "Trending",
  },
  {
    id: 4,
    name: "Strawberry Crunch Pouch",
    category: "Pouches",
    image:
      "https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540",
    price: 79,
    oldPrice: 99,
    rating: 4.7,
    weight: "30g",
  },
  {
    id: 5,
    name: "Freeze-Dried Blueberry Bites",
    category: "Fruit Cubes",
    image:
      "https://themoonstore.in/cdn/shop/files/70_d0bd2cdb-5e24-4f7e-82d8-7bd548014028.png?v=1783330409&width=800",
    price: 119,
    rating: 4.8,
    weight: "35g",
    badge: "New",
  },
  {
    id: 6,
    name: "Crispy Pineapple Rings",
    category: "Crispy Slices",
    image:
      "https://themoonstore.in/cdn/shop/files/58.png?v=1782990977&width=800",
    price: 89,
    oldPrice: 109,
    rating: 4.6,
    weight: "45g",
  },
  {
    id: 7,
    name: "Pink Guava Crunch Pouch",
    category: "Pouches",
    image:
      "https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540",
    price: 89,
    rating: 4.7,
    weight: "40g",
  },
  {
    id: 8,
    name: "Freeze-Dried Kiwi Slices",
    category: "Crispy Slices",
    image:
      "https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540",
    price: 109,
    rating: 4.8,
    weight: "30g",
  },
  {
    id: 9,
    name: "Assorted Fruit Combo Box",
    category: "Combos",
    image: "https://orzino.com/wp-content/uploads/2026/05/MANGO-SNACKS.jpeg",
    price: 249,
    oldPrice: 299,
    rating: 5.0,
    weight: "150g",
    badge: "Value Pack",
  },
  {
    id: 10,
    name: "Crunchy Banana Chips",
    category: "Snacks",
    image:
      "https://themoonstore.in/cdn/shop/files/73.png?v=1783330409&width=540",
    price: 69,
    rating: 4.5,
    weight: "50g",
  },
  {
    id: 11,
    name: "Freeze-Dried Dragonfruit Cubes",
    category: "Fruit Cubes",
    image:
      "https://themoonstore.in/cdn/shop/files/70_d0bd2cdb-5e24-4f7e-82d8-7bd548014028.png?v=1783330409&width=800",
    price: 129,
    rating: 4.9,
    weight: "35g",
    badge: "Exotic",
  },
  {
    id: 12,
    name: "Pomegranate Seeds Crunch Jar",
    category: "Jars",
    image:
      "https://themoonstore.in/cdn/shop/files/58.png?v=1782990977&width=800",
    price: 139,
    oldPrice: 169,
    rating: 4.7,
    weight: "45g",
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

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  return (
    <div className="min-h-screen bg-[#E5E9EE] select-none">
      
      {/* Navigation Top Bar */}
      {/* <div className="bg-gray-500 text-white py-3.5 px-6 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:underline"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="font-mono text-xs font-bold text-gray-300 hidden sm:inline">
            FREE SHIPPING ON ORDERS OVER RS. 499 🚀
          </span>
        </div>
      </div> */}


      {/* Categories & Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Category Filters Bar */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-[24px] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative bg-[#F8F9FA] p-6 flex items-center justify-center overflow-hidden border-b border-gray-100 h-[220px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    unoptimized
                    className="object-contain h-[160px] group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#E8115B] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={18}
                      className={
                        wishlist.includes(product.id)
                          ? "fill-[#E8115B] text-[#E8115B]"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </div>

                {/* Card Info */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <span className="text-[#E8115B] font-extrabold">
                        {product.category}
                      </span>
                      <span>{product.weight}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#181410] line-clamp-1 group-hover:text-[#E8115B] transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-2">
                      <Star
                        size={15}
                        fill="#FFC300"
                        className="text-[#FFC300]"
                      />
                      <span className="font-extrabold text-xs text-[#181410]">
                        {product.rating} / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Pricing & Add Button */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex flex-col gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#181410] font-mono">
                        ₹{product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs font-bold text-gray-400 line-through font-mono">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        alert(`Added ${product.name} (₹${product.price}) to cart!`)
                      }
                      className="w-full py-3 rounded-full bg-[#FFC300] hover:bg-yellow-400 text-[#181410] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors border border-[#181410]/10"
                    >
                      <ShoppingCart size={16} />
                      <span>ADD TO CART</span>
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[24px] shadow-sm border border-gray-200">
            <h3 className="text-2xl font-black text-[#181410] uppercase">
              No snacks found!
            </h3>
            <p className="text-gray-500 mt-2 text-sm font-medium">
              Try searching for another fruit or selecting a different category.
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
    </div>
  );
}