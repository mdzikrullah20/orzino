"use client";
import { Sprout, ClipboardList, ChefHat, Truck } from "lucide-react";
import { useReveal } from "../Hooks";

const steps = [
  { icon: Sprout, title: "Choose Fruits", desc: "Pick from fresh, seasonal, or combo options" },
  { icon: ClipboardList, title: "Place Order", desc: "Checkout in under a minute" },
  { icon: ChefHat, title: "We Prepare Fresh", desc: "Cut and packed same-day, hygienically" },
  { icon: Truck, title: "Get Delivery", desc: "Chilled and delivered to your doorstep" },
];

const HowItWorks = () => {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="px-6 py-16 bg-[#FFFBF5]">
      <h2 className="text-3xl font-bold text-center text-[#1B4332]">How It Works</h2>
      <div className="relative max-w-5xl mx-auto mt-12">
        <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-[#40916C]/20" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                style={{ animationDelay: `${i * 0.12}s` }}
                className={`reveal ${visible ? "show" : ""} relative text-center`}
              >
                <div className="relative z-10 w-12 h-12 mx-auto rounded-full bg-[#40916C] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <Icon size={22} className="mx-auto mt-4 text-[#F4623A]" />
                <h3 className="font-semibold text-[#1A1A1A] mt-2">{step.title}</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-[180px] mx-auto">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;