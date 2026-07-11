"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "./CartContext";

function generateOrderId() {
  return "ORZ" + Math.floor(10000 + Math.random() * 90000);
}

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setPlacing(true);
    const orderId = generateOrderId();
    setTimeout(() => {
      clearCart();
      router.push(`/orders?id=${orderId}`);
    }, 900);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-gray-400">Your cart is empty</p>
        <button onClick={() => router.push("/")} className="mt-4 text-[#40916C] font-medium hover:underline">
          Browse fruits →
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] px-6 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-[#1B4332]">Checkout</h1>
        <div className="mt-6 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className="text-[#1A1A1A]">
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium text-[#1B4332]">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-6 pt-4 flex justify-between font-bold text-lg text-[#1B4332]">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="mt-8 w-full bg-[#40916C] text-white py-3 rounded-full font-medium hover:bg-[#1B4332] transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {placing ? "Placing Order..." : (<><CheckCircle2 size={18} /> Place Order</>)}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;