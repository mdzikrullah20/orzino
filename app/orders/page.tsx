"use client";
import React from "react";
import { Package, ChefHat, Truck, CheckCircle2, ShieldCheck, Sparkles, LucideIcon } from "lucide-react";

export type OrderStatus = 0 | 1 | 2 | 3;

const steps: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "Order Placed", icon: Package, desc: "We've securely received your order" },
  { label: "Preparing", icon: ChefHat, desc: "Freeze-drying & packing your crunch" },
  { label: "Out for Delivery", icon: Truck, desc: "On its way to your doorstep" },
  { label: "Delivered", icon: CheckCircle2, desc: "Enjoy your healthy snack!" },
];

const OrderTracker = ({ currentStep }: { currentStep: OrderStatus }) => {
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#FFF8ED] via-white to-[#FFEFE0] p-6 sm:p-10 rounded-3xl shadow-xl border border-orange-100/60 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#40916C]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#F4623A]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Trust & Brand Title Header */}
      <div className="relative text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#40916C]/10 text-[#40916C] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 shadow-sm">
          <Sparkles size={14} /> Orzino Live Tracking
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight">
          Track Your Snacking Journey
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-lg mx-auto">
          Real-time updates straight from our packing facility to your hands with absolute safety assurance.
        </p>
      </div>

      <div className="relative z-10 py-4">
        {/* Desktop horizontal stepper */}
        <div className="hidden sm:block relative">
          <div className="absolute top-5 left-5 right-5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#40916C] to-[#2d6a4f] rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div key={step.label} className="flex flex-col items-center w-1/4 text-center group">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-md transform hover:scale-105 ${
                      done || active
                        ? "bg-[#40916C] border-[#40916C] text-white shadow-[#40916C]/30"
                        : "bg-white border-gray-300 text-gray-400"
                    } ${active ? "ring-8 ring-[#40916C]/20 animate-pulse scale-110" : ""}`}
                  >
                    <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <p className={`mt-3 text-sm font-bold tracking-tight ${done || active ? "text-[#1B4332]" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 max-w-[120px] font-medium leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical stepper */}
        <div className="sm:hidden relative pl-6">
          <div className="absolute left-[1.35rem] top-3 bottom-3 w-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-[#40916C] to-[#2d6a4f] rounded-full transition-all duration-700 ease-out"
              style={{ height: `${progressPercent}%` }}
            />
          </div>
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div key={step.label} className="flex items-start gap-5 relative">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-500 shadow-md ${
                      done || active
                        ? "bg-[#40916C] border-[#40916C] text-white shadow-[#40916C]/30"
                        : "bg-white border-gray-300 text-gray-400"
                    } ${active ? "ring-8 ring-[#40916C]/20 animate-pulse scale-105" : ""}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="pt-1">
                    <p className={`font-bold text-base tracking-tight ${done || active ? "text-[#1B4332]" : "text-gray-400"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust Footer Banner */}
      <div className="mt-10 pt-5 border-t border-orange-100 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#1B4332]">
        <ShieldCheck size={18} className="text-[#40916C]" />
        <span>Orzino Guarantee: 100% Quality Inspected & Secure Delivery</span>
      </div>
    </div>
  );
};

export default OrderTracker;