"use client";
import React from "react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

const CartDrawer = () => {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    closeDrawer();
    router.push("/checkout");
  };

  return (
    <>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[70] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="font-semibold text-lg text-[#1B4332] flex items-center gap-2">
            <ShoppingBag size={20} />
            Your Cart {totalItems > 0 && `(${totalItems})`}
          </h3>
          <button onClick={closeDrawer} className="text-gray-400 hover:text-[#1A1A1A] transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-2">
              <ShoppingBag size={40} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-[#1A1A1A] text-sm">{item.name}</p>
                    <p className="text-[#F4623A] font-semibold text-sm mt-0.5">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="cursor-pointer w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-200"
                      >
                        <Minus size={12} className="text-black" />
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="cursor-pointer w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-200"
                      >
                        <Plus size={12} className="text-black" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-[#F4623A] transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-lg text-[#1B4332]">₹{totalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="cursor-pointer w-full bg-[#40916C] text-white py-3 rounded-full font-medium hover:bg-[#1B4332] transition-colors duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;