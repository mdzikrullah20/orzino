"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Heart,
  Star,
  Clock,
  Plus,
  Minus,
  X,
  Check,
  PackagePlus,
  ShoppingCart,
  Send,
  FileText,
  Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


const WHATSAPP_PHONE_NUMBER = "918757726925";
const STORE_NAME = "ORZINO Freeze Dried Fruits";
const STORE_ADDRESS = "Bengaluru, Karnataka, India";
const STORE_EMAIL = "support@orzino.com";
const STORE_GSTIN = "29AAAAA0000A1Z5";

type Review = { id: string; author: string; rating: number; comment: string; date: string; };
type Product = { id: number; name: string; category: string; image: string; price: number; originalPrice: number; rating: number; weight: string; badge?: string; isSale?: boolean; offerEndsAt?: string; reviews: Review[]; };
type CartItem = { product: Product; selectedWeight: string; quantity: number; unitPrice: number; };

const QUANTITY_DISCOUNT_TIERS = [
  { minQty: 5, discountPercent: 15 }, { minQty: 3, discountPercent: 10 },
  { minQty: 2, discountPercent: 5 }, { minQty: 1, discountPercent: 0 },
];
const getQuantityDiscountPercent = (qty: number) =>
  QUANTITY_DISCOUNT_TIERS.find((t) => qty >= t.minQty)?.discountPercent ?? 0;

const initialProducts: Product[] = [
  { id: 1, name: "Pineapple Slices", category: "Fruit Cubes", image: "/images/pineappleB.jpeg", price: 149, originalPrice: 199, rating: 4.9, weight: "35g", badge: "Best Seller", isSale: true, offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), reviews: [{ id: "r1", author: "Aarav S.", rating: 5, comment: "Insanely crunchy!", date: "2 days ago" }, { id: "r2", author: "Pooja M.", rating: 4, comment: "Great healthy snack.", date: "1 week ago" }] },
  { id: 2, name: "MANGO SLICES", category: "Crispy Slices", image: "/images/mango.jpeg", price: 149, originalPrice: 199, rating: 4.8, weight: "40g", badge: "Popular", isSale: true, offerEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(), reviews: [{ id: "r3", author: "Rohan V.", rating: 5, comment: "Pure mango sweetness.", date: "3 days ago" }] },
  { id: 3, name: "Guava Snacks", category: "Crispy Slices", image: "/images/guava.jpeg", price: 149, originalPrice: 199, rating: 4.6, weight: "45g", isSale: true, reviews: [] },
  { id: 4, name: "Strawberry Guac", category: "Pouches", image: "/images/strawberry.jpeg", price: 149, originalPrice: 199, rating: 4.7, weight: "40g", isSale: false, reviews: [] },
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
    <div className="flex items-center gap-1 bg-[#E5E9EE] text-[#FFC300] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold w-fit">
      <Clock size={10} className="text-[#E8115B]" />
      <span>{String(timeLeft.hours).padStart(2, "0")}h:{String(timeLeft.minutes).padStart(2, "0")}m:{String(timeLeft.seconds).padStart(2, "0")}s</span>
    </div>
  );
}

// ─── Invoice PDF Component ───────────────────────────────────────────────────
function InvoiceModal({ cart, comboCart, productsList, cartTotal, comboSummary, onClose }: {
  cart: CartItem[]; comboCart: Record<number, number>; productsList: Product[];
  cartTotal: number; comboSummary: { finalPrice: number; totalSavings: number; originalTotal: number; comboBonusPercent: number; totalItems: number };
  onClose: () => void;
}) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const grandTotal = cartTotal + comboSummary.finalPrice;
  const tax = Math.round(grandTotal * 0.05);
  const grandWithTax = grandTotal + tax;

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;

    if (!element) return;

    // Dynamically import html2pdf.js only when needed, in the browser.
    // A static top-level import would get evaluated during Next.js's
    // server-side module graph build (even in a "use client" file),
    // and html2pdf.js references the browser-only global `self` at
    // import time, which crashes with "self is not defined" on the server.
    const html2pdf = (await import("html2pdf.js")).default;

    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    // `as const` on each literal value stops TypeScript from widening
    // "jpeg" -> string, "a4" -> string, etc. so they match the library's
    // literal-union types (e.g. image.type: "jpeg" | "png" | "webp").
    const options = {
      margin: [8, 8, 8, 8] as [number, number, number, number],

      filename: `ORZINO-Invoice-${invoiceNumber}.pdf`,

      image: {
        type: "jpeg" as const,
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      },

      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },

      pagebreak: {
        mode: ["avoid-all", "css", "legacy"] as const,
      },
    };

    try {
      await html2pdf()
        .set(options)
        .from(element)
        .save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative z-[110] w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Top action bar */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-3 border-b">
          <h3 className="font-black text-sm uppercase text-gray-800">Order Invoice</h3>
          <div className="flex items-center gap-2">
            <button
  type="button"
  onClick={handleDownloadPDF}
  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
>
  <Download size={13} />
  Download PDF
</button>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"><X size={17} /></button>
          </div>
        </div>

        {/* ── Printable Invoice ── */}
        <div ref={invoiceRef} className="p-6 sm:p-8 space-y-6 text-[#1a1a1a]">

          {/* Header */}
          <div className="inv-header flex justify-between items-start border-b-2 border-gray-900 pb-5">
            <div>
              <p className="inv-title text-2xl font-black text-[#8B3A1A] uppercase">{STORE_NAME}</p>
              <p className="inv-meta text-[11px] text-gray-500 mt-0.5">{STORE_ADDRESS}</p>
              <p className="inv-meta text-[11px] text-gray-500">📞 +91 87577 26925 | ✉ {STORE_EMAIL}</p>
              <p className="inv-meta text-[11px] text-gray-500">GSTIN: {STORE_GSTIN}</p>
            </div>
            <div className="text-right">
              <p className="inv-badge text-2xl font-black text-blue-700">INVOICE</p>
              <p className="text-[11px] text-gray-600 font-semibold mt-1">#{invoiceNumber}</p>
              <p className="text-[11px] text-gray-500">Date: {today}</p>
              <span className="badge-paid inline-block mt-1 bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full">✓ ORDER PLACED</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="info-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="info-box bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs leading-relaxed">
              <h4 className="font-black text-[10px] uppercase text-blue-700 border-b pb-1 mb-2">Sold By</h4>
              <p className="font-bold text-gray-900">{STORE_NAME}</p>
              <p className="text-gray-600">{STORE_ADDRESS}</p>
              <p className="text-gray-600 mt-1">📞 +91 87577 26925</p>
              <p className="text-gray-600">✉ {STORE_EMAIL}</p>
              <p className="text-gray-600">GSTIN: {STORE_GSTIN}</p>
            </div>
            <div className="info-box bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs leading-relaxed">
              <h4 className="font-black text-[10px] uppercase text-blue-700 border-b pb-1 mb-2">Shipping To</h4>
              <p className="font-bold text-gray-900">Customer</p>
              <p className="text-gray-500 italic">Address to be confirmed via WhatsApp</p>
              <p className="text-gray-600 mt-2">Payment: <strong>COD / UPI via WhatsApp</strong></p>
              <p className="text-gray-600">Shipping: <strong className="text-green-600">FREE</strong></p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-hidden border border-gray-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="py-2.5 px-3 text-[10px] uppercase">#</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase">Item</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase text-center">Variant</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase text-center">Qty</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase text-right">Price</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {cart.map((item, idx) => (
                  <tr key={`inv-${idx}`} className="even:bg-gray-50">
                    <td className="py-2.5 px-3 text-center font-semibold">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-semibold text-gray-900">{item.product.name}</td>
                    <td className="py-2.5 px-3 text-center text-gray-500">{item.selectedWeight}</td>
                    <td className="py-2.5 px-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right font-mono">₹{item.unitPrice}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">₹{item.quantity * item.unitPrice}</td>
                  </tr>
                ))}
                {Object.entries(comboCart).map(([pId, qty], idx) => {
                  const prod = productsList.find((p) => p.id === Number(pId));
                  if (!prod) return null;
                  return (
                    <tr key={`combo-${pId}`} className="even:bg-gray-50">
                      <td className="py-2.5 px-3 text-center font-semibold">{cart.length + idx + 1}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">{prod.name}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">Combo Box</td>
                      <td className="py-2.5 px-3 text-center font-bold">{qty}</td>
                      <td className="py-2.5 px-3 text-right font-mono">₹{prod.price}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">₹{qty * prod.price}</td>
                    </tr>
                  );
                })}
                {cart.length === 0 && comboSummary.totalItems === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-gray-400 font-medium">No items in order.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="totals flex justify-end">
            <div className="totals-box w-full sm:w-72 border border-gray-200 rounded-xl overflow-hidden text-xs">
              <div className="totals-row flex justify-between px-4 py-2 border-b border-gray-100 text-gray-600">
                <span>Cart Subtotal</span><span className="font-mono font-semibold">₹{cartTotal}</span>
              </div>
              {comboSummary.totalItems > 0 && (
                <div className="totals-row flex justify-between px-4 py-2 border-b border-gray-100 text-gray-600">
                  <span>Combo ({comboSummary.totalItems} items)</span><span className="font-mono font-semibold">₹{comboSummary.finalPrice}</span>
                </div>
              )}
              {comboSummary.totalSavings > 0 && (
                <div className="totals-row flex justify-between px-4 py-2 border-b border-gray-100 text-green-600">
                  <span>You Saved</span><span className="font-mono font-semibold">- ₹{comboSummary.totalSavings}</span>
                </div>
              )}
              <div className="totals-row flex justify-between px-4 py-2 border-b border-gray-100 text-gray-600">
                <span>GST (5%)</span><span className="font-mono">₹{tax}</span>
              </div>
              <div className="totals-row flex justify-between px-4 py-2 border-b border-gray-100 text-green-600">
                <span>Shipping</span><span className="font-semibold">FREE</span>
              </div>
              <div className="totals-grand flex justify-between px-4 py-3 bg-gray-900 text-white">
                <span className="font-black text-sm">Grand Total</span>
                <span className="font-mono font-black text-[#FFC300] text-sm">₹{grandWithTax}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer text-center text-[10px] text-gray-400 border-t pt-4">
            <p className="font-bold text-gray-700 text-xs mb-1">Thank you for ordering from {STORE_NAME}! 🎉</p>
            <p>For delivery queries: WhatsApp +91 87577 26925 | {STORE_EMAIL}</p>
            <p className="mt-1 italic">This is a computer-generated invoice. No signature required.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<Record<number, string>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [comboCart, setComboCart] = useState<Record<number, number>>({});
  const [isComboDrawerOpen, setIsComboDrawerOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [activeReviewProduct, setActiveReviewProduct] = useState<Product | null>(null);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const toggleWishlist = (id: number) => setWishlist((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);
  const selectWeight = (productId: number, weight: string) => setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));

  const handleAddToCart = (product: Product) => {
    const selectedWeight = selectedWeights[product.id] || product.weight;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.selectedWeight === selectedWeight);
      if (idx > -1) { const u = [...prev]; u[idx].quantity += 1; return u; }
      return [...prev, { product, selectedWeight, quantity: 1, unitPrice: product.price }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: number, weight: string, delta: number) => {
    setCart((prev) => prev.map((item) => {
      if (item.product.id === productId && item.selectedWeight === weight) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

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

  const cartItemCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0), [cart]);

  const comboSummary = useMemo(() => {
    let totalItems = 0, originalTotal = 0, discountedTotal = 0;
    Object.entries(comboCart).forEach(([pId, qty]) => {
      const prod = productsList.find((p) => p.id === Number(pId));
      if (prod) { totalItems += qty; originalTotal += prod.originalPrice * qty; discountedTotal += prod.price * qty; }
    });
    const comboBonusPercent = totalItems >= 3 ? 10 : 0;
    const finalPrice = Math.round(discountedTotal * (1 - comboBonusPercent / 100));
    return { totalItems, originalTotal, finalPrice, totalSavings: originalTotal - finalPrice, comboBonusPercent };
  }, [comboCart, productsList]);

  const filteredProducts = useMemo(() => productsList.filter((p) =>
    (selectedCategory === "All" || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  ), [selectedCategory, search, productsList]);

  // ── WhatsApp Order Message ──────────────────────────────────────────────────
  const handleCheckoutWhatsApp = () => {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0) + comboSummary.totalItems;
    if (totalItems === 0) { alert("Cart aur Combo dono khali hain!"); return; }

    const grandTotal = cartTotal + comboSummary.finalPrice;
    const tax = Math.round(grandTotal * 0.05);
    const grandWithTax = grandTotal + tax;
    const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    const invoiceNo = `INV-${Date.now().toString().slice(-6)}`;

    let msg = `🛒 *NEW ORDER — ${STORE_NAME}*\n`;
    msg += `📋 Invoice: *${invoiceNo}*\n`;
    msg += `📅 Date: ${today}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (cart.length > 0) {
      msg += `📦 *CART ITEMS:*\n`;
      cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.product.name} (${item.selectedWeight})\n`;
        msg += `   ${item.quantity} x ₹${item.unitPrice} = *₹${item.quantity * item.unitPrice}*\n`;
      });
      msg += `\n`;
    }

    if (comboSummary.totalItems > 0) {
      msg += `🎁 *COMBO BOX (${comboSummary.totalItems} items):*\n`;
      Object.entries(comboCart).forEach(([pId, qty]) => {
        const prod = productsList.find((p) => p.id === Number(pId));
        if (prod) msg += `• ${prod.name} x ${qty} = ₹${qty * prod.price}\n`;
      });
      if (comboSummary.comboBonusPercent > 0) msg += `🎉 Combo Discount: -${comboSummary.comboBonusPercent}%\n`;
      msg += `Combo Total: *₹${comboSummary.finalPrice}*\n\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🧾 Subtotal: ₹${grandTotal}\n`;
    msg += `📊 GST (5%): ₹${tax}\n`;
    msg += `🚚 Shipping: FREE\n`;
    msg += `💰 *GRAND TOTAL: ₹${grandWithTax}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `Please share your delivery address to confirm the order! 🙏`;

    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#E5E9EE] text-[#181410] relative">
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">


        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
            {filteredProducts.map((product) => {
              const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              // const isInCombo = (comboCart[product.id] || 0) > 0;
              const weight1 = product.weight;
              const weight2 = `${parseInt(product.weight) * 2}${product.weight.replace(/[0-9]/g, "")}`;
              const activeWeight = selectedWeights[product.id] || weight1;

              return (
                <div key={product.id} className="group relative bg-[#FFF8F0] rounded-2xl border border-[#EDD9C0] shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md">
                  <Link href={`/products/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-[#F5EAD8] cursor-pointer">
                    <Image src={product.image} alt={product.name} fill unoptimized sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                    {product.isSale && discountPercent > 0 && (
                      <span className="absolute top-2 right-2 bg-white text-[#B74418] text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm z-10">{discountPercent}% OFF</span>
                    )}
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                      className="absolute bottom-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:scale-110 transition-transform cursor-pointer">
                      <Heart size={13} className={wishlist.includes(product.id) ? "fill-[#E8115B] text-[#E8115B]" : "text-[#9B6B4B]"} />
                    </button>
                  </Link>

                  <div className="flex flex-col flex-1 px-2.5 pt-2 pb-2.5 gap-1.5">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-[13px] sm:text-[14px] font-extrabold text-[#8B2E08] leading-tight line-clamp-2 group-hover:text-[#B74418]">{product.name}</h3>
                    </Link>

                    {/* Weight Pills */}
                    <div className="flex gap-1.5 flex-wrap">
                      {[weight1, weight2].map((w) => (
                        <button key={w} type="button" onClick={() => selectWeight(product.id, w)}
                          className={`px-2.5 py-1 rounded-md border text-[10px] font-bold transition-colors cursor-pointer ${
                            activeWeight === w ? "border-[#8B3A1A] bg-[#8B3A1A] text-white" : "border-[#D4B896] bg-white text-[#5C3A1E] hover:bg-[#F5E6D0]"
                          }`}
                        >{w}</button>
                      ))}
                    </div>

                    {product.offerEndsAt && <CountdownTimer targetDate={product.offerEndsAt} />}

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[15px] font-black text-[#B74418]">₹{product.price}/-</span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-gray-400 line-through font-semibold">₹{product.originalPrice}</span>
                      )}
                    </div>

                    {/* ADD Button */}
                    <button type="button" onClick={() => handleAddToCart(product)}
                      className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#8B3A1A] py-2.5 text-[12px] font-black uppercase tracking-wider text-white shadow-sm hover:bg-[#7A2E12] active:scale-[0.98] transition-all cursor-pointer">
                      ADD <Plus size={13} strokeWidth={3} />
                    </button>

                    {/* Combo Button */}
                    {/* <button type="button" onClick={() => toggleComboProduct(product)}
                      className={`w-full rounded-lg py-1.5 text-[9px] font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
                        isInCombo ? "bg-green-100 text-green-800 border border-green-300" : "bg-transparent text-[#9B6B4B] border border-[#DCC4AA] hover:bg-white"
                      }`}>
                      {isInCombo
                        ? <span className="flex items-center justify-center gap-1"><Check size={9} /> In Combo</span>
                        : <span className="flex items-center justify-center gap-1"><Plus size={9} /> Add to Combo</span>
                      }
                    </button> */}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-xl font-black uppercase">No snacks found!</p>
            <button onClick={() => { setSelectedCategory("All"); setSearch(""); }} className="mt-4 px-6 py-2.5 bg-[#FFC300] text-[#181410] font-extrabold text-xs uppercase rounded-full">Reset Filters</button>
          </div>
        )}
      </section>

      {/* ── Floating Action Bar ── */}
      {/* <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-[#181410] text-white px-3 py-2 rounded-full shadow-2xl border border-gray-700 max-w-[95vw]">
        <button onClick={() => setIsCartDrawerOpen(true)} className="flex items-center gap-1 text-[11px] font-black text-[#FFC300] cursor-pointer hover:opacity-80">
          <ShoppingCart size={15} /><span>Cart ({cartItemCount})</span>
        </button>
        <span className="text-gray-600">|</span>
        <button onClick={() => setIsInvoiceOpen(true)} className="flex items-center gap-1 text-[11px] font-black text-blue-400 cursor-pointer hover:opacity-80">
          <FileText size={14} /><span>Invoice</span>
        </button>
        <span className="text-gray-600">|</span>
        <button onClick={handleCheckoutWhatsApp} className="flex items-center gap-1 bg-[#25D366] text-white text-[11px] font-black px-3 py-1.5 rounded-full hover:bg-[#20bd5a] transition-all cursor-pointer">
          <Send size={12} /><span>Order</span>
        </button>
      </div> */}

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {isCartDrawerOpen && (
          <div className="fixed inset-0 z-[80] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartDrawerOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative z-[90] w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
              <div className="p-5 border-b flex items-center justify-between">
                <div><h2 className="text-lg font-black uppercase">Cart</h2><p className="text-xs text-gray-500">{cart.length} items</p></div>
                <button onClick={() => setIsCartDrawerOpen(false)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
              </div>
              <div className="p-5 overflow-y-auto flex-grow space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-10 text-gray-400"><ShoppingCart size={40} className="mx-auto mb-2 opacity-50" /><p className="font-bold text-sm">Cart is empty.</p></div>
                ) : cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedWeight}-${idx}`} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Image src={item.product.image} alt={item.product.name} width={44} height={44} className="rounded-lg object-contain bg-white p-1" unoptimized />
                      <div>
                        <p className="font-bold text-xs line-clamp-1">{item.product.name}</p>
                        <span className="text-[10px] text-gray-500">{item.selectedWeight}</span>
                        <p className="text-xs font-mono font-bold text-[#E8115B]">₹{item.unitPrice} × {item.quantity} = ₹{item.unitPrice * item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, -1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-200 cursor-pointer"><Minus size={11} /></button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, 1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-200 cursor-pointer"><Plus size={11} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-gray-50 border-t space-y-3">
                <div className="flex justify-between font-black text-sm"><span>Total:</span><span className="text-[#E8115B]">₹{cartTotal}</span></div>
                <button onClick={handleCheckoutWhatsApp} disabled={cart.length === 0}
                  className="w-full py-3 rounded-full bg-[#25D366] text-white font-black text-xs uppercase flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer hover:bg-[#20bd5a]">
                  <Send size={14} /> Order via WhatsApp
                </button>
                <button onClick={() => { setIsCartDrawerOpen(false); setIsInvoiceOpen(true); }}
                  className="w-full py-2.5 rounded-full bg-blue-600 text-white font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700">
                  <FileText size={14} /> View & Download Invoice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Combo Drawer ── */}
      <AnimatePresence>
        {isComboDrawerOpen && (
          <div className="fixed inset-0 z-[70] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsComboDrawerOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative z-[80] w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
              <div className="p-5 border-b flex items-center justify-between">
                <div><h2 className="text-lg font-black uppercase">Custom Combo</h2><p className="text-xs text-gray-500">3+ items = 10% extra off!</p></div>
                <button onClick={() => setIsComboDrawerOpen(false)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
              </div>
              <div className="p-5 overflow-y-auto flex-grow space-y-3">
                {Object.keys(comboCart).length === 0 ? (
                  <div className="text-center py-10 text-gray-400"><PackagePlus size={40} className="mx-auto mb-2 opacity-50" /><p className="font-bold text-sm">Combo is empty.</p></div>
                ) : Object.entries(comboCart).map(([idStr, qty]) => {
                  const item = productsList.find((p) => p.id === Number(idStr));
                  if (!item) return null;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Image src={item.image} alt={item.name} width={44} height={44} className="rounded-lg object-contain bg-white p-1" unoptimized />
                        <div><p className="font-bold text-xs">{item.name}</p><p className="text-xs font-mono font-bold text-[#E8115B]">₹{item.price} × {qty} = ₹{item.price * qty}</p></div>
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
              <div className="p-5 bg-gray-50 border-t space-y-2">
                <div className="text-xs font-bold space-y-1">
                  {comboSummary.comboBonusPercent > 0 && <div className="flex justify-between text-green-600"><span>Combo Bonus:</span><span>-10%</span></div>}
                  <div className="flex justify-between font-black text-sm"><span>Total:</span><span className="text-[#E8115B]">₹{comboSummary.finalPrice}</span></div>
                  {comboSummary.totalSavings > 0 && <p className="text-[10px] text-green-700">You save ₹{comboSummary.totalSavings}!</p>}
                </div>
                <button disabled={comboSummary.totalItems === 0} onClick={handleCheckoutWhatsApp}
                  className="w-full py-3 rounded-full bg-[#25D366] text-white font-black text-xs uppercase flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer hover:bg-[#20bd5a]">
                  <Send size={14} /> Order Combo via WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Invoice Modal ── */}
      <AnimatePresence>
        {isInvoiceOpen && (
          <InvoiceModal
            cart={cart} comboCart={comboCart} productsList={productsList}
            cartTotal={cartTotal} comboSummary={comboSummary}
            onClose={() => setIsInvoiceOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Review Modal ── */}
      <AnimatePresence>
        {activeReviewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveReviewProduct(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative z-[110] w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b">
                <div><h3 className="text-lg font-black uppercase">Reviews</h3><p className="text-xs text-gray-500">{activeReviewProduct.name}</p></div>
                <button onClick={() => setActiveReviewProduct(null)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
              </div>
              <div className="overflow-y-auto my-4 space-y-3 max-h-52">
                {activeReviewProduct.reviews.length === 0 ? <p className="text-center py-6 text-sm text-gray-400">No reviews yet!</p>
                  : activeReviewProduct.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between font-bold"><span>{rev.author}</span><span className="text-amber-500 flex items-center gap-0.5"><Star size={11} className="fill-amber-500" /> {rev.rating}</span></div>
                      <p className="text-gray-600">{rev.comment}</p>
                    </div>
                  ))}
              </div>
              <form onSubmit={handleAddReview} className="border-t pt-4 space-y-3">
                <input type="text" placeholder="Your Name" value={newReviewAuthor} onChange={(e) => setNewReviewAuthor(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg" required />
                <textarea placeholder="Write a review..." value={newReviewComment} onChange={(e) => setNewReviewComment(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg h-20" required />
                <button type="submit" className="w-full py-2 bg-[#8B3A1A] text-white font-bold text-xs uppercase rounded-lg">Submit Review</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}