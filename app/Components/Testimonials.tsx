"use client";
import { Star } from "lucide-react";
import { useReveal } from "../Hooks";

const reviews = [
  { name: "Ananya S.", city: "Bhopal", rating: 5, text: "Fruits taste like they were cut minutes ago. Delivery is always on time." },
  { name: "Rohit K.", city: "Indore", rating: 5, text: "Mixed fruit cup is my daily breakfast now. Clean packaging, no mess." },
  { name: "Priya M.", city: "Bhopal", rating: 4, text: "Great quality overall, wish there were more combo options." },
];

const Testimonials = () => {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="px-6 py-16 bg-[#FFFBF5]">
      <h2 className="text-3xl font-bold text-center text-[#1B4332]">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
        {reviews.map((review, i) => (
          <div
            key={review.name}
            style={{ animationDelay: `${i * 0.1}s` }}
            className={`reveal ${visible ? "show" : ""} bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={16}
                  className={idx < review.rating ? "fill-[#FFB347] text-[#FFB347]" : "text-gray-200"}
                />
              ))}
            </div>
            <p className="text-gray-600 mt-4 text-sm">{review.text}</p>
            <p className="font-semibold text-[#1A1A1A] mt-4">{review.name}</p>
            <p className="text-xs text-gray-400">{review.city}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;