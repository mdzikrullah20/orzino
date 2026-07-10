"use client";
import React from "react";
import { Package, ChefHat, Truck, CheckCircle2, LucideIcon } from "lucide-react";

export type OrderStatus = 0 | 1 | 2 | 3;

const steps: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "Order Placed", icon: Package, desc: "We've received your order" },
  { label: "Preparing", icon: ChefHat, desc: "Fruits being cut fresh" },
  { label: "Out for Delivery", icon: Truck, desc: "On its way to you" },
  { label: "Delivered", icon: CheckCircle2, desc: "Enjoy your fresh cup!" },
];

const OrderTracker = ({ currentStep }: { currentStep: OrderStatus }) => {
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Desktop horizontal stepper */}
      <div className="hidden sm:block relative">
        <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200 rounded-full">
          <div
            className="h-1 bg-[#40916C] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={step.label} className="flex flex-col items-center w-1/4 text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    done || active
                      ? "bg-[#40916C] border-[#40916C] text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  } ${active ? "ring-4 ring-[#40916C]/25 animate-pulse" : ""}`}
                >
                  <Icon size={18} />
                </div>
                <p className={`mt-3 text-sm font-medium ${done || active ? "text-[#1B4332]" : "text-gray-400"}`}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-[110px]">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical stepper */}
      <div className="sm:hidden relative pl-5">
        <div className="absolute left-[1.15rem] top-2 bottom-2 w-1 bg-gray-200 rounded-full">
          <div
            className="w-1 bg-[#40916C] rounded-full transition-all duration-700 ease-out"
            style={{ height: `${progressPercent}%` }}
          />
        </div>
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={step.label} className="flex items-start gap-4 relative">
                <div
                  className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-500 ${
                    done || active
                      ? "bg-[#40916C] border-[#40916C] text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  } ${active ? "ring-4 ring-[#40916C]/25 animate-pulse" : ""}`}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <p className={`font-medium ${done || active ? "text-[#1B4332]" : "text-gray-400"}`}>{step.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;