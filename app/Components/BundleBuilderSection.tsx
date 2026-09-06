'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, X, Send } from 'lucide-react';

const WHATSAPP_PHONE_NUMBER = "918757726925";
const STORE_NAME = "ORZINO Freeze Dried Fruits";

interface Product {
  id: number;
  name: string;
  category: string;
  price250: number;
  price500: number;
  img: string;
  badge?: string;
  isComingSoon?: boolean;
}

interface BundleSlotItem {
  id: number;
  name: string;
  selectedWeight: '250 gm' | '500 gm';
  price: number;
  img: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Pineapple Slices',
    category: 'Fruit Cubes',
    price250: 149,
    price500: 280,
    img: '/images/newPineapple.jpeg',
    badge: 'Best Seller',
    isComingSoon: false,
  },
  {
    id: 2,
    name: 'MANGO SLICES',
    category: 'Crispy Slices',
    price250: 149,
    price500: 280,
    img: '/images/newMango.jpeg',
    badge: 'Popular',
    isComingSoon: false,
  },
  {
    id: 3,
    name: 'Banana Chips',
    category: 'Jars',
    price250: 149,
    price500: 280,
    img: '/images/banana.jpeg',
    badge: 'Trending',
    isComingSoon: true,
  },
  {
    id: 5,
    name: 'Apple Chips',
    category: 'Fruit Cubes',
    price250: 149,
    price500: 280,
    img: '/images/apple.jpeg',
    isComingSoon: true,
  },
  {
    id: 6,
    name: 'Guava Cubes',
    category: 'Crispy Slices',
    price250: 139,
    price500: 260,
    img: '/images/guava.jpeg',
    isComingSoon: true,
  },
  {
    id: 7,
    name: 'Strawberry Cubes',
    category: 'Crispy Slices',
    price250: 159,
    price500: 290,
    img: '/images/strawberry.jpeg',
    isComingSoon: true,
  },
];

const BUNDLE_SLOTS_COUNT = 8;

const categories = [
  'All',
  'Fruit Cubes',
  'Crispy Slices',
  'Jars',
];

export default function BundleBuilderSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All');

  const [selectedWeights, setSelectedWeights] = useState<{
    [key: number]: '250 gm' | '500 gm';
  }>({});

  const [bundle, setBundle] = useState<
    (BundleSlotItem | null)[]
  >(Array(BUNDLE_SLOTS_COUNT).fill(null));

  // ================================
  // WEIGHT CHANGE
  // ================================
  const handleWeightChange = (
    productId: number,
    weight: '250 gm' | '500 gm'
  ) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [productId]: weight,
    }));
  };

  // ================================
  // ADD PRODUCT
  // ================================
  const handleAddProduct = (product: Product) => {
    // Coming Soon products cannot be added
    if (product.isComingSoon) return;

    const freeSlotIndex = bundle.findIndex(
      (slot) => slot === null
    );

    if (freeSlotIndex !== -1) {
      const activeWeight =
        selectedWeights[product.id] || '250 gm';

      const activePrice =
        activeWeight === '250 gm'
          ? product.price250
          : product.price500;

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
      alert(
        'Your 8-Pack Bundle is full! Remove an item to add a new one.'
      );
    }
  };

  // ================================
  // REMOVE PRODUCT
  // ================================
  const handleRemoveSlot = (index: number) => {
    const updatedBundle = [...bundle];

    updatedBundle[index] = null;

    setBundle(updatedBundle);
  };

  // ================================
  // FILLED SLOTS
  // ================================
  const filledSlots = useMemo(
    () =>
      bundle.filter(
        (item): item is BundleSlotItem =>
          item !== null
      ),
    [bundle]
  );

  // ================================
  // TOTAL AMOUNT
  // ================================
  const totalAmount = useMemo(
    () =>
      filledSlots.reduce(
        (sum, item) => sum + item.price,
        0
      ),
    [filledSlots]
  );

  // ================================
  // FILTER PRODUCTS
  // ================================
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        selectedCategory === 'All' ||
        p.category === selectedCategory
    );
  }, [selectedCategory]);

  // ================================
  // WHATSAPP CHECKOUT
  // ================================
  const handleDirectWhatsAppCheckout = () => {
    if (filledSlots.length === 0) return;

    const tax = Math.round(totalAmount * 0.05);

    const totalWithTax = totalAmount + tax;

    let message =
      `🧾 *CUSTOM BUNDLE ORDER - ${STORE_NAME}*\n\n`;

    message +=
      `📦 *Selected Bundle Items (${filledSlots.length}/${BUNDLE_SLOTS_COUNT}):*\n`;

    filledSlots.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (${item.selectedWeight}) - ₹${item.price}\n`;
    });

    message += `\n💰 *Subtotal:* ₹${totalAmount}\n`;

    message += `🏛 *GST (5%):* ₹${tax}\n`;

    message += `💵 *Total Payable:* ₹${totalWithTax}\n`;

    message += `------------------------------\n`;

    message += `Please confirm my order!`;

    window.open(
      `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      '_blank'
    );
  };

  return (
    <section className="w-full bg-[#F0EAE0] py-12 sm:py-16 px-4 sm:px-8 select-none">
      <div className="max-w-[1280px] mx-auto">

        {/* ================================
            SECTION HEADING
        ================================= */}
        <div className="text-center mb-8">

          <span className="text-[#8B3A1A] text-xs font-bold uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-200">
            Build Your Own Pack
          </span>

          <h2 className="text-[32px] sm:text-[48px] font-black text-[#181410] uppercase tracking-wide leading-none mt-2">
            CREATE YOUR CUSTOM BUNDLE
          </h2>

        </div>

        {/* ================================
            MAIN LAYOUT
        ================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">

          {/* ================================
              LEFT COLUMN
          ================================= */}
          <div className="bg-[#FFF8F0] rounded-[24px] p-4 sm:p-6 shadow-xl border border-[#EDD9C0]">

            {/* CATEGORY FILTER */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-[#EDD9C0]">

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(cat)
                  }
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

            {/* ================================
                PRODUCT GRID
            ================================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">

              {filteredProducts
                .slice(0, 6)
                .map((product) => {

                  const activeWeight =
                    selectedWeights[product.id] ||
                    '250 gm';

                  const activePrice =
                    activeWeight === '250 gm'
                      ? product.price250
                      : product.price500;

                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl border border-[#EDD9C0] p-2.5 sm:p-3 flex flex-col justify-between shadow-sm transition-shadow relative overflow-hidden ${
                        product.isComingSoon
                          ? 'opacity-95'
                          : 'hover:shadow-md'
                      }`}
                    >

                      <div>

                        {/* ================================
                            PRODUCT IMAGE
                        ================================= */}
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F5EAD8]">

                          <Image
                            src={product.img}
                            alt={product.name}
                            fill
                            unoptimized
                            className={`object-cover ${
                              product.isComingSoon
                                ? 'brightness-[0.55]'
                                : ''
                            }`}
                          />

                          {/* COMING SOON OVERLAY */}
                          {product.isComingSoon && (
                            <>
                              <div className="absolute inset-0 bg-black/20" />

                              <div className="absolute inset-0 flex items-center justify-center">

                                <div className="bg-[#181410]/90 backdrop-blur-sm text-white px-3 py-2 rounded-full shadow-xl flex items-center gap-2">

                                  <span className="w-2 h-2 rounded-full bg-[#FFC300] animate-pulse" />

                                  <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-wider">
                                    Coming Soon
                                  </span>

                                </div>

                              </div>
                            </>
                          )}

                          {/* BADGE */}
                          {product.badge &&
                            !product.isComingSoon && (
                              <div className="absolute top-2 left-2 bg-[#FFC300] text-[#181410] px-2 py-1 rounded-full text-[8px] font-black uppercase">
                                {product.badge}
                              </div>
                            )}

                        </div>

                        {/* ================================
                            PRODUCT INFO
                        ================================= */}
                        <div className="mt-2.5 flex flex-col items-start text-left">

                          <h4 className="font-bold text-[12px] sm:text-[14px] text-[#8B2E08] line-clamp-1">
                            {product.name}
                          </h4>

                          {/* WEIGHT BUTTONS */}
                          <div className="flex items-center gap-1 mt-1.5">

                            <button
                              type="button"
                              disabled={product.isComingSoon}
                              onClick={() =>
                                handleWeightChange(
                                  product.id,
                                  '250 gm'
                                )
                              }
                              className={`px-1.5 py-0.5 rounded border font-bold text-[9px] transition-colors ${
                                product.isComingSoon
                                  ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : activeWeight === '250 gm'
                                  ? 'border-[#8B3A1A] bg-[#8B3A1A] text-white cursor-pointer'
                                  : 'border-[#D4B896] bg-white text-[#5C3A1E] hover:bg-[#F5E6D0] cursor-pointer'
                              }`}
                            >
                              250g
                            </button>

                            <button
                              type="button"
                              disabled={product.isComingSoon}
                              onClick={() =>
                                handleWeightChange(
                                  product.id,
                                  '500 gm'
                                )
                              }
                              className={`px-1.5 py-0.5 rounded border font-bold text-[9px] transition-colors ${
                                product.isComingSoon
                                  ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : activeWeight === '500 gm'
                                  ? 'border-[#8B3A1A] bg-[#8B3A1A] text-white cursor-pointer'
                                  : 'border-[#D4B896] bg-white text-[#5C3A1E] hover:bg-[#F5E6D0] cursor-pointer'
                              }`}
                            >
                              500g
                            </button>

                          </div>

                          {/* PRICE */}
                          <span
                            className={`font-bold text-[12px] sm:text-[14px] mt-1.5 ${
                              product.isComingSoon
                                ? 'text-gray-400'
                                : 'text-[#B74418]'
                            }`}
                          >
                            ₹{activePrice}/-
                          </span>

                        </div>
                      </div>

                      {/* ================================
                          ADD BUTTON
                      ================================= */}
                      <motion.button
                        whileHover={
                          product.isComingSoon
                            ? undefined
                            : { scale: 1.02 }
                        }
                        whileTap={
                          product.isComingSoon
                            ? undefined
                            : { scale: 0.98 }
                        }
                        disabled={product.isComingSoon}
                        onClick={() =>
                          handleAddProduct(product)
                        }
                        className={`mt-2.5 w-full py-2 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm transition-colors ${
                          product.isComingSoon
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#8B3A1A] hover:bg-[#7A2E12] text-white cursor-pointer'
                        }`}
                      >
                        <span>
                          {product.isComingSoon
                            ? 'COMING SOON'
                            : 'ADD'}
                        </span>

                        {!product.isComingSoon && (
                          <Plus
                            size={12}
                            strokeWidth={3}
                          />
                        )}
                      </motion.button>

                    </div>
                  );
                })}

            </div>
          </div>

          {/* ================================
              RIGHT COLUMN
          ================================= */}
          <div className="bg-[#FFC300] rounded-[24px] p-5 sm:p-6 shadow-2xl border-2 border-white sticky top-6">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4 border-b border-[#181410]/10 pb-3">

              <div>

                <h3 className="text-2xl font-black text-[#181410] uppercase tracking-wide leading-tight">
                  YOUR BUNDLE
                </h3>

                <span className="text-xs font-bold text-[#181410]/80">
                  {filledSlots.length} of{' '}
                  {BUNDLE_SLOTS_COUNT} slots filled
                </span>

              </div>

              {filledSlots.length > 0 && (
                <button
                  onClick={() =>
                    setBundle(
                      Array(BUNDLE_SLOTS_COUNT).fill(null)
                    )
                  }
                  className="text-[11px] font-bold text-[#E8115B] hover:underline uppercase cursor-pointer"
                >
                  Clear All
                </button>
              )}

            </div>

            {/* ================================
                8 SLOTS
            ================================= */}
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
                        initial={{
                          scale: 0,
                          opacity: 0,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        exit={{
                          scale: 0,
                          opacity: 0,
                        }}
                        onClick={() =>
                          handleRemoveSlot(index)
                        }
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

                        {/* WEIGHT BADGE */}
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[8px] font-extrabold px-1 rounded">
                          {item.selectedWeight}
                        </span>

                        {/* REMOVE OVERLAY */}
                        <div className="absolute inset-0 bg-red-600/80 rounded-[12px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">

                          <X size={16} />

                          <span className="text-[8px] font-bold uppercase mt-0.5">
                            Remove
                          </span>

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

            {/* ================================
                PRICE FOOTER
            ================================= */}
            <div className="bg-white rounded-[18px] p-4 shadow-md flex flex-col gap-3">

              <div className="flex items-center justify-between">

                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  YOUR TOTAL:
                </span>

                <span className="font-mono font-black text-2xl text-[#181410]">
                  ₹{totalAmount}/-
                </span>

              </div>

              {/* ================================
                  WHATSAPP BUTTON
              ================================= */}
              <motion.button
                whileHover={{
                  scale:
                    filledSlots.length > 0
                      ? 1.02
                      : 1,
                }}
                whileTap={{
                  scale:
                    filledSlots.length > 0
                      ? 0.98
                      : 1,
                }}
                disabled={filledSlots.length === 0}
                onClick={
                  handleDirectWhatsAppCheckout
                }
                className={`w-full py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors ${
                  filledSlots.length > 0
                    ? 'bg-[#181410] text-white hover:bg-[#8B3A1A] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >

                <Send size={15} />

                <span>
                  {filledSlots.length ===
                  BUNDLE_SLOTS_COUNT
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