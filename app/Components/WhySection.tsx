"use client";
import React, { useRef, useState, useEffect } from "react";
import { Leaf, ShieldCheck, Truck, Sparkles, LucideIcon } from "lucide-react";

const points: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Leaf, title: "Farm-Fresh Sourcing", desc: "Fruits picked daily straight from trusted local farms." },
  { icon: ShieldCheck, title: "Hygienic Packaging", desc: "Sealed and prepared in a clean, contact-safe kitchen." },
  { icon: Sparkles, title: "Zero Preservatives", desc: "No added sugar, colour, or chemical preservatives — ever." },
  { icon: Truck, title: "Cool-Chain Delivery", desc: "Chilled packaging keeps every cup fresh till your door." },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const WhyCard = ({ icon: Icon, title, desc, delay }: { icon: LucideIcon; title: string; desc: string; delay: number }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}s` }}
      className={`reveal ${visible ? "show" : ""} bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[#F4623A]/10`}
    >
      <div className="w-12 h-12 mx-auto rounded-full bg-[#40916C]/10 flex items-center justify-center">
        <Icon size={22} className="text-[#40916C]" />
      </div>
      <h3 className="font-semibold text-[#1A1A1A] mt-4">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
};

const WhySection = () => {
  return (
    <section className="px-6 py-16 bg-[#FFFBF5]">
      <h2 className="text-3xl font-bold text-center text-[#1B4332]">Why Choose Orzino</h2>
      <p className="text-center text-gray-500 mt-3 max-w-lg mx-auto">
        Har cup mein freshness ka promise — yahi hai wajah
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 max-w-5xl mx-auto">
        {points.map((p, i) => (
          <WhyCard key={p.title} icon={p.icon} title={p.title} desc={p.desc} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
};

export default WhySection;