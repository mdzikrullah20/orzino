"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { useReveal } from "../Hooks";

const OrderTrackingBanner = () => {
  const { ref, visible } = useReveal();
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleTrack = () => {
    if (!orderId.trim()) return;
    router.push(`/orders?id=${encodeURIComponent(orderId.trim())}`);
  };

  return (
    <section ref={ref} className="px-6 py-14">
      <div
        className={`reveal ${visible ? "show" : ""} max-w-5xl mx-auto rounded-3xl bg-[#1B4332] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6`}
      >
        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <MapPin size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Already ordered?</h3>
            <p className="text-white/70 text-sm">Track your delivery in real time</p>
          </div>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="Enter Order ID"
              className="w-full pl-10 pr-4 py-3 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#F4623A]/50"
            />
          </div>
          <button
            onClick={handleTrack}
            className="bg-[#F4623A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#FFB347] transition-colors duration-300 shrink-0"
          >
            Track
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderTrackingBanner;