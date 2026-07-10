"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useReveal } from "../Hooks";
import CategorySection from "./CategorySection";
import HowItWorks from "./HowItWorks";
import OrderTrackingBanner from "./OrderTrackingBanner";
import SeasonalFruits from "./SeasonalFruits";
import Testimonials from "./Testimonials";
import WhatsAppSection from "./WhatsAppSection";
import NewsletterSection from "./NewsletterSection";
import WhySection from "./WhySection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";

const fruits = [
  { name: "Fresh Mango", image: "https://images.unsplash.com/photo-1553279768-865429fa0078", price: "₹80 / Cup" },
  { name: "Watermelon", image: "https://images.unsplash.com/photo-1563114773-84221bd62daa", price: "₹50 / Cup" },
  { name: "Pineapple", image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1", price: "₹70 / Cup" },
  { name: "Mixed Fruit Cup", image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e", price: "₹100 / Cup" },
];

const FruitCard = ({ fruit, delay }: { fruit: (typeof fruits)[number]; delay: number }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}s` }}
      className={`reveal ${visible ? "show" : ""} bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300`}
    >
      <img src={fruit.image} alt={fruit.name} className="h-48 w-full object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#1A1A1A]">{fruit.name}</h3>
        <p className="text-[#F4623A] font-bold mt-2">{fruit.price}</p>
        <button className="mt-4 w-full bg-[#40916C] text-white py-2 rounded-lg hover:bg-[#1B4332] transition-colors duration-300">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const hero = useReveal();
  const router = useRouter();

  return (
    <div className="bg-white overflow-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal { opacity: 0; }
        .reveal.show { animation: fadeUp 0.7s ease-out forwards; }
      `}</style>

      {/* Hero */}
      <section
        ref={hero.ref}
        className="bg-gradient-to-br from-[#FFF8ED] to-[#FFEFE0] px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between"
      >
        <div className={`md:w-1/2 reveal ${hero.visible ? "show" : ""}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] leading-tight">
            Fresh Cut Fruits, <span className="text-[#F4623A]">Delivered</span> Fresh 🍊
          </h1>
          <p className="mt-5 text-gray-600 text-lg max-w-md">
            Enjoy healthy and hygienic fruit cups prepared daily with fresh seasonal fruits.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <button className="cursor-pointer bg-[#40916C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1B4332] transition-colors duration-300">
              Order Now
            </button>
            <button
              onClick={() => router.push("/track-order")}
              className="cursor-pointer border-2 border-[#1B4332] text-[#1B4332] px-8 py-3 rounded-full font-medium hover:bg-[#1B4332] hover:text-white transition-colors duration-300"
            >
              Track Order
            </button>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea"
          alt="Fresh Fruits"
          style={{ animationDelay: "0.15s" }}
          className={`mt-10 md:mt-0 w-full md:w-96 rounded-3xl shadow-xl reveal ${hero.visible ? "show" : ""}`}
        />
      </section>

      {/* <CategorySection /> */}

      {/* Featured Products */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B4332]">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {fruits.map((fruit, index) => (
            <FruitCard key={fruit.name} fruit={fruit} delay={index * 0.1} />
          ))}
        </div>
      </section>

      <WhySection />
      <HowItWorks />
      <OrderTrackingBanner />
      <SeasonalFruits />
      <Testimonials />
      {/* <WhatsAppSection /> */}
      <NewsletterSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default HomePage;