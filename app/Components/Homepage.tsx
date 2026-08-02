'use client';

import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

interface Bag {
  rot: string;
  z: string;
  margin?: string;
  translate?: string;
  img: string;
  alt: string;
  slug?: string; // Optional custom route per product if needed later
}

// Product Images
const JAMUN_CUBES_IMG_1 =
  'https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540';
const JAMUN_CUBES_IMG_2 =
  'https://themoonstore.in/cdn/shop/files/70_d0bd2cdb-5e24-4f7e-82d8-7bd548014028.png?v=1783330409&width=800';
const MANGO_SNACKS_IMG =
  'https://orzino.com/wp-content/uploads/2026/05/MANGO-SNACKS.jpeg';
const PREKSHA_IMG =
  'https://themoonstore.in/cdn/shop/files/58.png?v=1782990977&width=800';

const bags: Bag[] = [
  {
    rot: '-rotate-[8deg]',
    z: 'z-2',
    margin: '-mr-3 sm:-mr-4',
    img: JAMUN_CUBES_IMG_1,
    alt: 'ORZINO Jamun Freeze Dried Cubes Pack 1',
  },
  {
    rot: '-rotate-[2deg]',
    z: 'z-3',
    translate: '-translate-y-2 sm:-translate-y-3',
    img: JAMUN_CUBES_IMG_2,
    alt: 'ORZINO Jamun Freeze Dried Cubes Pack 2',
  },
  {
    rot: 'rotate-[4deg]',
    z: 'z-2',
    margin: '-ml-3 sm:-ml-4',
    translate: 'translate-y-1.5',
    img: MANGO_SNACKS_IMG,
    alt: 'ORZINO Mango Freeze Dried Slices',
  },
  {
    rot: 'rotate-[10deg]',
    z: 'z-1',
    margin: '-ml-[12px] sm:-ml-[18px]',
    translate: '-translate-y-1',
    img: PREKSHA_IMG,
    alt: 'ORZINO Freeze Dried Fruits Collection',
  },
];

const MARQUEE_TEXT =
  'ORZINO • WARNING: 100% REAL FRUIT • NO ADDED SUGAR • SUPER CRISPY & DELICIOUS';

export default function HeroSection() {
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
          {/* Main Headline */}
          <h1
            style={{ fontFamily: 'var(--font-anton)' }}
            className="uppercase text-[clamp(36px,8.5vw,96px)] text-white leading-[1.1] sm:leading-[1.05] tracking-wide drop-shadow-md mb-4 sm:mb-6"
          >
            ORZINO Freeze
            <br />
            Dried Fruits
          </h1>

          {/* Subtitle Paragraph */}
          <p className="font-semibold text-[16px] sm:text-[20px] max-w-[500px] mb-4 sm:mb-6 text-white leading-relaxed">
            100% real fruit locked in peak freshness. Super crunchy, intensely flavorful, and zero added sugar.
          </p>

          {/* CTA Button */}
          <motion.a
            href="/products"
            whileHover={{
              scale: 1.08,
              y: -4,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.96 }}
            className="inline-block px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-extrabold uppercase tracking-wide text-[15px] sm:text-[17px] border-[3px] border-white bg-transparent text-white shadow-lg mt-2 sm:mt-4 cursor-pointer hover:bg-white hover:text-[#181410] transition-colors"
          >
            Explore Flavors
          </motion.a>
        </motion.div>

        {/* Right Column (Product Bags Stage) */}
        <div className="relative h-[260px] xs:h-[300px] sm:h-[420px] md:h-[420px] flex items-end justify-center mt-4 sm:mt-8 lg:mt-0 w-full overflow-visible">
          {bags.map((bag, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative w-[76px] xs:w-[90px] sm:w-[115px] md:w-[135px] h-[190px] xs:h-[225px] sm:h-[280px] md:h-[325px] rounded-[12px] sm:rounded-[16px] shadow-[0_12px_28px_rgba(0,0,0,0.25)] overflow-hidden ${bag.rot} ${bag.z} ${bag.margin || ''} ${bag.translate || ''} transition-transform duration-300 hover:scale-110 hover:z-30 cursor-pointer shrink-0`}
            >
              <Link href={bag.slug || "/products"} className="relative block w-full h-full">
                <Image
                  src={bag.img}
                  alt={bag.alt || 'ORZINO Product Bag'}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 90px, (max-width: 1024px) 130px, 160px"
                  className="object-cover object-center"
                  priority
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Auto-Scrolling Marquee Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 border-t-[3px] border-[#181410] py-2.5 sm:py-3.5 overflow-hidden z-20 shadow-lg">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-4 font-mono font-bold text-[13px] sm:text-[18px] lg:text-[24px] tracking-wide text-[#181410] uppercase flex items-center"
            >
              {MARQUEE_TEXT}
              <span className="text-[#E8115B] mx-3 sm:mx-4">•</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}