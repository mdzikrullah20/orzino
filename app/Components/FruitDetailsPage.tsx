"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, Share2, Banknote } from "lucide-react";
import { Product } from "../products";
import { useCart } from "./CartContext";

const FruitDetailsPage = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
  const [added, setAdded] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 flex items-center gap-2 mb-8">
        <Link href="/" className="hover:text-[#40916C]">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#40916C]">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#1A1A1A]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-8">
        {/* Thumbnails */}
        <div className="order-2 md:order-1 flex md:flex-col gap-3">
          <button className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#40916C]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </button>
        </div>

        {/* Main image */}
        <div className="order-1 md:order-2 rounded-2xl overflow-hidden bg-[#FFFBF5]">
          <img src={product.image} alt={product.name} className="w-full h-[420px] object-cover" />
        </div>

        {/* Info */}
        <div className="order-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {product.isNew && (
                <span className="bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-2.5 py-1 rounded">NEW!</span>
              )}
              {product.onSale && (
                <span className="bg-[#F4623A] text-white text-xs font-semibold px-2.5 py-1 rounded">SALE</span>
              )}
            </div>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 hover:border-[#40916C] transition-colors">
              <Share2 size={14} />
              Share this product
            </button>
          </div>

          <h1 className="text-3xl font-bold text-[#1A1A1A] mt-4">{product.name}</h1>
          <p className="text-[#40916C] mt-1">{product.brand}</p>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-[#1A1A1A]">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>
            )}
            {discountPercent && <span className="text-[#F4623A] font-semibold">{discountPercent}% OFF</span>}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-lg font-medium border transition-colors duration-300 ${
                added
                  ? "bg-[#1B4332] text-white border-[#1B4332]"
                  : "border-gray-300 text-[#1A1A1A] hover:border-[#40916C]"
              }`}
            >
              {added ? "Added ✓" : "ADD TO CART"}
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full mt-4 bg-[#F4623A] text-white py-3.5 rounded-lg font-semibold hover:bg-[#e0532c] transition-colors duration-300"
          >
            » BUY NOW
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-2">Pay Securely Using:</p>
            <span className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-[#1A1A1A]">
              <Banknote size={16} />
              Cash On Delivery
            </span>
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-gray-100 pt-6">
            <div className="flex gap-6 border-b border-gray-100">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "description"
                    ? "text-[#1A1A1A] border-b-2 border-[#40916C]"
                    : "text-gray-400 hover:text-[#1A1A1A]"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "specifications"
                    ? "text-[#1A1A1A] border-b-2 border-[#40916C]"
                    : "text-gray-400 hover:text-[#1A1A1A]"
                }`}
              >
                Specifications
              </button>
            </div>

            {activeTab === "description" ? (
              <div className="mt-5">
                <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
                <p className="text-sm font-medium text-[#1A1A1A] mt-5 mb-2">Key Features</p>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-[#40916C]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-5 text-sm text-gray-500">
                <p>Category: {product.category}</p>
                <p className="mt-1">Brand: {product.brand}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitDetailsPage;