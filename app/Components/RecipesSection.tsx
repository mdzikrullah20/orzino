'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import Image from 'next/image';

interface Recipe {
  id: number;
  title: string;
  category: string;
  img: string;
  link: string;
  isComingSoon?: boolean;
}

// 🍓 Freeze Dried Fruit Products & Recipes
const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Pineapple Slices',
    category: 'Freeze Dried Fruit',
    img: './images/newPineapple.jpeg',
    link: '#',
  },
  {
    id: 2,
    title: 'MANGO SLICES',
    category: 'Crispy Slices',
    img: './images/newMango.jpeg',
    link: '#',
  },
  {
    id: 3,
    title: 'Banana Chips',
    category: 'Fruit Jars',
    img: './images/banana.jpeg',
    link: '#',
    isComingSoon: true,
  },
  {
    id: 4,
    title: 'Apple Chips',
    category: 'Fruit Pouches',
    img: './images/apple.jpeg',
    link: '#',
    isComingSoon: true,
  },
];

export default function RecipesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + recipes.length) % recipes.length
    );
  };

  return (
    <div className="w-full bg-[#E5E9EE]">
      <section
        style={{
          clipPath: 'ellipse(120% 100% at 50% 100%)',
        }}
        className="relative w-full bg-[#FFC300] pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
      >
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-10 items-center pt-4 sm:pt-8">
          
          {/* ================================
              LEFT COLUMN
          ================================= */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            
            {/* Heading */}
            <h2
              style={{
                fontFamily:
                  'var(--font-anton), Impact, sans-serif',
              }}
              className="uppercase text-[42px] sm:text-[64px] lg:text-[72px] text-[#181410] leading-none tracking-tight drop-shadow-sm"
            >
              RECIPES
            </h2>

            {/* View More Button */}
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-white text-[#181410] px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-extrabold text-[11px] sm:text-[13px] uppercase tracking-wider shadow-md hover:bg-[#181410] hover:text-white transition-colors cursor-pointer"
            >
              <span>VIEW MORE RECIPES</span>
            </motion.a>

            {/* ================================
                CAROUSEL ARROWS
            ================================= */}
            <div className="flex items-center gap-3 mt-4 sm:mt-6">
              
              {/* Previous */}
              <button
                onClick={prevSlide}
                aria-label="Previous Recipe"
                className="w-10 h-10 rounded-full border-2 border-[#181410] flex items-center justify-center text-[#181410] hover:bg-[#181410] hover:text-[#FFC300] transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next */}
              <button
                onClick={nextSlide}
                aria-label="Next Recipe"
                className="w-10 h-10 rounded-full border-2 border-[#181410] flex items-center justify-center text-[#181410] hover:bg-[#181410] hover:text-[#FFC300] transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* ================================
                FLOATING GUAVA IMAGE
            ================================= */}
            <motion.div
              initial={{
                y: 20,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="hidden lg:block relative w-[180px] sm:w-[220px] h-[200px] sm:h-[220px] mt-8 lg:mt-12 rounded-lg"
            >
              {/* <Image
                src="./images/newPineapple.jpeg"
                alt="Orzino Freeze Dried Fruit"
                fill
                unoptimized
                className="object-contain drop-shadow-2xl"
              /> */}
            </motion.div>
          </div>

          {/* ================================
              RIGHT COLUMN
          ================================= */}
          <div className="w-full overflow-hidden px-2 sm:px-0">
            
            <motion.div
              animate={{
                x: `-${currentIndex * 100}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              className="flex items-center cursor-grab active:cursor-grabbing py-2"
            >
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="w-full sm:w-[260px] flex-shrink-0 px-2 sm:px-3"
                >
                  {/* ================================
                      PRODUCT CARD
                  ================================= */}
                  <motion.div
                    whileHover={
                      !recipe.isComingSoon
                        ? { y: -6 }
                        : undefined
                    }
                    className="relative block w-full h-[360px] sm:h-[400px] bg-[#181410] rounded-[20px] overflow-hidden shadow-xl group border-2 border-white/20"
                  >
                    {/* ================================
                        PRODUCT IMAGE
                    ================================= */}
                    <Image
                      src={recipe.img}
                      alt={recipe.title}
                      fill
                      unoptimized
                      className={`object-cover object-center transition-transform duration-500 ${
                        !recipe.isComingSoon
                          ? 'group-hover:scale-110'
                          : ''
                      }`}
                    />

                    {/* ================================
                        COMING SOON OVERLAY
                    ================================= */}
                    {recipe.isComingSoon && (
                      <>
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/55 z-10" />

                        {/* ============================
                            TOP COMING SOON BADGE
                        ============================= */}
                        <div className="absolute top-4 left-4 z-30">
                          <div className="flex items-center gap-2 bg-[#FFC300] text-[#181410] px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                            
                            {/* Animated Dot */}
                            <span className="w-2 h-2 rounded-full bg-[#E8115B] animate-pulse" />

                            Coming Soon
                          </div>
                        </div>
                      </>
                    )}

                    {/* ================================
                        GRADIENT
                    ================================= */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />

                    {/* ================================
                        BOTTOM INFO
                    ================================= */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col justify-end">
                      
                      <div
                        className={`bg-white/95 backdrop-blur-md rounded-[12px] p-3.5 shadow-lg flex items-center justify-between transition-colors duration-300 ${
                          !recipe.isComingSoon
                            ? 'group-hover:bg-[#181410] group-hover:text-white'
                            : ''
                        }`}
                      >
                        
                        {/* Product Details */}
                        <div className="flex flex-col pr-2">
                          
                          {/* Category */}
                          <span
                            className={`text-[10px] sm:text-[11px] font-bold text-[#E8115B] uppercase tracking-wider ${
                              !recipe.isComingSoon
                                ? 'group-hover:text-[#FFC300]'
                                : ''
                            }`}
                          >
                            {recipe.category}
                          </span>

                          {/* Product Name */}
                          <h3
                            className={`font-bold text-[14px] sm:text-[15px] leading-snug line-clamp-1 text-[#181410] ${
                              !recipe.isComingSoon
                                ? 'group-hover:text-white'
                                : ''
                            }`}
                          >
                            {recipe.title}
                          </h3>
                        </div>

                        {/* ============================
                            ARROW
                        ============================= */}
                        {!recipe.isComingSoon && (
                          <div className="w-8 h-8 rounded-full bg-[#181410] text-white flex items-center justify-center shrink-0 group-hover:bg-[#FFC300] group-hover:text-[#181410] transition-colors">
                            <ArrowUpRight size={16} />
                          </div>
                        )}

                        {/* ============================
                            COMING SOON ICON
                        ============================= */}
                        {recipe.isComingSoon && (
                          <div className="w-8 h-8 rounded-full bg-[#FFC300] text-[#181410] flex items-center justify-center shrink-0">
                            <span className="text-[14px] font-black">
                              !
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}