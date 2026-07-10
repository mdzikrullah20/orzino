// "use client";
// import { MessageCircle, Smartphone } from "lucide-react";
// import { useReveal } from "@/hooks/useReveal";

// const WhatsAppSection = () => {
//   const { ref, visible } = useReveal();
//   return (
//     <section ref={ref} className="px-6 py-16 max-w-5xl mx-auto">
//       <div
//         className={`reveal ${visible ? "show" : ""} grid grid-cols-1 md:grid-cols-2 gap-6`}
//       >
//         <div className="bg-[#25D366]/10 rounded-2xl p-8 flex flex-col items-start">
//           <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
//             <MessageCircle size={22} className="text-white" />
//           </div>
//           <h3 className="font-semibold text-[#1A1A1A] mt-4 text-lg">Order on WhatsApp</h3>
//           <p className="text-gray-500 text-sm mt-1">Quick orders without the app, just message us</p>
          
//             href="https://wa.me/919876543210"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-5 bg-[#25D366] text-white px-6 py-2.5 rounded-full font-medium hover:brightness-95 transition-all duration-300"
//           >
//             Chat Now
//           </a>
//         </div>

//         <div className="bg-[#40916C]/10 rounded-2xl p-8 flex flex-col items-start">
//           <div className="w-12 h-12 rounded-full bg-[#40916C] flex items-center justify-center">
//             <Smartphone size={22} className="text-white" />
//           </div>
//           <h3 className="font-semibold text-[#1A1A1A] mt-4 text-lg">Download Our App</h3>
//           <p className="text-gray-500 text-sm mt-1">Faster reordering and exclusive app-only offers</p>
//           <button className="mt-5 bg-[#40916C] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#1B4332] transition-colors duration-300">
//             Coming Soon
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhatsAppSection;