"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Star, Truck, Clock, Users } from "lucide-react";
import { useReveal } from "../Hooks";
import CategorySection from "./CategorySection";
import HowItWorks from "./HowItWorks";
import OrderTrackingBanner from "./OrderTrackingBanner";
import SeasonalFruits from "./SeasonalFruits";
import Testimonials from "./Testimonials";
import WhatsAppSection from "./WhatsAppSection";
import NewsletterSection from "./NewsletterSection";
import WhySection from "./WhySection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import Link from "next/link";

const fruits = [
  {
    name: "Fresh Mango",
    image: "https://media.istockphoto.com/id/1326795052/photo/yellow-ripe-cut-mango-in-a-bowl-top-down.jpg?s=612x612&w=0&k=20&c=B2U1VR_36zUjJ7oI407rzqXkvUM6GDZH7MlLfpiihTQ=",
    price: "₹80 / Cup",
    rating: 4.8,
    tag: "Bestseller",
  },
  {
    name: "Watermelon",
    image: "https://media.istockphoto.com/id/1148413588/photo/watermelon-juice-for-summer-refreshing-decorated-with-carved-watermelon-cups-inside-is-a-red.jpg?s=612x612&w=0&k=20&c=YHNSNKrKooyLOkFQlDPUnblG3FsrMYNL10QoDegiXpI=",
    price: "₹50 / Cup",
    rating: 4.6,
    tag: null,
  },
  {
    name: "Pineapple",
    image: "https://media.istockphoto.com/id/545277146/photo/pineapple-with-slices-isolated.jpg?s=612x612&w=0&k=20&c=d41aG8Ta0MLABlFarkvs5cIgK30d5FtimFD6QRxni_I=",
    price: "₹70 / Cup",
    rating: 4.7,
    tag: "New",
  },
  {
    name: "Mixed Fruit Cup",
    image: "https://media.istockphoto.com/id/2227885654/photo/young-asian-woman-eating-fruits-for-snack-in-the-common-area-of-a-commercial-building.jpg?s=612x612&w=0&k=20&c=YgAg0LKCYP_kKMHIqOr0ZARRoC6huhGxf59KOTM1mbc=",
    price: "₹100 / Cup",
    rating: 4.9,
    tag: "Bestseller",
  },
];

const stats = [
  { icon: Truck, value: "10K+", label: "Orders Delivered" },
  { icon: Clock, value: "30 min", label: "Avg. Delivery Time" },
  { icon: Users, value: "5K+", label: "Happy Customers" },
  { icon: Star, value: "4.8/5", label: "Average Rating" },
];

const FruitCard = ({ fruit, delay }: { fruit: (typeof fruits)[number]; delay: number }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}s` }}
      className={`reveal ${visible ? "show" : ""} group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300`}
    >
      <div className="relative overflow-hidden">
        <img
          src={fruit.image}
          alt={fruit.name}
          className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {fruit.tag && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${
              fruit.tag === "Bestseller" ? "bg-[#F4623A]" : "bg-[#40916C]"
            }`}
          >
            {fruit.tag}
          </span>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-[#1A1A1A]">
          <Star size={12} className="fill-[#FFB347] text-[#FFB347]" />
          {fruit.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#1A1A1A]">{fruit.name}</h3>
        <p className="text-[#F4623A] font-bold mt-2">{fruit.price}</p>
        <button className="mt-4 w-full bg-[#40916C] text-white py-2 rounded-lg hover:bg-[#1B4332] transition-colors duration-300">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const hero = useReveal();
  const stats_ = useReveal();
  const router = useRouter();

  return (
    <div className="bg-white overflow-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .reveal { opacity: 0; }
        .reveal.show { animation: fadeUp 0.7s ease-out forwards; }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Hero */}
      <section
        ref={hero.ref}
        className="relative bg-gradient-to-br from-[#FFF8ED] to-[#FFEFE0] px-6 py-16 md:py-24 overflow-hidden"
      >
        {/* Decorative blurred blobs */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#40916C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F4623A]/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className={`md:w-1/2 reveal ${hero.visible ? "show" : ""}`}>
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-[#1B4332] shadow-sm">
              🍊 100% Fresh, Cut Daily
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] leading-tight mt-5">
              Fresh Cut Fruits, <span className="text-[#F4623A]">Delivered</span> Fresh
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-md">
              Enjoy healthy and hygienic fruit cups prepared daily with fresh seasonal fruits.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
<Link
  href="/products"
  className="cursor-pointer bg-[#40916C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1B4332] transition-colors duration-300"
>
  Order Now
</Link>
              <button
                onClick={() => router.push("/orders")}
                className="cursor-pointer border-2 border-[#1B4332] text-[#1B4332] px-8 py-3 rounded-full font-medium hover:bg-[#1B4332] hover:text-white transition-colors duration-300"
              >
                Track Order
              </button>
            </div>
          </div>

          <div className={`relative md:w-1/2 reveal ${hero.visible ? "show" : ""}`} style={{ animationDelay: "0.15s" }}>
            <img
              src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea"
              alt="Fresh cut fruits bowl"
              className="w-full md:w-[420px] mx-auto rounded-[2rem] shadow-2xl object-cover h-80 md:h-96"
            />

            {/* Floating fruit image */}
            <img
              src="https://images.unsplash.com/photo-1553279768-865429fa0078"
              alt="Fresh mango"
              className="float absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg hidden sm:block"
            />

            {/* Floating rating badge */}
            <div className="float absolute top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 hidden sm:flex items-center gap-2" style={{ animationDelay: "1s" }}>
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#40916C] border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-[#F4623A] border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-[#FFB347] border-2 border-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A]">500+ orders</p>
                <p className="text-[10px] text-gray-400">delivered today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          ref={stats_.ref}
          className={`reveal ${stats_.visible ? "show" : ""} relative max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100`}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <Icon size={20} className="text-[#F4623A] mb-2" />
                <p className="text-xl font-bold text-[#1B4332]">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <CategorySection />

      {/* Featured Products */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-3xl font-bold text-[#1B4332]">Featured Products</h2>
            <p className="text-gray-500 mt-1">Hand-picked favourites, cut fresh every morning</p>
          </div>
          <a href="/products" className="text-[#F4623A] font-medium hover:underline whitespace-nowrap">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {fruits.map((fruit, index) => (
            <FruitCard key={fruit.name} fruit={fruit} delay={index * 0.1} />
          ))}
        </div>
      </section>

      <WhySection />
      <HowItWorks />
      <OrderTrackingBanner />
      <SeasonalFruits />
      <Testimonials />
      <WhatsAppSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default HomePage;