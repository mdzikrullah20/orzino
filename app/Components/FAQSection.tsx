"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Fruit cups kitne fresh hote hain?", a: "Har cup subah cut hota hai aur same-day deliver hota hai — koi overnight storage nahi." },
  { q: "Delivery mein kitna time lagta hai?", a: "Zyadatar orders 45-60 minutes mein deliver ho jaate hain, area ke hisaab se." },
  { q: "Kya koi preservative use hota hai?", a: "Bilkul nahi. Sirf fresh cut fruits, koi added sugar ya chemical nahi." },
  { q: "Refund ya replacement policy kya hai?", a: "Agar quality theek na mile to 24 hours ke andar free replacement ya full refund milta hai." },
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
    <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left">
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