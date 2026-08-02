'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart, ShieldCheck, Zap, Award } from 'lucide-react';
import { FaStar, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#181410] text-white select-none overflow-hidden">
      

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h1
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6"
          >
            REINVENTING THE <br />
            <span className="text-[#FFC300]">SNACKING EXPERIENCE</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            At <strong className="text-white">ORZINO</strong>, we believe snacking shouldn't come with compromise. We lock in peak harvest freshness using advanced freeze-drying technology to give you 100% real fruit crunch—zero added sugar, zero artificial junk.
          </p>
        </motion.div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/5 backdrop-blur-md rounded-[24px] p-8 border border-white/10 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 bg-[#FFC300] text-[#181410] rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-3">Super Crunchy</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our flash-freeze process removes moisture while preserving 98% of original nutrients and natural sweetness with an addictive crunch.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/5 backdrop-blur-md rounded-[24px] p-8 border border-white/10 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 bg-[#E8115B] text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-3">100% Pure Fruit</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              What you see is what you get. No added sugar, no chemical preservatives, no artificial colors, and zero palm oil.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/5 backdrop-blur-md rounded-[24px] p-8 border border-white/10 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 bg-[#FFC300] text-[#181410] rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Heart size={28} />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-3">Guilt-Free Snacking</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Perfect for late-night cravings, gym fueling, kids' school tiffins, and topping your favorite breakfast yogurt bowls.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Brand Journey Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#281c18] via-[#1c1512] to-[#281c18] rounded-[32px] p-8 sm:p-14 border border-white/15 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-start text-left">
            <span className="text-[#FFC300] font-mono font-bold text-xs uppercase tracking-widest mb-2">
              • Farm to Pack
            </span>
            <h2
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
              className="text-4xl sm:text-6xl text-white uppercase leading-tight mb-6"
            >
              FROM INDIAN ORCHARDS TO YOUR HANDS
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              We partner directly with trusted Indian farmers to source the sweetest Alphonsos, deepest Jamuns, and juiciest Strawberries at their absolute peak season. 
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Every pack undergoes rigorous quality checks in ISO-certified facilities to ensure you experience unmatched quality and maximum shelf life without artificial preservatives.
            </p>

            <Link
              href="/products"
              className="inline-block bg-[#FFC300] hover:bg-yellow-400 text-[#181410] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105"
            >
              EXPLORE OUR PRODUCTS
            </Link>
          </div>

          <div className="relative h-[320px] sm:h-[420px] rounded-[24px] overflow-hidden border-2 border-white/20 shadow-2xl">
            <Image
              src="https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540"
              alt="Orzino Fruit Crafting"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-[16px] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[#FFC300] font-bold text-xs uppercase">Verified Freshness</span>
                <h4 className="text-white font-bold text-sm">Locking Peak Nutrition Naturally</h4>
              </div>
              <Award className="text-[#FFC300] w-6 h-6" />
            </div>
          </div>

        </div>
      </section>

      {/* Social / Join Community CTA */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto border-t border-white/10 mt-12">
        <h2
          style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
          className="text-3xl sm:text-5xl text-white uppercase mb-4"
        >
          JOIN THE ORZINO FAM
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Follow us on social media for crunchy recipe ideas, behind-the-scenes content, and exclusive flavor drops!
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 bg-white/10 hover:bg-[#E8115B] text-white rounded-full flex items-center justify-center transition-colors shadow-md"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 bg-white/10 hover:bg-[#E8115B] text-white rounded-full flex items-center justify-center transition-colors shadow-md"
          >
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 bg-white/10 hover:bg-[#E8115B] text-white rounded-full flex items-center justify-center transition-colors shadow-md"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer copyright */}
      <div className="py-6 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
        © {new Date().getFullYear()} ORZINO SNACKS. ALL RIGHTS RESERVED.
      </div>

    </div>
  );
}