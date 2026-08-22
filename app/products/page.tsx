"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Heart, Star, Sparkles, Filter, Clock,
  Plus, Minus, X, Check, PackagePlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Review = { id: string; author: string; rating: number; comment: string; date: string; };
type Product = { id: number; name: string; category: string; image: string; price: number; originalPrice: number; rating: number; weight: string; badge?: string; isSale?: boolean; offerEndsAt?: string; reviews: Review[]; };

const QUANTITY_DISCOUNT_TIERS = [
  { minQty: 5, discountPercent: 15 }, { minQty: 3, discountPercent: 10 },
  { minQty: 2, discountPercent: 5 }, { minQty: 1, discountPercent: 0 },
];
const getQuantityDiscountPercent = (qty: number) => QUANTITY_DISCOUNT_TIERS.find((t) => qty >= t.minQty)?.discountPercent ?? 0;

const initialProducts: Product[] = [
  { id: 1, name: "Pineapple Slices", category: "Fruit Cubes", image: "./images/pineappleB.jpeg", price: 99, originalPrice: 149, rating: 4.9, weight: "35g", badge: "Best Seller", isSale: true, offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), reviews: [{ id: "r1", author: "Aarav S.", rating: 5, comment: "Insanely crunchy!", date: "2 days ago" }, { id: "r2", author: "Pooja M.", rating: 4, comment: "Great healthy snack.", date: "1 week ago" }] },
  { id: 2, name: "MANGO SLICES", category: "Crispy Slices", image: "./images/mango.jpeg", price: 99, originalPrice: 139, rating: 4.8, weight: "40g", badge: "Popular", isSale: true, offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(), reviews: [{ id: "r3", author: "Rohan V.", rating: 5, comment: "Pure mango sweetness.", date: "3 days ago" }] },
  { id: 3, name: "Banana Chips", category: "Jars", image: "./images/banana.jpeg", price: 149, originalPrice: 199, rating: 4.9, weight: "50g", badge: "Trending", isSale: true, offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), reviews: [{ id: "r4", author: "Sneha K.", rating: 5, comment: "Amazing with yogurt.", date: "Yesterday" }] },
  { id: 4, name: "Pineapple Slices", category: "Pouches", image: "./images/pineapple.jpeg", price: 79, originalPrice: 119, rating: 4.7, weight: "30g", isSale: true, reviews: [] },
  { id: 5, name: "Apple Chips", category: "Fruit Cubes", image: "./images/apple.jpeg", price: 119, originalPrice: 159, rating: 4.8, weight: "35g", badge: "New", isSale: false, reviews: [] },
  { id: 6, name: "Guava Snacks", category: "Crispy Slices", image: "./images/guava.jpeg", price: 89, originalPrice: 129, rating: 4.6, weight: "45g", isSale: true, reviews: [] },
  { id: 7, name: "Strawberry Guac", category: "Pouches", image: "./images/strawberry.jpeg", price: 89, originalPrice: 120, rating: 4.7, weight: "40g", isSale: false, reviews: [] },
  // { id: 8, name: "PINEAPPLE BITES", category: "Crispy Slices", image: "./images/pineapple.jpeg", price: 109, originalPrice: 149, rating: 4.8, weight: "30g", isSale: true, reviews: [] },
];

const categories = ["All", "Fruit Cubes", "Crispy Slices", "Jars", "Pouches", "Combos"];

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, expired: false });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ hours: 0, minutes: 0, seconds: 0, expired: true }); return; }
      setTimeLeft({ hours: Math.floor(diff / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000), expired: false });
    };
    calc(); const iv = setInterval(calc, 1000); return () => clearInterval(iv);
  }, [targetDate]);
  if (timeLeft.expired) return null;
  return (
    <div className="flex items-center gap-1 bg-[#181410] text-[#FFC300] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
      <Clock size={10} className="text-[#E8115B]" />
      <span>{String(timeLeft.hours).padStart(2,"0")}h:{String(timeLeft.minutes).padStart(2,"0")}m:{String(timeLeft.seconds).padStart(2,"0")}s</span>
    </div>
  );
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [comboCart, setComboCart] = useState<Record<number, number>>({});
  const [isComboDrawerOpen, setIsComboDrawerOpen] = useState(false);
  const [activeReviewProduct, setActiveReviewProduct] = useState<Product | null>(null);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const toggleWishlist = (id: number) => setWishlist((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);
  const updateQuantity = (id: number, delta: number) => setQuantities((p) => ({ ...p, [id]: Math.max(1, (p[id] || 1) + delta) }));
  const toggleComboProduct = (product: Product) => setComboCart((p) => { if (p[product.id]) { const { [product.id]: _, ...r } = p; return r; } return { ...p, [product.id]: 1 }; });
  const updateComboQuantity = (id: number, delta: number) => setComboCart((p) => { const n = (p[id] || 0) + delta; if (n <= 0) { const { [id]: _, ...r } = p; return r; } return { ...p, [id]: n }; });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewProduct || !newReviewAuthor || !newReviewComment) return;
    const rev: Review = { id: Date.now().toString(), author: newReviewAuthor, comment: newReviewComment, rating: newReviewRating, date: "Just now" };
    setProductsList((p) => p.map((prod) => { if (prod.id !== activeReviewProduct.id) return prod; const reviews = [rev, ...prod.reviews]; return { ...prod, reviews, rating: Number((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)) }; }));
    setActiveReviewProduct((p) => p ? { ...p, reviews: [rev, ...p.reviews] } : null);
    setNewReviewAuthor(""); setNewReviewComment(""); setNewReviewRating(5);
  };

  const comboSummary = useMemo(() => {
    let totalItems = 0, originalTotal = 0, discountedTotal = 0;
    Object.entries(comboCart).forEach(([pId, qty]) => { const prod = productsList.find((p) => p.id === Number(pId)); if (prod) { totalItems += qty; originalTotal += prod.originalPrice * qty; discountedTotal += prod.price * qty; } });
    const comboBonusPercent = totalItems >= 3 ? 10 : 0;
    const finalPrice = Math.round(discountedTotal * (1 - comboBonusPercent / 100));
    return { totalItems, originalTotal, finalPrice, totalSavings: originalTotal - finalPrice, comboBonusPercent };
  }, [comboCart, productsList]);

  const filteredProducts = useMemo(() => productsList.filter((p) => (selectedCategory === "All" || p.category === selectedCategory) && p.name.toLowerCase().includes(search.toLowerCase())), [selectedCategory, search, productsList]);

  return (
    <div className="min-h-screen bg-[#F0EAE0] text-[#181410]">
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
          <Filter size={13} className="text-[#E8115B] shrink-0" />
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat ? "bg-[#181410] text-[#FFC300] border-[#181410]" : "bg-white border-gray-200 text-[#181410] hover:bg-[#FFC300]"
              }`}
            >{cat}</button>
          ))}
        </div>

        {/* ✅ 2-col grid — compact cards matching Image 1 */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 pb-24">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const qtyDiscountPct = getQuantityDiscountPercent(qty);
              const totalPrice = Math.round(product.price * (1 - qtyDiscountPct / 100) * qty);
              const isInCombo = (comboCart[product.id] || 0) > 0;
              const weight1 = product.weight;
              const weight2 = `${parseInt(product.weight) * 2}${product.weight.replace(/[0-9]/g, "")}`;

              return (
                <div key={product.id}
                  className="group relative bg-[#FFF8F0] rounded-2xl border border-[#EDD9C0] shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  {/* ✅ Square product image — like Image 1 */}
                  <Link href={`/products/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-[#F5EAD8] cursor-pointer">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    {/* Discount top-right */}
                    {product.isSale && discountPercent > 0 && (
                      <span className="absolute top-2 right-2 bg-white text-[#B74418] text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm z-10">
                        {discountPercent}% OFF
                      </span>
                    )}
                    {/* Wishlist bottom-right */}
                    <button type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                      className="absolute bottom-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Heart size={13} className={wishlist.includes(product.id) ? "fill-[#E8115B] text-[#E8115B]" : "text-[#9B6B4B]"} />
                    </button>
                  </Link>

                  {/* ✅ Card body — tight like Image 1 */}
                  <div className="flex flex-col flex-1 px-2.5 pt-2 pb-2.5 gap-1.5">

                    {/* Product name */}
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-[13px] sm:text-[14px] font-extrabold text-[#8B2E08] leading-tight line-clamp-2 group-hover:text-[#B74418]">
                        {product.name}
                      </h3>
                    </Link>

                    {/* ✅ Weight pills — exactly like Image 1: "250 gm  500 gm" style */}
                    <div className="flex gap-1.5 flex-wrap">
                      <button className="px-2.5 py-1 rounded-md border border-[#D4B896] bg-white text-[10px] font-bold text-[#5C3A1E] hover:bg-[#F5E6D0] transition-colors cursor-pointer">
                        {weight1}
                      </button>
                      <button className="px-2.5 py-1 rounded-md border border-[#D4B896] bg-white text-[10px] font-bold text-[#5C3A1E] hover:bg-[#F5E6D0] transition-colors cursor-pointer">
                        {weight2}
                      </button>
                    </div>

                    {/* Countdown if sale */}
                    {product.offerEndsAt && <CountdownTimer targetDate={product.offerEndsAt} />}

                    {/* ✅ Price — like Image 1: "₹192/-" bold, strikethrough small */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[15px] font-black text-[#B74418]">₹{totalPrice}/-</span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-gray-400 line-through font-semibold">₹{product.originalPrice * qty}</span>
                      )}
                    </div>

                    {qtyDiscountPct > 0 && (
                      <div className="flex items-center gap-1 text-[9px] font-extrabold text-green-700">
                        <Sparkles size={9} /> {qtyDiscountPct}% extra off
                      </div>
                    )}

                    {/* ✅ ADD button — full width, dark red, like Image 1 */}
                    <button type="button"
                      onClick={() => alert(`Added ${qty}x ${product.name} for ₹${totalPrice}!`)}
                      className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#8B3A1A] py-2.5 text-[12px] font-black uppercase tracking-wider text-white shadow-sm hover:bg-[#7A2E12] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      ADD <Plus size={13} strokeWidth={3} />
                    </button>

                    {/* Combo */}
                    <button type="button" onClick={() => toggleComboProduct(product)}
                      className={`w-full rounded-lg py-1.5 text-[9px] font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
                        isInCombo ? "bg-green-100 text-green-800 border border-green-300" : "bg-transparent text-[#9B6B4B] border border-[#DCC4AA] hover:bg-white"
                      }`}
                    >
                      {isInCombo
                        ? <span className="flex items-center justify-center gap-1"><Check size={9} /> In Combo</span>
                        : <span className="flex items-center justify-center gap-1"><Plus size={9} /> Add to Combo</span>
                      }
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-xl font-black uppercase text-[#181410]">No snacks found!</p>
            <button onClick={() => { setSelectedCategory("All"); setSearch(""); }} className="mt-4 px-6 py-2.5 bg-[#FFC300] text-[#181410] font-extrabold text-xs uppercase rounded-full">Reset Filters</button>
          </div>
        )}
      </section>

      {/* Combo Drawer */}
      <AnimatePresence>
        {isComboDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsComboDrawerOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col">
              <div className="p-5 border-b flex items-center justify-between">
                <div><h2 className="text-lg font-black uppercase">Custom Combo Box</h2><p className="text-xs text-gray-500">3+ items = extra 10% off!</p></div>
                <button onClick={() => setIsComboDrawerOpen(false)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
              </div>
              <div className="p-5 overflow-y-auto flex-grow space-y-3">
                {Object.keys(comboCart).length === 0 ? (
                  <div className="text-center py-10 text-gray-400"><PackagePlus size={40} className="mx-auto mb-2 opacity-50" /><p className="font-bold text-sm">Combo box is empty.</p></div>
                ) : Object.entries(comboCart).map(([idStr, qty]) => {
                  const item = productsList.find((p) => p.id === Number(idStr));
                  if (!item) return null;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Image src={item.image} alt={item.name} width={44} height={44} className="rounded-lg object-contain bg-white p-1" unoptimized />
                        <div><p className="font-bold text-xs line-clamp-1">{item.name}</p><p className="text-xs font-mono font-bold text-[#E8115B]">₹{item.price}</p></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateComboQuantity(item.id, -1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-200 cursor-pointer"><Minus size={11} /></button>
                        <span className="text-xs font-black w-4 text-center">{qty}</span>
                        <button onClick={() => updateComboQuantity(item.id, 1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-200 cursor-pointer"><Plus size={11} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-5 bg-gray-50 border-t">
                <div className="text-xs font-bold space-y-1.5 mb-4">
                  <div className="flex justify-between text-gray-500"><span>Original:</span><span className="line-through">₹{comboSummary.originalTotal}</span></div>
                  {comboSummary.comboBonusPercent > 0 && <div className="flex justify-between text-green-600"><span>Combo Bonus:</span><span>-10%</span></div>}
                  <div className="flex justify-between font-black text-sm border-t pt-2"><span>Final:</span><span className="text-[#E8115B]">₹{comboSummary.finalPrice}</span></div>
                  <p className="text-[10px] text-green-700">You save ₹{comboSummary.totalSavings}!</p>
                </div>
                <button disabled={comboSummary.totalItems === 0} onClick={() => { alert(`Combo added! ₹${comboSummary.finalPrice}`); setIsComboDrawerOpen(false); }} className="w-full py-3 rounded-full bg-[#FFC300] text-[#181410] font-black text-xs uppercase disabled:opacity-50 cursor-pointer">Add Combo (₹{comboSummary.finalPrice})</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {activeReviewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveReviewProduct(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b">
                <div><h3 className="text-lg font-black uppercase">Reviews</h3><p className="text-xs text-gray-500">{activeReviewProduct.name}</p></div>
                <button onClick={() => setActiveReviewProduct(null)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
              </div>
              <div className="overflow-y-auto my-4 space-y-3 max-h-52">
                {activeReviewProduct.reviews.length === 0
                  ? <p className="text-center py-6 text-sm text-gray-400">No reviews yet!</p>
                  : activeReviewProduct.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-gray-50 rounded-xl text-xs">
                      <div className="flex items-center justify-between mb-1"><span className="font-extrabold">{rev.author}</span><div className="flex items-center gap-1"><Star size={11} fill="#FFC300" className="text-[#FFC300]" /><span className="font-bold">{rev.rating}</span></div></div>
                      <p className="text-gray-600">{rev.comment}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{rev.date}</span>
                    </div>
                  ))
                }
              </div>
              <form onSubmit={handleAddReview} className="pt-4 border-t space-y-3">
                <p className="text-xs font-black uppercase">Write a Review</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold">Rating:</span>
                  {[1,2,3,4,5].map((s) => <button type="button" key={s} onClick={() => setNewReviewRating(s)} className="cursor-pointer"><Star size={17} className={s <= newReviewRating ? "fill-[#FFC300] text-[#FFC300]" : "text-gray-300"} /></button>)}
                </div>
                <input type="text" placeholder="Your Name" required value={newReviewAuthor} onChange={(e) => setNewReviewAuthor(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 font-bold focus:outline-none focus:border-[#E8115B]" />
                <textarea placeholder="Your thoughts?" required rows={2} value={newReviewComment} onChange={(e) => setNewReviewComment(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 font-medium focus:outline-none focus:border-[#E8115B]" />
                <button type="submit" className="w-full py-2.5 rounded-full bg-[#181410] text-[#FFC300] font-extrabold text-xs uppercase cursor-pointer">Submit Review</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}