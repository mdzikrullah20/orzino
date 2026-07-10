import React from "react";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Fresh Mango Cup",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078",
    price: "₹80",
    description: "Sweet and fresh seasonal mango pieces.",
  },
  {
    id: 2,
    name: "Mixed Fruit Cup",
    image:
      "https://images.unsplash.com/photo-1519996529931-28324d5a630e",
    price: "₹120",
    description: "A healthy mix of fresh seasonal fruits.",
  },
  {
    id: 3,
    name: "Watermelon Cup",
    image:
      "https://images.unsplash.com/photo-1563114773-84221bd62daa",
    price: "₹50",
    description: "Refreshing and juicy watermelon slices.",
  },
  {
    id: 4,
    name: "Pineapple Cup",
    image:
      "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1",
    price: "₹70",
    description: "Freshly cut pineapple pieces.",
  },
  {
    id: 5,
    name: "Apple Fruit Cup",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    price: "₹100",
    description: "Crisp and fresh apple slices.",
  },
  {
    id: 6,
    name: "Healthy Fruit Bowl",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
    price: "₹150",
    description: "Premium fruit bowl for a healthy lifestyle.",
  },
];

const Products = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          Our Fresh Fruits
        </h1>
        <p className="text-gray-600 mt-3">
          Freshly cut fruits packed with hygiene and care.
        </p>
      </div>


      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-semibold">
                {product.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-5">

                <span className="text-green-600 text-xl font-bold">
                  {product.price}
                </span>

                <button
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <ShoppingCart size={18} />
                  Add
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Products;