"use client";
import React from "react";
import Link from "next/link";
import { Product } from "../products";

const ProductCard = ({ product }: { product?: Product }) => {
  if (!product) return null;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {product.onSale && (
            <span className="bg-[#F4623A] text-white text-xs font-semibold px-2.5 py-1 rounded">SALE</span>
          )}
          {product.isNew && (
            <span className="bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-2.5 py-1 rounded">NEW!</span>
          )}
        </div>
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-[#1A1A1A]">{product.name}</h3>
        <p className="text-sm text-[#40916C] mt-0.5">{product.brand}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-[#1A1A1A]">₹{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>
          )}
          {discountPercent && <span className="text-xs text-[#F4623A] font-medium">{discountPercent}% OFF</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;