"use client";
import React from "react";

const CTASection = () => {
  return (
    <section className="px-6 py-16">
      <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#F4623A] to-[#FFB347] px-8 py-14 text-center overflow-hidden">
        <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -right-6 w-36 h-36 rounded-full bg-white/10" />

        <h2 className="text-2xl md:text-3xl font-bold text-white relative z-10">
          Craving something fresh right now?
        </h2>
        <p className="text-white/90 mt-3 relative z-10">
          Order your fruit cup in under a minute — fresh, cool, delivered.
        </p>
        <button className="cursor-pointer mt-7 bg-white text-[#F4623A] font-semibold px-8 py-3 rounded-full hover:bg-[#1B4332] hover:text-white transition-colors duration-300 relative z-10">
          Order Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;