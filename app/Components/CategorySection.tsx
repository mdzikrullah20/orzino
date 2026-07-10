// "use client";
// import React from "react";
// import { ShoppingBag, Sun, Crown, PackageOpen } from "lucide-react";
// import { useReveal } from "@/hooks/useReveal";

// const categories = [
//   { icon: ShoppingBag, title: "Fruit Cups", desc: "Single-serve, ready to eat", href: "/products?category=fruit-cups" },
//   { icon: Sun, title: "Seasonal Fruits", desc: "Best of the season, picked fresh", href: "/products?category=seasonal" },
//   { icon: Crown, title: "Premium Packs", desc: "Curated exotic fruit selections", href: "/products?category=premium" },
//   { icon: PackageOpen, title: "Combo Boxes", desc: "Mixed variety for sharing", href: "/products?category=combo" },
// ];

// const CategorySection = () => {
//   const { ref, visible } = useReveal();
//   return (
//     <section ref={ref} className="px-6 py-16 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold text-center text-[#1B4332]">Shop by Category</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
//         {categories.map((cat, i) => {
//           const Icon = cat.icon;
//           return (
            
//               key={cat.title}
//               href={cat.href}
//               style={{ animationDelay: `${i * 0.1}s` }}
//               className={`reveal ${visible ? "show" : ""} group bg-[#FFFBF5] rounded-2xl p-6 text-center border border-[#40916C]/10 hover:border-[#F4623A]/40 hover:shadow-lg transition-all duration-300`}
//             >
//               <div className="w-12 h-12 mx-auto rounded-full bg-[#40916C]/10 flex items-center justify-center group-hover:bg-[#F4623A]/10 transition-colors duration-300">
//                 <Icon size={22} className="text-[#40916C] group-hover:text-[#F4623A] transition-colors duration-300" />
//               </div>
//               <h3 className="font-semibold text-[#1A1A1A] mt-4">{cat.title}</h3>
//               <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
//             </a>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default CategorySection;