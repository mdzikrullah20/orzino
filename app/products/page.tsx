"use client";

import React from "react";
import { ShoppingCart, Check, X } from "lucide-react";
import { useCart } from "../Components/CartContext";

const products = [
  {
    id: 1,
    name: "Freeze Dried Strawberry Snacks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Kr2YYfOAwYXe5QA9HFO9LXfkJ81yH8FIX6GIdd9ZXA&s=10  ",
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
  description:
    "Crispy apple rings made from fresh apples, perfect as a healthy snack.",
  details:
    "Premium freeze dried apple rings maintain the natural sweetness and crunch of fresh apples without frying or preservatives.",
  weight: "50G Pack",
  benefits: [
    "High Fibre",
    "Low Fat Snack",
    "No Preservatives",
    "Rich in Antioxidants",
  ],
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
  description:
    "A premium mix of strawberry, blueberry and raspberry freeze dried fruits.",
  details:
    "Mixed berry freeze dried snacks combine multiple fruits to deliver rich flavour, vibrant colour and powerful nutrients in every bite.",
  weight: "100G Pack",
  benefits: [
    "Antioxidant Rich",
    "Vitamin C Source",
    "No Artificial Flavour",
    "Healthy Daily Snack",
  ],
  ingredients:
    "Strawberry, Blueberry, Raspberry",
},
];

const ProductCard = ({ product }: { product: (typeof products)[number] }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);
  const [hover, setHover] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [mainImage, setMainImage] = React.useState(product.images[0]);

  const handleAdd = () => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: Number(product.price.replace("₹", "")),
      image: product.images[0],
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full">
        <div className="w-full h-48 sm:h-56 md:h-60 overflow-hidden relative">
          <img
            src={product.images[hover]}
            alt={product.name}
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              setMainImage(product.images[0]);
              setOpen(true);
            }}
            className="w-full h-full object-cover cursor-pointer transition duration-300"
          />
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
              {product.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 line-clamp-3">
              {product.description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4 sm:mt-5 pt-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {product.price}
            </span>

            <button
              onClick={handleAdd}
              className="bg-orange-600 text-white px-3 py-2 sm:px-4 rounded-lg flex gap-2 items-center hover:bg-orange-700 transition text-sm sm:text-base font-medium"
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
                      mainImage === img ? "border-green-600 scale-95" : "border-transparent hover:border-green-500"
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

                <h2 className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3 text-green-700">
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
                      className="text-sm sm:text-base text-green-700 flex items-center gap-1"
                    >
                      <span className="text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleAdd}
                className="mt-6 w-full bg-green-700 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-green-800 transition font-medium text-sm sm:text-base shadow-sm"
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

export default function Products() {
  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 tracking-tight">
          Our Freeze Dried Fruits
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3">
          Healthy crunchy fruit snacks with natural taste.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}