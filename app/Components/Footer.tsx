import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            FreshFruit
          </h2>
          <p className="text-gray-800">
            Premium freeze-dried fruit snacks delivered to your doorstep.
            Healthy, crispy and tasty snacks every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-800">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            {/* <li><a href="/orders" className="hover:underline">Track Order</a></li> */}
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-gray-800">
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Contact Us
          </h3>
          <p className="text-gray-800">
            📞 +91 8757726925
          </p>
          <p className="text-gray-800">
            ✉ support@freshfruit.com
          </p>
          <p className="text-gray-800">
            📍 Noida, Uttar Pradesh, India
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-[#40916C]/40 mt-8 pt-5 text-center text-gray-800">
        © {new Date().getFullYear()} FreshFruit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;