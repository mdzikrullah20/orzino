'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// 1. Importing react-icons (FontAwesome)
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  avatar: string;
}

// 🇮🇳 8 Authentic Indian Customer Reviews
const reviews: Review[] = [
  {
    id: 1,
    name: 'Ananya Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    comment: 'The Freeze Dried Jamun Cubes are insane! Zero added sugar but super sweet and crunchy. Perfect mid-day snack for office.',
    productName: 'Freeze Dried Jamun Cubes',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Rohan Verma',
    location: 'Delhi, NCR',
    rating: 5,
    comment: 'Mango slices taste like fresh Alphonsos locked in crunchiness! Kids love it in their school lunch boxes.',
    productName: 'Crispy Mango Slices',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Priya Nair',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    comment: 'Ordered the Combo Pack for family gifting during Diwali. Everyone was impressed by the packaging and quality!',
    productName: 'Assorted Combo Pack',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    name: 'Aarav Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    comment: 'The crunch is unbelievable! Best healthy snacking alternative when late night craving hits.',
    productName: 'Strawberry Crunch Pouch',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 5,
    name: 'Sneha Kulkarni',
    location: 'Pune, Maharashtra',
    rating: 5,
    comment: 'Love adding these Berry Mix jars to my morning yogurt smoothie bowls. Super nutritious!',
    productName: 'Berry Mix Fruit Jar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 6,
    name: 'Vikram Sengupta',
    location: 'Kolkata, West Bengal',
    rating: 5,
    comment: '100% natural flavor with no artificial preservatives. Orzino snacks are now a permanent item in our pantry.',
    productName: 'Freeze Dried Jamun Cubes',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 7,
    name: 'Diya Reddy',
    location: 'Hyderabad, Telangana',
    rating: 5,
    comment: 'Super fast delivery and top quality fruits. The crunch sound when you bite into them is so satisfying!',
    productName: 'Crispy Mango Slices',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 8,
    name: 'Karan Singhania',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    comment: 'Finally a snack brand that delivers on its promises. No added sugar and pure fruit goodness!',
    productName: 'Strawberry Crunch Pouch',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
  },
];

export default function JoinFamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Smoothly scale & move the vinyl record badge to center as user scrolls
  const badgeScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F5EFE6] py-16 sm:py-24 px-4 overflow-hidden select-none"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
        
        {/* 1. SCROLL TO CENTER ANIMATED VINYL BADGE */}
        <motion.div
          style={{
            scale: badgeScale,
            y: badgeY,
            opacity: badgeOpacity,
          }}
          className="relative w-[140px] sm:w-[170px] md:w-[190px] h-[140px] sm:h-[170px] md:h-[190px] mb-8"
        >
          {/* Continuous Infinite Rotation Container */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="w-full h-full rounded-full bg-[#181410] border-4 border-[#FFC300] shadow-2xl flex items-center justify-center p-2 relative overflow-hidden"
          >
            {/* Outer Circular SVG Text Path */}
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <path
                id="circlePath"
                d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                fill="transparent"
              />
              <text className="font-extrabold uppercase fill-white text-[13px] tracking-[0.25em]">
                <textPath href="#circlePath" startOffset="0%">
                  HAVE YOU SNACKED TODAY? • HAVE YOU SNACKED TODAY? •
                </textPath>
              </text>
            </svg>

            {/* Inner Yellow Center Circle */}
            <div className="absolute w-[50px] sm:w-[65px] h-[50px] sm:h-[65px] bg-[#FFC300] rounded-full border-2 border-[#181410] flex items-center justify-center shadow-inner">
              <div className="w-3 h-3 bg-[#181410] rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* 2. CURVED "JOIN THE FAM" TITLE WITH SPARKLE ACCENTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-[600px] flex items-center justify-center my-2"
        >
          {/* Left Sparkle Accent */}
          <span className="text-[#3D1E16] text-xl sm:text-2xl font-bold mr-2 sm:mr-4">
            ✦
          </span>

          <svg
            viewBox="0 0 500 100"
            className="w-full max-w-[380px] sm:max-w-[460px] h-auto overflow-visible"
          >
            <path
              id="joinFamPath"
              d="M 20,20 Q 250,80 480,20"
              fill="transparent"
            />
            <text
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
              className="uppercase fill-[#3D1E16] text-[38px] sm:text-[46px] tracking-wider font-black"
            >
              <textPath href="#joinFamPath" startOffset="50%" textAnchor="middle">
                JOIN THE FAM
              </textPath>
            </text>
          </svg>

          {/* Right Sparkle Accent */}
          <span className="text-[#3D1E16] text-xl sm:text-2xl font-bold ml-2 sm:ml-4">
            ✦
          </span>
        </motion.div>

        {/* 3. SOCIAL MEDIA ICONS BAR (using react-icons) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-5 sm:gap-6 mt-4 mb-12 text-[#3D1E16]"
        >
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: -6 }}
            className="hover:text-[#E8115B] transition-colors bg-white p-3 rounded-full shadow-md"
          >
            <FaFacebookF className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 6 }}
            className="hover:text-[#E8115B] transition-colors bg-white p-3 rounded-full shadow-md"
          >
            <FaTwitter className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: -6 }}
            className="hover:text-[#E8115B] transition-colors bg-white p-3 rounded-full shadow-md"
          >
            <FaInstagram className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 6 }}
            className="hover:text-[#E8115B] transition-colors bg-white p-3 rounded-full shadow-md"
          >
            <FaYoutube className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* 4. HEAR FROM OUR CUSTOMERS HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
          className="uppercase text-[#3D1E16] text-[40px] sm:text-[56px] md:text-[68px] leading-[1.05] tracking-tight max-w-[700px] mt-4 mb-12"
        >
          HEAR FROM OUR CUSTOMERS
        </motion.h2>

        {/* 5. 8 INDIAN CUSTOMER REVIEWS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-[20px] p-5 shadow-lg border border-gray-100 flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#FFC300] mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>

                {/* Feedback Comment */}
                <p className="text-[#3D1E16] text-[13px] sm:text-[14px] leading-relaxed font-medium mb-4 italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div>
                {/* Tagged Product */}
                <div className="mb-4 inline-block bg-[#FFC300]/20 text-[#3D1E16] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {rev.productName}
                </div>

                {/* Customer Profile Header */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                    <Image
                      src={rev.avatar}
                      alt={rev.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[13px] text-[#181410]">
                        {rev.name}
                      </span>
                      <FaCheckCircle className="text-[#16A34A] w-3 h-3" title="Verified Buyer" />
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {rev.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}