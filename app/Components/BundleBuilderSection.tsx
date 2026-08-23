'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, X, Send } from 'lucide-react';

const WHATSAPP_PHONE_NUMBER = "918757726925"; // अपना WhatsApp नंबर यहाँ सेट करें
const STORE_NAME = "ORZINO Freeze Dried Fruits";

interface Product {
  id: number;
  name: string;
  category: string;
  price250: number;
  price500: number;
  img: string;
  badge?: string;
}

interface BundleSlotItem {
  id: number;
  name: string;
  selectedWeight: '250 gm' | '500 gm';
  price: number;
  img: string;
}

const products: Product[] = [
  { id: 1, name: 'Pineapple Slices', category: 'Fruit Cubes', price250: 149, price500: 280, img: '/images/pineappleB.jpeg', badge: 'Best Seller' },
  { id: 2, name: 'MANGO SLICES', category: 'Crispy Slices', price250: 149, price500: 280, img: '/images/mango.jpeg', badge: 'Popular' },
  { id: 3, name: 'Banana Chips', category: 'Jars', price250: 149, price500: 280, img: '/images/banana.jpeg', badge: 'Trending' },
  { id: 4, name: 'MANGO SLICES', category: 'Fruit Cubes', price250: 129, price500: 240, img: '/images/mango.jpeg' },
  { id: 5, name: 'Apple Chips', category: 'Fruit Cubes', price250: 149, price500: 280, img: '/images/apple.jpeg' },
  { id: 6, name: 'Guava Cubes', category: 'Crispy Slices', price250: 139, price500: 260, img: '/images/guava.jpeg' },
  { id: 7, name: 'Strawberry Cubes', category: 'Crispy Slices', price250: 159, price500: 290, img: '/images/strawberry.jpeg' },
];

const BUNDLE_SLOTS_COUNT = 8;
const categories = ['All', 'Fruit Cubes', 'Crispy Slices', 'Jars'];

export default function BundleBuilderSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWeights, setSelectedWeights] = useState<{ [key: number]: '250 gm' | '500 gm' }>({});
  const [bundle, setBundle] = useState<(BundleSlotItem | null)[]>(
    Array(BUNDLE_SLOTS_COUNT).fill(null)
  );

  const handleWeightChange = (productId: number, weight: '250 gm' | '500 gm') => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleAddProduct = (product: Product) => {
    const freeSlotIndex = bundle.findIndex((slot) => slot === null);
    if (freeSlotIndex !== -1) {
      const activeWeight = selectedWeights[product.id] || '250 gm';
      const activePrice = activeWeight === '250 gm' ? product.price250 : product.price500;

      const itemToAdd: BundleSlotItem = {
        id: product.id,
        name: product.name,
        selectedWeight: activeWeight,
        price: activePrice,
        img: product.img,
      };

      const updatedBundle = [...bundle];
      updatedBundle[freeSlotIndex] = itemToAdd;
      setBundle(updatedBundle);
    } else {
      alert('Your 8-Pack Bundle is full! Remove an item to add a new one.');
    }
  };

  const handleRemoveSlot = (index: number) => {
    const updatedBundle = [...bundle];
    updatedBundle[index] = null;
    setBundle(updatedBundle);
  };

  const filledSlots = useMemo(() => bundle.filter((item): item is BundleSlotItem => item !== null), [bundle]);
  const totalAmount = useMemo(() => filledSlots.reduce((sum, item) => sum + item.price, 0), [filledSlots]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => selectedCategory === 'All' || p.category === selectedCategory);
  }, [selectedCategory]);

  // Direct WhatsApp Redirect Function
  const handleDirectWhatsAppCheckout = () => {
    if (filledSlots.length === 0) return;

    const tax = Math.round(totalAmount * 0.05);
    const totalWithTax = totalAmount + tax;

    let message = `🧾 *CUSTOM BUNDLE ORDER - ${STORE_NAME}*\n\n`;
    message += `📦 *Selected Bundle Items (${filledSlots.length}/${BUNDLE_SLOTS_COUNT}):*\n`;
    filledSlots.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (${item.selectedWeight}) - ₹${item.price}\n`;
    });
    message += `\n💰 *Subtotal:* ₹${totalAmount}\n`;
    message += `🏛 *GST (5%):* ₹${tax}\n`;
    message += `💵 *Total Payable:* ₹${totalWithTax}\n`;
    message += `------------------------------\n`;
    message += `Please confirm my order!`;

    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="w-full bg-[#F0EAE0] py-12 sm:py-16 px-4 sm:px-8 select-none">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <span className="text-[#8B3A1A] text-xs font-bold uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-200">
            Build Your Own Pack
          </span>
          <h2 className="text-[32px] sm:text-[48px] font-black text-[#181410] uppercase tracking-wide leading-none mt-2">
            CREATE YOUR CUSTOM BUNDLE
          </h2>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          
          {/* ================= LEFT COLUMN: PRODUCTS SELECTOR ================= */}
          <div className="bg-[#FFF8F0] rounded-[24px] p-4 sm:p-6 shadow-xl border border-[#EDD9C0]">
            
            {/* Category Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-[#EDD9C0]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-extrabold text-[11px] uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#181410] text-[#FFC300] shadow-md'
                      : 'bg-white border border-gray-200 text-[#181410] hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.slice(0, 6).map((product) => {
                const activeWeight = selectedWeights[product.id] || '250 gm';
                const activePrice = activeWeight === '250 gm' ? product.price250 : product.price500;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#EDD9C0] p-2.5 sm:p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F5EAD8]">
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Weight Selector */}
                      <div className="mt-2.5 flex flex-col items-start text-left">
                        <h4 className="font-bold text-[12px] sm:text-[14px] text-[#8B2E08] line-clamp-1">
                          {product.name}
                        </h4>

                        <div className="flex items-center gap-1 mt-1.5">
                          <button
                            type="button"
                            onClick={() => handleWeightChange(product.id, '250 gm')}
                            className={`px-1.5 py-0.5 rounded border font-bold text-[9px] transition-colors cursor-pointer ${
                              activeWeight === '250 gm'
                                ? 'border-[#8B3A1A] bg-[#8B3A1A] text-white'
                                : 'border-[#D4B896] bg-white text-[#5C3A1E] hover:bg-[#F5E6D0]'
                            }`}
                          >
                            250g
                          </button>

                          <button
                            type="button"
                            onClick={() => handleWeightChange(product.id, '500 gm')}
                            className={`px-1.5 py-0.5 rounded border font-bold text-[9px] transition-colors cursor-pointer ${
                              activeWeight === '500 gm'
                                ? 'border-[#8B3A1A] bg-[#8B3A1A] text-white'
                                : 'border-[#D4B896] bg-white text-[#5C3A1E] hover:bg-[#F5E6D0]'
                            }`}
                          >
                            500g
                          </button>
                        </div>

                        <span className="font-bold text-[#B74418] text-[12px] sm:text-[14px] mt-1.5">
                          ₹{activePrice}/-
                        </span>
                      </div>
                    </div>

                    {/* Add Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddProduct(product)}
                      className="mt-2.5 w-full py-2 bg-[#8B3A1A] hover:bg-[#7A2E12] text-white rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm cursor-pointer transition-colors"
                    >
                      <span>ADD</span>
                      <Plus size={12} strokeWidth={3} />
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: BUNDLE SLOTS GRID ================= */}
          <div className="bg-[#FFC300] rounded-[24px] p-5 sm:p-6 shadow-2xl border-2 border-white sticky top-6">
            
            <div className="flex items-center justify-between mb-4 border-b border-[#181410]/10 pb-3">
              <div>
                <h3 className="text-2xl font-black text-[#181410] uppercase tracking-wide leading-tight">
                  YOUR BUNDLE
                </h3>
                <span className="text-xs font-bold text-[#181410]/80">
                  {filledSlots.length} of {BUNDLE_SLOTS_COUNT} slots filled
                </span>
              </div>

              {filledSlots.length > 0 && (
                <button
                  onClick={() => setBundle(Array(BUNDLE_SLOTS_COUNT).fill(null))}
                  className="text-[11px] font-bold text-[#E8115B] hover:underline uppercase cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 8 Slot Container */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-6">
              {bundle.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-[14px] bg-white/80 border-2 border-dashed border-[#181410]/20 flex items-center justify-center overflow-hidden shadow-inner"
                >
                  <AnimatePresence mode="wait">
                    {item ? (
                      <motion.div
                        key={`filled-${index}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => handleRemoveSlot(index)}
                        className="relative w-full h-full p-1 flex flex-col items-center justify-center cursor-pointer group bg-white"
                        title="Click to remove"
                      >
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover p-0.5 rounded-lg group-hover:opacity-30 transition-opacity"
                        />

                        {/* Weight Badge */}
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[8px] font-extrabold px-1 rounded">
                          {item.selectedWeight}
                        </span>

                        {/* Remove Overlay */}
                        <div className="absolute inset-0 bg-red-600/80 rounded-[12px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                          <X size={16} />
                          <span className="text-[8px] font-bold uppercase mt-0.5">Remove</span>
                        </div>
                      </motion.div>
                    ) : (
                      <span className="font-mono font-black text-gray-400 text-sm sm:text-base">
                        {index + 1}
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Price Footer */}
            <div className="bg-white rounded-[18px] p-4 shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  YOUR TOTAL:
                </span>
                <span className="font-mono font-black text-2xl text-[#181410]">
                  ₹{totalAmount}/-
                </span>
              </div>

              {/* Directly Opens WhatsApp */}
              <motion.button
                whileHover={{ scale: filledSlots.length > 0 ? 1.02 : 1 }}
                whileTap={{ scale: filledSlots.length > 0 ? 0.98 : 1 }}
                disabled={filledSlots.length === 0}
                onClick={handleDirectWhatsAppCheckout}
                className={`w-full py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors ${
                  filledSlots.length > 0
                    ? 'bg-[#181410] text-white hover:bg-[#8B3A1A] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={15} />
                <span>
                  {filledSlots.length === BUNDLE_SLOTS_COUNT
                    ? 'Submit'
                    : `Submit (${filledSlots.length}/${BUNDLE_SLOTS_COUNT})`}
                </span>
              </motion.button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}