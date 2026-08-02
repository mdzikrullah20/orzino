'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface SnackCategory {
  id: number;
  name: string;
  price: string;
  subTitle: string;
  badgeCount?: number;
  img: string;
  bgGradient: string;
}

const categories: SnackCategory[] = [
  {
    id: 1,
    name: 'Freeze Dried Fruits',
    subTitle: 'Jamun Cubes',
    price: 'Rs. 99',
    badgeCount: 8,
    img: 'https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540',
    bgGradient: 'from-[#E8115B] to-[#700628]',
  },
  {
    id: 2,
    name: 'Crispy Slices',
    subTitle: 'Mango Slices',
    price: 'Rs. 99',
    badgeCount: 5,
    img: 'https://orzino.com/wp-content/uploads/2026/05/MANGO-SNACKS.jpeg',
    bgGradient: 'from-[#1E3A8A] to-[#0F172A]',
  },
  {
    id: 3,
    name: 'Combo Packs',
    subTitle: 'Assorted Pack',
    price: 'Rs. 249',
    img: 'https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540',
    bgGradient: 'from-[#3B220C] to-[#181410]',
  },
  {
    id: 4,
    name: 'Fruit Jars',
    subTitle: 'Berry Mix',
    price: 'Rs. 149',
    badgeCount: 3,
    img: 'https://themoonstore.in/cdn/shop/files/73.png?v=1783330409&width=540',
    bgGradient: 'from-[#0EA5A5] to-[#043E3E]',
  },
  {
    id: 5,
    name: 'Fruit Pouches',
    subTitle: 'Strawberry Crunch',
    price: 'Rs. 79',
    img: 'https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540',
    bgGradient: 'from-[#16A34A] to-[#052E16]',
  },
];

export default function SnackingMoodSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative w-full bg-[#E5E9EE] py-10 sm:py-16 px-3 sm:px-6 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* 1. Curved Arc Title (Fixed: Removed clipPath that was cropping the text) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center w-full max-w-[1100px] mx-auto pt-2 pb-2 overflow-visible"
        >
          <svg
            viewBox="0 0 1200 180"
            className="w-full h-auto overflow-visible drop-shadow-sm"
          >
            {/* Smooth Curve Path */}
            <path
              id="smileArcPath"
              d="M 20,30 Q 600,160 1180,30"
              fill="transparent"
            />
            <text
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
              className="uppercase fill-[#3D1E16] text-[26px] xs:text-[30px] sm:text-[34px] md:text-[36px] tracking-wider font-black"
            >
              <textPath
                href="#smileArcPath"
                startOffset="50%"
                textAnchor="middle"
              >
                WHAT&apos;S YOUR SNACKING MOOD TODAY?
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* 2. Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[440px] mt-2 mb-8 sm:mb-12 px-2"
        >
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="The answer is always snacks..."
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/90 backdrop-blur-md rounded-full border border-gray-200 shadow-sm text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8115B] transition-all"
            />
          </div>
        </motion.div>

        {/* 3. Product Category Cards Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 w-full max-w-[1000px] mt-2">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative group flex flex-col items-center w-[100px] xs:w-[120px] sm:w-[140px]"
            >
              {/* Product Card Container */}
              <div className="relative w-[95px] xs:w-[110px] sm:w-[130px] h-[125px] xs:h-[140px] sm:h-[160px] rounded-[14px] sm:rounded-[16px] shadow-xl overflow-hidden flex flex-col items-center justify-between p-2.5 transition-all duration-300 group-hover:-translate-y-1.5">
                
                {/* Background Image */}
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100px, 130px"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />

                {/* Standard Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${cat.bgGradient} opacity-35 mix-blend-multiply`}
                />

                {/* Badge Counter */}
                {cat.badgeCount !== undefined && (
                  <span className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 w-4 sm:w-5 h-4 sm:h-5 bg-[#181410] text-white font-mono font-bold text-[9px] sm:text-[10px] rounded-full flex items-center justify-center shadow-md">
                    {cat.badgeCount}
                  </span>
                )}
              </div>

              {/* DETAILS BELOW IMAGE */}
              <div className="flex flex-col items-center text-center mt-2.5 sm:mt-3 w-full">
                {/* Category Title */}
                <span className="font-bold text-[12px] sm:text-[14px] text-[#3B1219] tracking-wide group-hover:text-[#E8115B] transition-colors line-clamp-1">
                  {cat.name}
                </span>

                {/* Price below Title */}
                <span className="font-mono font-black text-[#E8115B] text-[11px] sm:text-sm mt-0.5">
                  {cat.price}
                </span>

                {/* Order Button below Price */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert(`Added ${cat.name} (${cat.price}) to order!`)}
                  className="mt-2 w-full py-1.5 px-2 sm:px-3 bg-[#FFC300] hover:bg-yellow-400 text-[#181410] rounded-full font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 shadow-md cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Order</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}