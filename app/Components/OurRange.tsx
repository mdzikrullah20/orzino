'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface RangeItem {
  id: number;
  name: string;
  flavor: string;
  sub: string;
  price: string;
  sectionBg: string;
  bagGradient: string;
  ringBorder: string;
  floatingIcons: string[];
  img: string;
}

const MANGO_SNACKS_IMG =
  'https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540';
  
const MOON_STORE_WEB_CONTENT_IMG =
  'https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540';

export default function OurRange() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items: RangeItem[] = [
   {
  id: 1,
  name: 'Pineapple Slices',
  flavor: '',
  sub: 'FRUITS',
  price: 'Rs. 99',
  sectionBg: '#4C1D95',
  bagGradient: 'from-[#6B21A8] to-[#3B0764]',
  ringBorder:
    'border-[#C084FC]/50 bg-[#C084FC]/15 shadow-[0_0_60px_rgba(192,132,252,0.3)]',
  floatingIcons: ['🍍', '🍍', '🍍'],
  img: './images/pineappleB.jpeg',
},
    {
      id: 0,
      name: 'MANGO SLICES',
      flavor: '',
      sub: 'FRUITS',
      price: 'Rs. 99',
      sectionBg: '#D97706',
      bagGradient: 'from-[#F59E0B] to-[#78350F]',
      ringBorder:
        'border-[#FDE047]/50 bg-[#FDE047]/15 shadow-[0_0_60px_rgba(253,224,71,0.3)]',
      floatingIcons: ['🥭', '🥭', '🥭'],
      img: './images/mango.jpeg',
    },
{
  id: 2,
  name: 'Banana Chips',
  flavor: 'Sea Salt',
  sub: 'SNACKS',
  price: 'Rs. 45',
  sectionBg: '#7A421D',
  bagGradient: 'from-[#5e3c1a] to-[#3B220C]',
  ringBorder:
    'border-[#E0A96D]/50 bg-[#E0A96D]/15 shadow-[0_0_60px_rgba(224,169,109,0.3)]',
  floatingIcons: ['🍌', '🧂', '🍌'],
  img: './images/banana.jpeg',
},
    {
      id: 3,
        name: 'Pineapple Slices',
      flavor: '',
      sub: 'CHIPS',
      price: 'Rs. 45',
      sectionBg: '#5B8DF6',
      bagGradient: 'from-[#1e3a8a] to-[#0f172a]',
      ringBorder:
        'border-[#9eb3ff]/50 bg-[#9eb3ff]/15 shadow-[0_0_60px_rgba(158,179,255,0.3)]',
     floatingIcons: ['🍍', '🍍', '🍍'],
  img: './images/pineapple.jpeg',
    },
   {
  id: 4,
  name: 'Apple Chips',
  flavor: '',
  sub: 'FRUITS',
  price: 'Rs. 43',
  sectionBg: '#0D9488',
  bagGradient: 'from-[#0ea5a5] to-[#043e3e]',
  ringBorder:
    'border-[#80EEEE]/50 bg-[#80EEEE]/15 shadow-[0_0_60px_rgba(0,242,254,0.3)]',
  floatingIcons: ['🍎', '🍯', '🍎'],
  img: './images/apple.jpeg',
},
{
  id: 5,
  name: 'Guava Snacks',
  flavor: '',
  sub: 'FRUITS',
  price: 'Rs. 60',
  sectionBg: '#BE123C',
  bagGradient: 'from-[#E8115B] to-[#700628]',
  ringBorder:
    'border-[#FF80A0]/50 bg-[#FF80A0]/15 shadow-[0_0_60px_rgba(255,128,160,0.3)]',
  floatingIcons: ['🍈', '🍈', '🍈'],
  img: './images/guava.jpeg',
},
    {
      id: 6,
      name: 'Strawberry Guac',
      flavor: '',
      sub: 'Guac',
      price: 'Rs. 50',
      sectionBg: '#15803D',
      bagGradient: 'from-[#16a34a] to-[#052e16]',
      ringBorder:
        'border-[#86EFAC]/50 bg-[#86EFAC]/15 shadow-[0_0_60px_rgba(134,239,172,0.3)]',
      floatingIcons: ['🥑', '🍋', '🥑'],
      img: './images/strawberry.jpeg',
    },
    {
      id: 7,
      name: 'PINEAPPLE BITES',
      flavor: '',
      sub: 'FRUITS',
      price: 'Rs. 85',
      sectionBg: '#EA580C',
      bagGradient: 'from-[#F97316] to-[#7C2D12]',
      ringBorder:
        'border-[#FDBA74]/50 bg-[#FDBA74]/15 shadow-[0_0_60px_rgba(253,186,116,0.3)]',
      floatingIcons: ['🍍', '🍍', '🍍'],
      img: './images/pineapple.jpeg',
    },
  ];

  const total = items.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const activeItem = items[activeIndex];

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return {
        scale: 1.15,
        opacity: 1,
        x: '0%',
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 1) {
      return {
        scale: 0.8,
        opacity: 0.45,
        x: '85%',
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === -1) {
      return {
        scale: 0.8,
        opacity: 0.45,
        x: '-85%',
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    } else {
      return {
        scale: 0.5,
        opacity: 0,
        x: diff > 0 ? '160%' : '-160%',
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }
  };

  // Button Width = 36px (w-9), Gap = 8px (gap-2) -> Step = 44px
  const buttonStep = 44;
  const trackOffset = -activeIndex * buttonStep;

  return (
    <section id="range" className="relative w-full bg-[#E5E9EE] overflow-hidden pb-12">
      <motion.div
        animate={{ backgroundColor: activeItem.sectionBg }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="relative w-full min-h-[85vh] pt-16 sm:pt-24 pb-16 px-4 flex flex-col items-center justify-between text-white shadow-2xl overflow-hidden select-none"
        style={{
          clipPath: 'ellipse(100% 100% at 50% 0%)',
        }}
      >
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mt-4 z-10"
        >
          <h2 className="font-serif tracking-wider uppercase text-[clamp(40px,6.5vw,76px)] drop-shadow-md">
            OUR RANGE
          </h2>
        </motion.div>

        {/* Carousel Stage Container */}
        <div className="relative w-full max-w-[1000px] h-[380px] sm:h-[420px] flex items-center justify-center my-auto z-10">
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 z-30 w-12 h-12 rounded-full bg-white text-black font-bold text-lg flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            ❮
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              const style = getCardStyle(idx);

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  initial={false}
                  animate={{
                    scale: style.scale,
                    opacity: style.opacity,
                    x: style.x,
                    zIndex: style.zIndex,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{ pointerEvents: style.pointerEvents }}
                  className="absolute flex flex-col items-center cursor-pointer"
                >
                  <div
                    className={`relative w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] rounded-full border-2 sm:border-4 flex items-center justify-center transition-all duration-500 ${
                      isActive ? item.ringBorder : 'border-white/20 bg-white/5'
                    }`}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <>
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              repeat: Infinity,
                              duration: 2.2,
                              ease: 'easeInOut',
                            }}
                            className="absolute top-2 left-6 text-2xl"
                          >
                            {item.floatingIcons[0]}
                          </motion.span>
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, y: [0, 8, 0] }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              repeat: Infinity,
                              duration: 2.8,
                              ease: 'easeInOut',
                            }}
                            className="absolute bottom-4 left-4 text-2xl"
                          >
                            {item.floatingIcons[1]}
                          </motion.span>
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: 'easeInOut',
                            }}
                            className="absolute top-8 right-4 text-2xl"
                          >
                            {item.floatingIcons[2]}
                          </motion.span>
                        </>
                      )}
                    </AnimatePresence>

                    <div className="relative w-[95px] h-[140px] sm:w-[120px] sm:h-[175px] rounded-t-[14px] rounded-b-[30px] shadow-2xl overflow-hidden flex flex-col items-center justify-between p-3.5">
                      {item.img && (
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 120px, 150px"
                          className="object-cover object-center"
                          priority
                        />
                      )}

                      {/* <div
                        className={`absolute inset-0 bg-gradient-to-b ${item.bagGradient} opacity-55 mix-blend-multiply`}
                      /> */}

                      {/* <div className="relative z-10 text-center font-black text-[9px] sm:text-[11px] tracking-widest text-white drop-shadow">
                        SNACK
                      </div> */}

                      <div
                        className="relative z-10 font-serif text-center text-white text-[13px] sm:text-[16px] leading-snug drop-shadow-md"
                        dangerouslySetInnerHTML={{ __html: item.flavor }}
                      />

                      <div className="relative z-10 font-mono text-[8px] sm:text-[9px] text-white/90 tracking-widest drop-shadow">
                        {item.sub}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="font-serif text-white tracking-widest text-lg sm:text-2xl drop-shadow">
                      {item.name}
                    </h3>
                    <p className="font-mono text-white/80 text-xs sm:text-sm mt-0.5">
                      {item.price}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next"
            className="absolute right-2 sm:right-6 z-30 w-12 h-12 rounded-full bg-white text-black font-bold text-lg flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            ❯
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 3-BUTTON SLIDING PILL NAVIGATION (ACTIVE IN CENTER)  */}
        {/* ---------------------------------------------------- */}
       <div className="relative z-10 mb-2 flex items-center justify-center">
  {/* Capsule window for exactly 3 static buttons */}
  <div className="relative px-3 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 shadow-2xl flex items-center gap-2">
    
    {/* 1. LEFT BUTTON: Go to Previous Item */}
    <button
      onClick={handlePrev}
      aria-label="Previous Item"
      className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-bold bg-white/20 text-white hover:bg-white/40 active:scale-95 transition-all duration-300 cursor-pointer"
    >
      {(activeIndex - 1 + total) % total + 1}
    </button>

    {/* 2. CENTER BUTTON: Currently Active Item */}
    <button
      aria-label="Active Item"
      className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-black bg-[#FFC300] text-black scale-110 shadow-lg ring-2 ring-white transition-all duration-300 cursor-default"
    >
      {activeIndex + 1}
    </button>

    {/* 3. RIGHT BUTTON: Go to Next Item */}
    <button
      onClick={handleNext}
      aria-label="Next Item"
      className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-bold bg-white/20 text-white hover:bg-white/40 active:scale-95 transition-all duration-300 cursor-pointer"
    >
      {(activeIndex + 1) % total + 1}
    </button>

  </div>
</div>  
      </motion.div>
    </section>
  );
}