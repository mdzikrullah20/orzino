"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How fresh are the freeze-dried fruit snacks?", a: "Every batch is carefully freeze-dried to lock in peak freshness, natural nutrients, and crunch with zero overnight compromises." },
  { q: "How long does delivery take?", a: "Most orders are delivered within 45-60 minutes, depending on your location." },
  { q: "Are there any preservatives used?", a: "Absolutely not. Only 100% real freeze-dried fruits with no added sugar, oil, or artificial chemicals." },
  { q: "What is your refund or replacement policy?", a: "If you are unhappy with the quality, you get a free replacement or full refund within 24 hours." },
];

const FAQItem = ({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b border-gray-200">
    <button onClick={onClick} className="cursor-pointer w-full flex items-center justify-between py-5 text-left">
      <span className="font-medium text-[#1A1A1A]">{q}</span>
      <ChevronDown
        size={20}
        className={`text-[#40916C] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-40 pb-5" : "max-h-0"}`}>
      <p className="text-gray-500">{a}</p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-6 py-16 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#1B4332]">Frequently Asked Questions</h2>
      <div className="mt-10">
        {faqs.map((f, i) => (
          <FAQItem
            key={f.q}
            q={f.q}
            a={f.a}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;