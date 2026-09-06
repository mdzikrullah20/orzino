'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Anton } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

interface Bag {
  id: number;
  name: string;
  img: string;
  alt: string;
  slug?: string;
  isComingSoon?: boolean;
}

const bags: Bag[] = [
  {
    id: 0,
     name: 'Tropical Pineapple',
    img: './images/newPineapple.jpeg',
    alt: 'ORZINO Pineapple Freeze Dried Slices',
  },
  {
    id: 1,
    name: 'Juicy Mango',
    img: './images/newMango.jpeg',
    alt: 'ORZINO Mango Freeze Dried Pack',
  },
  {
    id: 2,
    name: 'Tropical Pineapple',
    img: './images/newPineapple.jpeg',
    alt: 'ORZINO Pineapple Freeze Dried Slices',
  },
  {
    id: 3,
    name: 'Sweet Banana',
    img: './images/banana.jpeg',
    alt: 'ORZINO Freeze Dried Banana Pack',
    isComingSoon: true,
  },
];

const MARQUEE_TEXT =
  'ORZINO • WARNING: 100% REAL FRUIT • NO ADDED SUGAR • SUPER CRISPY & DELICIOUS';

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % bags.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const activeBag = bags[activeIndex];

  return (
    <section
      className={`${anton.variable} relative min-h-screen flex flex-col justify-between px-[5vw] pt-5 sm:pt-20 pb-16 bg-[#FFC300] overflow-hidden select-none`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-12 items-center w-full max-w-[1300px] mx-auto z-10 my-auto px-3 sm:px-0">
        
        {/* Left Column (Typography + Call To Action) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Main Headline - Strictly 2 Lines */}
          <h1
            style={{ fontFamily: 'var(--font-anton)' }}
            className="uppercase text-[clamp(28px,5.5vw,68px)] text-white leading-[1.1] tracking-wide drop-shadow-md mb-4 sm:mb-6 line-clamp-2"
          >
            ORZINO Freeze Dried{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeBag.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-[#181410] bg-white px-3 py-0.5 rounded-lg sm:rounded-xl shadow-md align-middle text-[clamp(24px,4.8vw,60px)]"
              >
                {activeBag.name}
              </motion.span>
            </AnimatePresence>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="font-semibold text-[15px] sm:text-[19px] max-w-[480px] mb-4 sm:mb-6 text-white leading-relaxed">
            100% real fruit locked in peak freshness. Super crunchy, intensely flavorful, and zero added sugar.
          </p>

          {/* CTA Button */}
          <motion.a
            href={activeBag.isComingSoon ? '#coming-soon' : '/products'}
            whileHover={
              !activeBag.isComingSoon
                ? {
                    scale: 1.08,
                    y: -4,
                    transition: { duration: 0.2 },
                  }
                : undefined
            }
            whileTap={!activeBag.isComingSoon ? { scale: 0.96 } : undefined}
            className={`inline-block px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-extrabold uppercase tracking-wide text-[14px] sm:text-[16px] border-[3px] border-white shadow-lg mt-1 sm:mt-3 transition-all ${
              activeBag.isComingSoon
                ? 'bg-white/30 text-white border-white/80 cursor-not-allowed opacity-90'
                : 'bg-transparent text-white cursor-pointer hover:bg-white hover:text-[#181410]'
            }`}
          >
            {activeBag.isComingSoon ? 'Coming Soon' : 'Explore Flavors'}
          </motion.a>
        </motion.div>

        {/* Right Column (Single Image Auto-Slider) */}
        <div className="relative h-[340px] xs:h-[400px] sm:h-[500px] md:h-[580px] w-full flex items-center justify-center mt-6 sm:mt-8 lg:mt-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeBag.id}
              initial={{ x: 200, opacity: 0, rotate: 10, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ x: -200, opacity: 0, rotate: -10, scale: 0.8 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute w-[180px] xs:w-[220px] sm:w-[280px] md:w-[320px] h-[300px] xs:h-[360px] sm:h-[460px] md:h-[520px] rounded-[16px] sm:rounded-[22px] shadow-[0_16px_36px_rgba(0,0,0,0.3)] ring-4 ring-white"
            >
              <div className="relative w-full h-full overflow-hidden rounded-[12px] sm:rounded-[18px]">
                {/* Top Right Blinking Badge */}
                {activeBag.isComingSoon && (
                  <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-[#181410]/90 backdrop-blur-md text-white text-[10px] sm:text-[12px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md border border-white/20">
                    <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8115B] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#E8115B]"></span>
                    </span>
                    <span>Coming Soon</span>
                  </div>
                )}

                {activeBag.isComingSoon ? (
                  <Image
                    src={activeBag.img}
                    alt={activeBag.alt || 'ORZINO Product Bag'}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 320px"
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <Link href={activeBag.slug || '/products'} className="relative block w-full h-full">
                    <Image
                      src={activeBag.img}
                      alt={activeBag.alt || 'ORZINO Product Bag'}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 320px"
                      className="object-cover object-center"
                      priority
                    />
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Auto-Scrolling Marquee Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 border-t-[3px] border-[#181410] py-2.5 sm:py-3.5 overflow-hidden z-20 shadow-lg">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
        >
          <div className="flex items-center shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={`a-${i}`}
                className="mx-2 font-mono font-bold text-[13px] sm:text-[18px] lg:text-[24px] tracking-wide text-[#181410] uppercase flex items-center"
              >
                {MARQUEE_TEXT}
                <span className="text-[#E8115B] mx-3 sm:mx-4">•</span>
              </span>
            ))}
          </div>

          <div className="flex items-center shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={`b-${i}`}
                className="mx-2 font-mono font-bold text-[13px] sm:text-[18px] lg:text-[24px] tracking-wide text-[#181410] uppercase flex items-center"
              >
                {MARQUEE_TEXT}
                <span className="text-[#E8115B] mx-3 sm:mx-4">•</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}