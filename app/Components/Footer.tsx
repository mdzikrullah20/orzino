import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            FreshFruit
          </h2>
          <p className="text-green-100">
            Freshly cut fruit cups delivered to your doorstep.
            Healthy, hygienic and tasty snacks every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-green-100">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/orders">Track Order</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-green-100">
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
          <p className="text-green-100">
            📞 +91 98765 43210
          </p>
          <p className="text-green-100">
            ✉ support@freshfruit.com
          </p>
          <p className="text-green-100">
            📍 Your City, India
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-green-500 mt-8 pt-5 text-center text-green-100">
        © {new Date().getFullYear()} FreshFruit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;