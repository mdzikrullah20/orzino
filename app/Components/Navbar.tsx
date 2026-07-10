"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Track Order", href: "/orders" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 px-6 transition-all duration-300 ${
        scrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-md" : "py-5 bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 text-[#1A1A1A] font-medium">
          {links.map((link) => (
            <li key={link.href} className="relative group">
              <a href={link.href} className="py-1 transition-colors duration-200 group-hover:text-[#F4623A]">
                {link.label}
              </a>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#F4623A] transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button className="cursor-pointer bg-[#40916C] text-white px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-[#1B4332] transition-colors duration-300">
            <ShoppingBag size={18} />
            Order Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#1B4332]" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-80 mt-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 pb-4 text-[#1A1A1A] font-medium">
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}
            >
              <a href={link.href} onClick={() => setOpen(false)} className="hover:text-[#F4623A]">
                {link.label}
              </a>
            </li>
          ))}
          <button className="bg-[#40916C] text-white px-6 py-2.5 rounded-full font-medium w-full mt-1 cursor-pointer">
            Order Now
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;