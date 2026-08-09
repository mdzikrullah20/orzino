"use client";

import React, { useEffect, useState, useRef } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Nav Links
const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Sample Product Search Items
const searchProducts = [
  {
    id: 1,
    name: "Freeze-Dried Jamun Cubes",
    category: "Fruit Cubes",
    price: "₹99",
    img: "https://themoonstore.in/cdn/shop/files/74_1d11451c-e5c5-436f-8063-4d1777528de8.png?v=1783330410&width=540",
  },
  {
    id: 2,
    name: "Crispy Alphonso Mango Slices",
    category: "Crispy Slices",
    price: "₹99",
    img: "https://orzino.com/wp-content/uploads/2026/05/MANGO-SNACKS.jpeg",
  },
  {
    id: 3,
    name: "Berry Mix Crunch Jar",
    category: "Jars",
    price: "₹149",
    img: "https://themoonstore.in/cdn/shop/files/73.png?v=1783330409&width=540",
  },
  {
    id: 4,
    name: "Strawberry Crunch Pouch",
    category: "Pouches",
    price: "₹79",
    img: "https://themoonstore.in/cdn/shop/files/PREKSHA_-web_content_1000_by_1200_1.png?v=1782990986&width=540",
  },
  {
    id: 5,
    name: "Freeze-Dried Blueberry Bites",
    category: "Fruit Cubes",
    price: "₹119",
    img: "https://themoonstore.in/cdn/shop/files/70_d0bd2cdb-5e24-4f7e-82d8-7bd548014028.png?v=1783330409&width=800",
  },
  {
    id: 6,
    name: "Crispy Pineapple Rings",
    category: "Crispy Slices",
    price: "₹89",
    img: "https://themoonstore.in/cdn/shop/files/58.png?v=1782990977&width=800",
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        searchRef.current && !searchRef.current.contains(target) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto focus mobile input when toggled open
  useEffect(() => {
    if (showMobileSearch && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [showMobileSearch]);

  // Filter products by search query
  const filteredSearch = searchProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = () => {
    setIsSearchOpen(false);
    setShowMobileSearch(false);
    setSearchQuery("");
    setOpen(false);
    router.push("/products");
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
    if (open) setOpen(false); 
  };

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    if (showMobileSearch) setShowMobileSearch(false); // Close search if menu is toggled
  };

  return (
    <nav
      className={`sticky top-0 z-50 px-4 sm:px-6 transition-all duration-300 bg-white text-[#181410] ${
        scrolled
          ? "py-2 sm:py-3 shadow-md border-b border-gray-100"
          : "py-3 sm:py-4 border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo Container */}
        <Link href="/" className="cursor-pointer relative block w-10 h-10 sm:w-16 sm:h-16 shrink-0">
          <Image
            src="/logo.png"
            alt="Orzino Logo"
            fill
            sizes="(max-width: 640px) 40px, 64px"
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-7 text-[#181410] font-bold text-[14px] uppercase tracking-wider">
          {links.map((link) => (
            <li key={link.href} className="relative group">
              <Link
                href={link.href}
                className="py-1 transition-colors duration-200 hover:text-[#E8115B]"
              >
                {link.label}
              </Link>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#FFC300] transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Desktop Search Bar with Instant Dropdown */}
        <div ref={searchRef} className="hidden lg:block relative w-64">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder="Search snacks..."
              className="w-full pl-10 pr-8 py-2 bg-black/5 border border-[#FFC300] rounded-full text-xs text-[#181410] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC300] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-gray-400 hover:text-[#181410]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search Live Results Popup - Desktop */}
          {isSearchOpen && searchQuery.trim() !== "" && (
            <div className="absolute top-11 left-0 right-0 bg-[#181410] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {filteredSearch.length > 0 ? (
                <div className="p-2 flex flex-col gap-1">
                  {filteredSearch.map((item) => (
                    <div
                      key={item.id}
                      onClick={handleSelectProduct}
                      className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="relative w-10 h-10 bg-white/10 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-contain p-0.5"
                        />
                      </div>
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-xs font-bold text-white truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-[#FFC300] font-mono font-bold">
                          {item.category} • {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-gray-400">
                  No snacks matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Order Button */}
        <div className="hidden md:block">
          <Link
            href="/products"
            className="cursor-pointer bg-[#FFC300] text-[#181410] px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-black uppercase text-[13px] sm:text-[14px] tracking-wider flex items-center gap-2 hover:bg-[#181410] hover:text-[#FFC300] hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
          >
            <ShoppingBag size={18} />
            Order Now
          </Link>
        </div>

        {/* Mobile Action Controls (Clean Search Icon without yellow BG or X) */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Search Icon Toggle */}
          <button
            onClick={toggleMobileSearch}
            aria-label="Toggle search"
            className="p-2 text-[#181410] hover:text-[#E8115B] transition-colors cursor-pointer"
          >
            <Search size={22} />
          </button>

          {/* Mobile Hamburger Menu Icon Toggle */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-[#181410] p-2 hover:text-[#E8115B] transition-colors cursor-pointer"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      <div
        ref={mobileSearchRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out max-w-6xl mx-auto ${
          showMobileSearch
            ? "max-h-80 mt-2.5 pt-1 border-t border-gray-100 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative flex items-center px-2 py-[2px]">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
          <input
            ref={mobileInputRef}
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            placeholder="Search Jamun, Mango, Berry..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs text-[#181410] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC300] transition-all"
          />
        </div>

        {/* Search Live Results Popup - Mobile */}
        {isSearchOpen && searchQuery.trim() !== "" && (
          <div className="mt-2 bg-[#181410] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto">
            {filteredSearch.length > 0 ? (
              <div className="p-2 flex flex-col gap-1">
                {filteredSearch.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleSelectProduct}
                    className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="relative w-9 h-9 bg-white/10 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-xs font-bold text-white truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#FFC300] font-mono font-bold">
                        {item.category} • {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-gray-400">
                No snacks matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open
            ? "max-h-80 mt-3 opacity-100 border-t border-gray-200 pt-3"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-3 pb-3 text-[#181410] font-bold uppercase text-[14px] tracking-wider">
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              className={`transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-[#E8115B] block py-1 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="bg-[#FFC300] text-[#181410] px-6 py-2.5 rounded-full font-black uppercase text-[14px] tracking-wider w-full mt-2 flex items-center justify-center gap-2 hover:bg-[#181410] hover:text-[#FFC300] transition-colors shadow-md"
          >
            <ShoppingBag size={18} />
            Order Now
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;