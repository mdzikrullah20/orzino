"use client";
import { useReveal } from "../Hooks";

const seasonal = [
  { name: "Mango Season", image: "https://images.unsplash.com/photo-1553279768-865429fa0078", tag: "Peak Season" },
  { name: "Strawberry", image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba", tag: "Limited Time" },
  { name: "Watermelon", image: "https://images.unsplash.com/photo-1563114773-84221bd62daa", tag: "Summer Pick" },
  { name: "Other Fresh Fruits", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf", tag: "Explore All" },
];

const SeasonalFruits = () => {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="px-6 py-16 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-3xl font-bold text-[#1B4332]">What's in Season</h2>
        <a href="/products?category=seasonal" className="text-[#F4623A] font-medium hover:underline">
          View all →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
        {seasonal.map((item, i) => (
          <div
            key={item.name}
            style={{ animationDelay: `${i * 0.1}s` }}
            className={`reveal ${visible ? "show" : ""} relative rounded-2xl overflow-hidden h-56 group cursor-pointer`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute top-3 left-3 bg-[#F4623A] text-white text-xs font-medium px-3 py-1 rounded-full">
              {item.tag}
            </span>
            <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeasonalFruits;