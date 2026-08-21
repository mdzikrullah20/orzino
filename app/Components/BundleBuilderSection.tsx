'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaPlus, FaTimes, FaShoppingBag } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  category: string;
  img: string;
}

// 🍓 6 Featured Freeze-Dried & Crispy Fruit Products
const products: Product[] = [
  {
    id: 1,
      name: 'Pineapple Slices',
    weight: '35g',
    price: 99,
    category: 'Fruit Cubes',
img: './images/pineappleB.jpeg',
  },
  {
    id: 2,
     name: 'MANGO SLICES',
    weight: '40g',
    price: 99,
    category: 'Crispy Slices',
  img: './images/mango.jpeg',
  },
  {
    id: 3,
  name: 'Banana Chips',
    weight: '50g',
    price: 149,
    category: 'Jars',
  img: './images/banana.jpeg',
  },
  {
    id: 4,
      name: 'MANGO SLICES',
    weight: '30g',
    price: 79,
    category: 'Fruit Cubes',
    img: './images/mango.jpeg',
  },
  {
    id: 5,
  name: 'Apple Chips',
    weight: '35g',
    price: 119,
    category: 'Fruit Cubes',
    img: './images/apple.jpeg',
  },
  {
    id: 6,
    name: 'Guava Cubes',
    weight: '45g',
    price: 89,
    category: 'Crispy Slices',
    img: './images/guava.jpeg',
  },
   {
    id: 7,
    name: 'strawberry Cubes',
    weight: '45g',
    price: 89,
    category: 'Crispy Slices',
    img: './images/strawberry.jpeg',
  },
];

const BUNDLE_SLOTS_COUNT = 8; // 8-Pack Bundle Slots

export default function BundleBuilderSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bundle, setBundle] = useState<(Product | null)[]>(
    Array(BUNDLE_SLOTS_COUNT).fill(null)
  );

  // Filter Categories
  const categories = ['All', 'Fruit Cubes', 'Crispy Slices', 'Jars'];

  // Add product to next free slot
  const handleAddProduct = (product: Product) => {
    const freeSlotIndex = bundle.findIndex((slot) => slot === null);
    if (freeSlotIndex !== -1) {
      const updatedBundle = [...bundle];
      updatedBundle[freeSlotIndex] = product;
      setBundle(updatedBundle);
    } else {
      alert('Your 8-Pack Bundle is full! Remove an item to add a new one.');
    }
  };

  // Remove product from specific slot index
  const handleRemoveSlot = (index: number) => {
    const updatedBundle = [...bundle];
    updatedBundle[index] = null;
    setBundle(updatedBundle);
  };

  // Calculate totals
  const filledSlots = bundle.filter((item): item is Product => item !== null);
  const totalAmount = filledSlots.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="w-full bg-[#E5E9EE] py-12 sm:py-16 px-4 sm:px-8 select-none">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <span className="text-[#E8115B] text-xs font-bold uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-200">
            Build Your Own Pack
          </span>
          <h2
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
            className="text-[36px] sm:text-[52px] text-[#181410] uppercase tracking-wide leading-none mt-2"
          >
            CREATE YOUR CUSTOM BUNDLE
          </h2>
        </div>

        {/* Main Grid: Left Products Selector vs Right Bundle Slots */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          
          {/* ================= LEFT COLUMN: PRODUCTS SELECTOR ================= */}
          <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-xl border border-gray-200">
            
            {/* Category Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-gray-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#FFC300] text-[#181410] shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid (Displaying Top 6 Cards - No Scrollbar) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-hidden">
              {products
                .filter(
                  (p) =>
                    selectedCategory === 'All' || p.category === selectedCategory
                )
                .slice(0, 6) // Strictly display top 6 products
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#F8F9FA] rounded-[18px] p-3.5 border border-gray-200 flex flex-col items-center text-center justify-between hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="relative w-[190px] h-[140px] mb-2">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col items-center mb-3">
                      <h4 className="font-bold text-xs text-[#181410] line-clamp-1">
                        {product.name}
                      </h4>
                      <span className="text-[11px] text-gray-500 font-semibold mt-0.5">
                        {product.weight} • Rs. {product.price}
                      </span>
                    </div>

                    {/* Yellow Add Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddProduct(product)}
                      className="w-full py-2 bg-[#FFC300] hover:bg-yellow-400 text-[#181410] rounded-full font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                    >
                      <FaPlus className="w-2.5 h-2.5" />
                      <span>ADD +</span>
                    </motion.button>
                  </div>
                ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: BUNDLE SLOTS GRID ================= */}
          <div className="bg-[#FFC300] rounded-[24px] p-5 sm:p-6 shadow-2xl border-2 border-white sticky top-6">
            
            <div className="flex items-center justify-between mb-4 border-b border-[#181410]/10 pb-3">
              <div>
                <h3
                  style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
                  className="text-2xl text-[#181410] uppercase tracking-wide leading-tight"
                >
                  YOUR BUNDLE
                </h3>
                <span className="text-xs font-bold text-[#181410]/80">
                  {filledSlots.length} of {BUNDLE_SLOTS_COUNT} slots filled
                </span>
              </div>

              {/* Reset All Button */}
              {filledSlots.length > 0 && (
                <button
                  onClick={() => setBundle(Array(BUNDLE_SLOTS_COUNT).fill(null))}
                  className="text-[11px] font-bold text-[#E8115B] hover:underline uppercase cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 8-Pack Bundle Slots Grid */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-6">
              {bundle.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-[14px] bg-white/80 border-2 border-dashed border-[#181410]/20 flex items-center justify-center overflow-hidden shadow-inner"
                >
                  <AnimatePresence mode="wait">
                    {item ? (
                      <motion.div
                        key={`filled-${index}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => handleRemoveSlot(index)}
                        className="relative w-full h-full p-1.5 flex flex-col items-center justify-center cursor-pointer group bg-white"
                        title="Click to remove"
                      >
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-contain p-1 group-hover:opacity-40 transition-opacity"
                        />

                        {/* Hover Overlay with Remove 'X' */}
                        <div className="absolute inset-0 bg-red-600/80 rounded-[12px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                          <FaTimes className="w-4 h-4 mb-0.5" />
                          <span className="text-[9px] font-bold uppercase">Remove</span>
                        </div>
                      </motion.div>
                    ) : (
                      <span className="font-mono font-black text-gray-400 text-sm sm:text-base">
                        {index + 1}
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Total Price & Checkout Footer */}
            <div className="bg-white rounded-[18px] p-4 shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Your Total:
                </span>
                <span className="font-mono font-black text-2xl text-[#181410]">
                  Rs. {totalAmount}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: filledSlots.length > 0 ? 1.02 : 1 }}
                whileTap={{ scale: filledSlots.length > 0 ? 0.98 : 1 }}
                disabled={filledSlots.length === 0}
                onClick={() =>
                  alert(`Bundle added to cart! Total: Rs. ${totalAmount}`)
                }
                className={`w-full py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors ${
                  filledSlots.length > 0
                    ? 'bg-[#181410] text-white hover:bg-[#E8115B] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaShoppingBag className="w-4 h-4" />
                <span>
                  {filledSlots.length === BUNDLE_SLOTS_COUNT
                    ? 'ADD BUNDLE TO CART'
                    : `ADD TO CART (${filledSlots.length}/${BUNDLE_SLOTS_COUNT})`}
                </span>
              </motion.button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}