"use client";
import React from "react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <a href="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        className="transition-transform duration-500 ease-out group-hover:rotate-[30deg]"
      >
        <defs>
          <linearGradient id="citrusGrad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#F4623A" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#citrusGrad)" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1="20"
              y1="20"
              x2={20 + 16 * Math.cos(angle)}
              y2={20 + 16 * Math.sin(angle)}
              stroke="#FFFBF5"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.55"
            />
          );
        })}
        <circle cx="20" cy="20" r="4.5" fill="#FFFBF5" />
      </svg>
      <span className="text-2xl font-bold tracking-tight leading-none" style={{ fontFamily: "var(--font-poppins, Poppins, sans-serif)" }}>
        <span className="text-[#1B4332]">Orz</span>
        <span className="text-[#F4623A]">ino</span>
      </span>
    </a>
  );
};

export default Logo;