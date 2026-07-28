"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Star, Truck, Clock, Users, ShoppingCart, Check, X, MessageCircle } from "lucide-react";
import { useReveal } from "../Hooks";
import { useCart } from "../Components/CartContext";
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
import Image from "next/image";

const freezeDriedProducts = [
  {
    id: 1,
    name: "Freeze Dried Strawberry Snacks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Kr2YYfOAwYXe5QA9HFO9LXfkJ81yH8FIX6GIdd9ZXA&s=10",
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRnGKA0oVVlF9wTPR5Uwfwf-yFNIv4IfahqyelqiUNB8gJfDXEUrYhwOImYFbb38U5yGLOFgfbRmEtryoqUaMmGqtymb1ejGgzpLxvoO6LAC9CAF_w9c0jxe0U",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTujD-yCLzSwsHkNFIg7RTtVLU_JTznFhsR2LWa4EEEIg&s=10",
    ],
    price: "₹260",
    description:
      "Premium freeze dried strawberry snacks made from fresh strawberries with natural sweetness and crunchy texture.",
    details:
      "Bonvie Freeze Dried Strawberry Snacks are prepared using advanced freeze drying technology. This process removes moisture while keeping the original taste, colour and nutrients of strawberries.",
    weight: "40G Pack",
    benefits: [
      "100% Natural",
      "No Added Sugar",
      "Palm Oil Free",
      "Gluten Free",
    ],
    ingredients: "Fresh Strawberry",
  },
  {
    id: 2,
    name: "Freeze Dried Mango Snacks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzbKOyhNf78ZBWydhRIlSrVWCiW5leFUYpylQYE261qg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28R-stp8laoYvTPKYlRlUgerf8NAaN1ahkCRx5QogHg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0P_Pn1G8J1ZMKj0LeFIOZVNYSd2MVTE-_WrzMuIQ1PQ&s=10",
    ],
    price: "₹149",
    description: "Sweet crunchy mango slices made from fresh premium mangoes.",
    details:
      "Freeze dried mango keeps the natural flavour and aroma of fresh mango while giving a crispy snack experience.",
    weight: "50G Pack",
    benefits: [
      "Rich in Vitamin A",
      "No Preservatives",
      "Healthy Snack",
      "Natural Energy",
    ],
    ingredients: "Fresh Mango",
  },
  {
    id: 3,
    name: "Freeze Dried Banana Snacks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtSAzp3stSD7jf8hMM4X0F0fcDxHos1MBbPgD5-_NPQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-xbch3Os38gi5IgWeQVJ63BcsvdhC0WNiU3LSP9jvw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlqjkhBngA5g1acZBsow0WsIr-35_DyMSeeZJBBRG0A&s=10",
    ],
    price: "₹150",
    description: "Crunchy banana chips prepared without frying.",
    details:
      "Made from fresh bananas using freeze drying technology to preserve nutrients.",
    weight: "60G Pack",
    benefits: [
      "High Potassium",
      "No Oil",
      "Healthy Alternative",
      "Travel Friendly",
    ],
    ingredients: "Fresh Banana",
  },
  {
    id: 4,
    name: "Freeze Dried Pineapple Snacks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3o8o8R0srcL1Xj1JLAWQyfAOaVcnTBvKBd2hEljhiw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOcqy3h-y5R77i9b7CM9OB80OsDVVJxk3WWh1rkAtBaQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFmApOL7DpNpMa4JKAoiTcVwjYc8_a2fRhuKmViQ-AVg&s=10",
    ],
    price: "₹159",
    description:
      "Tangy and sweet freeze dried pineapple pieces with a crunchy texture and tropical flavour.",
    details:
      "Freeze dried pineapple is made from fresh ripe pineapples. The process preserves its natural flavour, colour and nutrients while creating a lightweight crunchy snack.",
    weight: "50G Pack",
    benefits: [
      "Rich in Vitamin C",
      "Supports Digestion",
      "No Added Sugar",
      "100% Natural",
    ],
    ingredients: "Fresh Pineapple",
  },
  {
    id: 5,
    name: "Freeze Dried Apple Rings",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGyKns-vGlegCwDABoiEtFBXBkbPj6cT8COQWvuJQoQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5MskcmMDQwlEwAntlKlKj2GtexzEbizEaEGQevBqFjA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XWbQvpaEv5ywYJfMH6TSADkhXsbYJZ8bOW2ImJ4EEQ&s=10",
    ],
    price: "₹139",
    description: "Crispy apple rings made from fresh apples, perfect as a healthy snack.",
    details: "Premium freeze dried apple rings maintain the natural sweetness and crunch of fresh apples without frying or preservatives.",
    weight: "50G Pack",
    benefits: ["High Fibre", "Low Fat Snack", "No Preservatives", "Rich in Antioxidants"],
    ingredients: "Fresh Apple",
  },
  {
    id: 6,
    name: "Freeze Dried Mixed Berry Snacks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKj7mMd92-KrMceAjedlTqZbsmRHaXnxGkFer-24v4HA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXDmhbiX8oMKu2reZp3TwqrzYmgUdJuenfGqoBC1Byug&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEelnN4dVjXM5K0mLu-NnVAQCmtRlgz82vGkV3dupZLA&s=10",
    ],
    price: "₹249",
    description: "A premium mix of strawberry, blueberry and raspberry freeze dried fruits.",
    details: "Mixed berry freeze dried snacks combine multiple fruits to deliver rich flavour, vibrant colour and powerful nutrients in every bite.",
    weight: "100G Pack",
    benefits: ["Antioxidant Rich", "Vitamin C Source", "No Artificial Flavour", "Healthy Daily Snack"],
    ingredients: "Strawberry, Blueberry, Raspberry",
  },
  {
    id: 7,
    name: "Freeze Dried Apple Rings",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGyKns-vGlegCwDABoiEtFBXBkbPj6cT8COQWvuJQoQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5MskcmMDQwlEwAntlKlKj2GtexzEbizEaEGQevBqFjA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XWbQvpaEv5ywYJfMH6TSADkhXsbYJZ8bOW2ImJ4EEQ&s=10",
    ],
    price: "₹139",
    description: "Crispy apple rings made from fresh apples, perfect as a healthy snack.",
    details: "Premium freeze dried apple rings maintain the natural sweetness and crunch of fresh apples without frying or preservatives.",
    weight: "50G Pack",
    benefits: ["High Fibre", "Low Fat Snack", "No Preservatives", "Rich in Antioxidants"],
    ingredients: "Fresh Apple",
  },
  {
    id: 8,
    name: "Freeze Dried Mixed Berry Snacks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKj7mMd92-KrMceAjedlTqZbsmRHaXnxGkFer-24v4HA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXDmhbiX8oMKu2reZp3TwqrzYmgUdJuenfGqoBC1Byug&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEelnN4dVjXM5K0mLu-NnVAQCmtRlgz82vGkV3dupZLA&s=10",
    ],
    price: "₹249",
    description: "A premium mix of strawberry, blueberry and raspberry freeze dried fruits.",
    details: "Mixed berry freeze dried snacks combine multiple fruits to deliver rich flavour, vibrant colour and powerful nutrients in every bite.",
    weight: "100G Pack",
    benefits: ["Antioxidant Rich", "Vitamin C Source", "No Artificial Flavour", "Healthy Daily Snack"],
    ingredients: "Strawberry, Blueberry, Raspberry",
  },
];

const stats = [
  { icon: Truck, value: "10K+", label: "Orders Delivered" },
  { icon: Clock, value: "30 min", label: "Avg. Delivery Time" },
  { icon: Users, value: "5K+", label: "Happy Customers" },
  { icon: Star, value: "4.8/5", label: "Average Rating" },
];

const ProductCardModalIntegrated = ({ 
  product, 
  delay 
}: { 
  product: (typeof freezeDriedProducts)[number]; 
  delay?: number 
}) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);
  const [hover, setHover] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [mainImage, setMainImage] = React.useState(product.images[0]);
  const { ref, visible } = useReveal();

  const handleAdd = () => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: Number(product.price.replace("₹", "").replace(" / Cup", "")),
      image: product.images[0],
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <>
      <div
        ref={ref}
        style={delay !== undefined ? { animationDelay: `${delay}s` } : undefined}
        className={`reveal ${visible ? "show" : ""} bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full`}
      >
        <div className="w-full h-48 sm:h-56 md:h-60 overflow-hidden relative group">
          <img
            src={product.images[hover]}
            alt={product.name}
            onMouseEnter={() => setHover(product.images.length > 1 ? 1 : 0)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              setMainImage(product.images[0]);
              setOpen(true);
            }}
            className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-2 line-clamp-3">
              {product.description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4 sm:mt-5 pt-2">
            <span className="text-lg sm:text-xl font-bold text-[#F4623A]">
              {product.price}
            </span>

            <button
              onClick={handleAdd}
              className="bg-[#40916C] cursor-pointer text-white px-3 py-2 sm:px-4 rounded-lg flex gap-2 items-center hover:bg-[#1B4332] transition text-sm sm:text-base font-medium"
            >
              {added ? (
                <>
                  <Check size={18} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-8 relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 z-10 transition"
            >
              <X size={20} />
            </button>

            {/* LEFT IMAGE COLUMN */}
            <div className="flex flex-col gap-4">
              <div className="w-full h-64 sm:h-80 md:h-[400px] rounded-xl overflow-hidden bg-gray-50">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain md:object-cover"
                />
              </div>

              <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-1 snap-x scrollbar-thin">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover cursor-pointer border-2 transition-all flex-shrink-0 snap-start ${
                      mainImage === img ? "border-[#40916C] scale-95" : "border-transparent hover:border-[#40916C]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT DETAILS COLUMN */}
            <div className="flex flex-col justify-between h-full pt-2 md:pt-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 pr-8">
                  {product.name}
                </h1>

                <h2 className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3 text-[#40916C]">
                  {product.price}
                </h2>

                <p className="mt-4 text-sm sm:text-base text-gray-600">
                  {product.description}
                </p>

                <div className="mt-4 sm:mt-5">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-800">
                    Product Details
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    {product.details}
                  </p>
                </div>

                <div className="mt-4 space-y-1 text-sm sm:text-base text-gray-700">
                  <p>
                    <b className="font-semibold text-gray-900">Weight:</b> {product.weight}
                  </p>
                  <p>
                    <b className="font-semibold text-gray-900">Ingredients:</b> {product.ingredients}
                  </p>
                </div>

                <h3 className="font-bold text-lg sm:text-xl mt-4 sm:mt-5 text-gray-800">
                  Benefits
                </h3>

                <ul className="mt-2 grid grid-cols-2 gap-1 sm:gap-2">
                  {product.benefits.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm sm:text-base text-[#40916C] flex items-center gap-1"
                    >
                      <span className="text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleAdd}
                className="mt-6 w-full bg-[#40916C] text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-[#1B4332] transition font-medium text-sm sm:text-base shadow-sm"
              >
                <ShoppingCart size={20} />
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const HomePage = () => {
  const hero = useReveal();
  const stats_ = useReveal();
  const router = useRouter();

  return (
    <div className="bg-white overflow-hidden relative">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0); }
        }
        .reveal { opacity: 0; }
        .reveal.show { animation: fadeUp 0.7s ease-out forwards; }
        .float { animation: float 4s ease-in-out infinite; }
        .whatsapp-float { animation: pulseGlow 2s infinite; }
      `}</style>

      {/* Hero */}
      <section
        ref={hero.ref}
        className="relative bg-gradient-to-br from-[#FFF8ED] to-[#FFEFE0] px-6 py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#40916C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F4623A]/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className={`md:w-1/2 reveal ${hero.visible ? "show" : ""}`}>
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-[#1B4332] shadow-sm">
              ✨ 100% Natural, Crunchy & Healthy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] leading-tight mt-5">
              Freeze Dried <span className="text-[#F4623A]">Fruit Snacks</span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-md">
              Enjoy premium freeze-dried fruit snacks packed with natural flavor, vitamins, and zero added sugar.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="cursor-pointer bg-[#40916C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1B4332] transition-colors duration-300"
              >
                Shop Now
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
              src="https://plus.unsplash.com/premium_photo-1663047143135-a5ec1beb91e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
              alt="Freeze dried fruit snacks"
              className="w-full md:w-[420px] mx-auto rounded-[1rem] shadow-xl object-cover h-80 md:h-96"
            />
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

      {/* Freeze Dried Fruits Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto my-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-3xl font-bold text-[#1B4332]">Freeze Dried Fruit Snacks</h2>
            <p className="text-gray-500 mt-1">Healthy crunchy fruit snacks with natural taste</p>
          </div>
          <Link href="/products" className="text-[#F4623A] font-medium hover:underline whitespace-nowrap">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {freezeDriedProducts.map((product, index) => (
            <ProductCardModalIntegrated key={product.id} product={product} delay={index * 0.1} />
          ))}
        </div>
      </section>

      <WhySection />
      <HowItWorks />
      <OrderTrackingBanner />
      <Testimonials />
      <WhatsAppSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-2xl whatsapp-float hover:scale-110 hover:bg-[#20ba5a] transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle size={28} className="sm:w-8 sm:h-8 text-white transition-transform group-hover:rotate-12" />
      </a>
    </div>
  );
};

export default HomePage;