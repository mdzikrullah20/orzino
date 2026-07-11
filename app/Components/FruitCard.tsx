"use client";
import React from "react";
import { Star, Check } from "lucide-react";
import { useReveal } from "../Hooks";
import { useCart } from "./CartContext";

export type Fruit = {
  name: string;
  image: string;
  price: string;
  rating: number;
  tag: string | null;
};

const FruitCard = ({ fruit, delay }: { fruit: Fruit; delay: number }) => {
  const { ref, visible } = useReveal();
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const id = fruit.name.toLowerCase().replace(/\s+/g, "-");
  const priceNumber = parseInt(fruit.price.replace(/[^\d]/g, ""), 10);

  const handleAdd = () => {
    addToCart({ id, name: fruit.name, price: priceNumber, image: fruit.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}s` }}
      className={`reveal ${visible ? "show" : ""} group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300`}
    >
      <div className="relative overflow-hidden">
        <img
          src={fruit.image}
          alt={fruit.name}
          className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {fruit.tag && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${
              fruit.tag === "Bestseller" ? "bg-[#F4623A]" : "bg-[#40916C]"
            }`}
          >
            {fruit.tag}
          </span>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-[#1A1A1A]">
          <Star size={12} className="fill-[#FFB347] text-[#FFB347]" />
          {fruit.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#1A1A1A]">{fruit.name}</h3>
        <p className="text-[#F4623A] font-bold mt-2">{fruit.price}</p>
        <button
          onClick={handleAdd}
          className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 ${
            added ? "bg-[#1B4332] text-white" : "bg-[#40916C] text-white hover:bg-[#1B4332]"
          }`}
        >
          {added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            "Add To Cart"
          )}
        </button>
      </div>
    </div>
  );
};

export default FruitCard;