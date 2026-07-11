"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

const CartButton = () => {
  const { totalItems, openDrawer } = useCart();
  return (
    <button onClick={openDrawer} className="relative text-[#1B4332] hover:text-[#F4623A] transition-colors duration-200">
      <ShoppingBag size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#F4623A] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;