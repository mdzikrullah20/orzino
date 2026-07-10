"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import { useReveal } from "../Hooks";

const NewsletterSection = () => {
  const { ref, visible } = useReveal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    // TODO: wire up to real newsletter API
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="px-6 py-16 max-w-3xl mx-auto text-center">
      <div className={`reveal ${visible ? "show" : ""}`}>
        <div className="w-12 h-12 mx-auto rounded-full bg-[#F4623A]/10 flex items-center justify-center">
          <Mail size={22} className="text-[#F4623A]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1B4332] mt-4">Get Discounts & Updates</h2>
        <p className="text-gray-500 mt-2">Subscribe for seasonal offers and new fruit drops</p>

        {submitted ? (
          <p className="mt-6 text-[#40916C] font-medium">Thanks for subscribing! 🍊</p>
        ) : (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#40916C]/40"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#40916C] text-white px-7 py-3 rounded-full font-medium hover:bg-[#1B4332] transition-colors duration-300"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;