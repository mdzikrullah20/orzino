'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GiftingSection() {
  return (
    <section className="relative w-full bg-[#FFC300] select-none overflow-hidden">
      {/* Maroon Wavy Banner Container */}
      <div className="relative w-full bg-[#8B002B] py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
        
        {/* Top Organic Wave Divider (Changed to Yellow) */}
        <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-[#FFC300] clip-path-wave-top pointer-events-none" />

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          
          {/* Left Side: Typography & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h2
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
              className="text-white uppercase font-black text-[42px] sm:text-[54px] md:text-[62px] lg:text-[72px] leading-[1.05] tracking-wide drop-shadow-md mb-6 max-w-[500px]"
            >
              New Expression Of Gifting
            </h2>

            <motion.a
              href="/products"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-[#181410] hover:bg-[#FFC300] transition-colors px-7 py-3 rounded-full font-extrabold text-[12px] sm:text-[13px] uppercase tracking-widest shadow-lg cursor-pointer"
            >
              EXPLORE NOW
            </motion.a>
          </motion.div>

          {/* Right Side: Gift Box Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center md:justify-end"
          >
            <motion.div
              whileHover={{ y: -8, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-[260px] xs:w-[320px] sm:w-[380px] md:w-[420px] h-[220px] xs:h-[260px] sm:h-[300px] md:h-[460px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-2 border-white/20 cursor-pointer"
            >
              {/* Gift Box Image */}
              <Image
                src="./images/newMango.jpeg"
                alt="New Expression Of Gifting - Orzino Gift Pack"
                fill
                unoptimized
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />

              {/* Subtle Red Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Organic Wave Divider (Changed to Yellow) */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-[#FFC300] clip-path-wave-bottom pointer-events-none" />
      </div>

      <style jsx>{`
        .clip-path-wave-top {
          clip-path: ellipse(65% 100% at 50% 0%);
        }
        .clip-path-wave-bottom {
          clip-path: ellipse(65% 100% at 50% 100%);
        }
      `}</style>
    </section>
  );
}