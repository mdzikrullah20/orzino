"use client";
import React, { useState } from "react";
import { 
  Package, 
  ChefHat, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  LucideIcon, 
  Clock, 
  MapPin, 
  ExternalLink,
  PhoneCall,
  Box
} from "lucide-react";

export type OrderStatus = 0 | 1 | 2 | 3;

interface StepItem {
  label: string;
  icon: LucideIcon;
  desc: string;
  timeEst?: string;
}

const steps: StepItem[] = [
  { label: "Order Placed", icon: Package, desc: "Securely verified & registered", timeEst: "10:30 AM" },
  { label: "Preparing", icon: ChefHat, desc: "Vacuum freeze-drying & vacuum sealing", timeEst: "11:45 AM" },
  { label: "Out for Delivery", icon: Truck, desc: "Handed over to express courier", timeEst: "Expected 2:00 PM" },
  { label: "Delivered", icon: CheckCircle2, desc: "Delivered to your doorstep", timeEst: "Pending" },
];

const OrderTracker = ({ currentStep: initialStep = 1 }: { currentStep?: OrderStatus }) => {
  const [currentStep, setCurrentStep] = useState<OrderStatus>(initialStep);
  const [showDetails, setShowDetails] = useState(false);

  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(27,67,50,0.07)] border border-emerald-900/5 relative overflow-hidden">
      
      {/* Dynamic Background Glass Orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-[#40916C]/15 to-[#52b788]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-[#F4623A]/15 to-[#ffb703]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Section */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#40916C]/10 text-[#40916C] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: "4s" }} /> Orzino Live Tracking
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight">
            Order #ORZ-84920
          </h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Clock size={14} className="text-[#40916C]" /> Estimated delivery today by <span className="font-semibold text-gray-700">4:30 PM</span>
          </p>
        </div>

        {/* Quick Demo Controls to test states interactively */}
        <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-2xl border border-gray-200/60 self-start md:self-auto">
          <span className="text-[11px] font-bold text-gray-400 px-2 uppercase tracking-wider">State:</span>
          {[0, 1, 2, 3].map((stepIdx) => (
            <button
              key={stepIdx}
              onClick={() => setCurrentStep(stepIdx as OrderStatus)}
              className={`w-7 h-7 rounded-xl text-xs font-bold transition-all ${
                currentStep === stepIdx
                  ? "bg-[#1B4332] text-white shadow-sm scale-105"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {stepIdx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Stepper Main Body */}
      <div className="relative z-10 py-2">
        {/* Desktop Horizontal Stepper */}
        <div className="hidden sm:block relative">
          {/* Background Track Line */}
          <div className="absolute top-6 left-8 right-8 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#40916C] via-[#52b788] to-[#2d6a4f] rounded-full transition-all duration-700 ease-out shadow-sm"
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
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-md transform ${
                      done || active
                        ? "bg-[#40916C] border-[#40916C] text-white shadow-[#40916C]/30 scale-105"
                        : "bg-white border-gray-200 text-gray-400"
                    } ${active ? "ring-8 ring-[#40916C]/15 animate-bounce" : ""}`}
                  >
                    <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <p className={`mt-3 text-sm font-bold tracking-tight ${done || active ? "text-[#1B4332]" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 max-w-[130px] font-medium leading-relaxed">
                    {step.desc}
                  </p>
                  <span className="text-[10px] font-semibold text-[#40916C] bg-[#40916C]/10 px-2 py-0.5 rounded-md mt-2">
                    {step.timeEst}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="sm:hidden relative pl-6">
          <div className="absolute left-[1.35rem] top-4 bottom-4 w-2 bg-gray-100 rounded-full overflow-hidden">
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
                <div key={step.label} className="flex items-start gap-4 relative">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center border-2 z-10 transition-all duration-500 shadow-md ${
                      done || active
                        ? "bg-[#40916C] border-[#40916C] text-white shadow-[#40916C]/30"
                        : "bg-white border-gray-200 text-gray-400"
                    } ${active ? "ring-8 ring-[#40916C]/15" : ""}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="pt-0.5">
                    <div className="flex items-center gap-2">
                      <p className={`font-bold text-base tracking-tight ${done || active ? "text-[#1B4332]" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                      <span className="text-[10px] font-semibold text-[#40916C] bg-[#40916C]/10 px-2 py-0.5 rounded-md">
                        {step.timeEst}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expandable Order Information Box */}
      <div className="mt-10 bg-gradient-to-r from-gray-50 to-[#FFF8ED]/50 rounded-2xl p-4 sm:p-5 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F4623A] flex items-center justify-center font-bold">
              <Box size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Package Contents</p>
              <p className="text-sm font-bold text-[#1B4332]">2x Freeze-Dried Strawberries, 1x Mango Crunch (45G)</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-bold text-[#40916C] hover:text-[#1B4332] bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200/60 transition w-full sm:w-auto text-center"
          >
            {showDetails ? "Hide Delivery Info" : "View Delivery Address"}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn text-xs sm:text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-[#F4623A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1B4332]">Delivery Address:</p>
                <p className="mt-0.5">Flat 402, Green Meadows Apartment, Jubilee Hills, Hyderabad - 500033</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <PhoneCall size={16} className="text-[#40916C] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1B4332]">Courier Partner:</p>
                <p className="mt-0.5">ExpressDelite (Tracking ID: DX-994821)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust Footer Banner */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center gap-2 font-semibold text-[#1B4332]">
          <ShieldCheck size={18} className="text-[#40916C]" />
          <span>Orzino Quality Inspection Passed & Vacuum Sealed</span>
        </div>
        <a href="#support" className="text-[#F4623A] font-bold hover:underline flex items-center gap-1">
          Need Help? <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

export default OrderTracker;