"use client";

import React from "react";
import Link from "next/link";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        {/* Small Label */}
        <span className="inline-block mb-6 px-4 py-2 rounded-full border border-[#EADBCE] bg-[#F7EFE9] text-[#B23B14] text-xs font-semibold tracking-[0.2em] uppercase">
          Coming Soon
        </span>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-serif text-[#331C14] leading-tight">
          Something Special
          <br />
          Is Coming
        </h1>

        {/* Description */}
        <p className="mt-6 text-sm md:text-base text-[#8C6B58] leading-7">
          We&apos;re preparing something beautiful for you.
          <br />
          Our store will be available very soon.
        </p>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="w-16 h-px bg-[#D9C3B0]" />
          <span className="w-2 h-2 rounded-full bg-[#B23B14]" />
          <span className="w-16 h-px bg-[#D9C3B0]" />
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#B23B14] hover:bg-[#96300F] text-white px-7 py-3 rounded-xl text-xs font-medium uppercase tracking-wider transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}