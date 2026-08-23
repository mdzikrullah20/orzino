"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Menu, X, ShoppingBag, Search, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ============================================================
// TYPES & CONSTANTS
// ============================================================

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  img: string;
}

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SEARCH_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Freeze-Dried Jamun Cubes",
    category: "Fruit Cubes",
    price: "₹149",
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

// ============================================================
// NAVBAR COMPONENT
// ============================================================

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // Load and sync cart count dynamic state
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const cartItems = JSON.parse(storedCart);
          const total = Array.isArray(cartItems)
            ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
            : 0;
          setCartCount(total);
        } catch {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Handle Navbar Background Scroll Effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search menu on Outside Click or Escape Key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !searchRef.current?.contains(target) &&
        !mobileSearchRef.current?.contains(target)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto focus mobile search input when activated
  useEffect(() => {
    if (showMobileSearch) {
      mobileInputRef.current?.focus();
    }
  }, [showMobileSearch]);

  const filteredSearch = SEARCH_PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = useCallback(
    (productId: number) => {
      setIsSearchOpen(false);
      setShowMobileSearch(false);
      setSearchQuery("");
      setOpen(false);
      router.push(`/products/${productId}`);
    },
    [router]
  );

  const toggleMobileSearch = useCallback(() => {
    setShowMobileSearch((prev) => !prev);
    if (open) setOpen(false);
  }, [open]);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
    if (showMobileSearch) setShowMobileSearch(false);
  }, [showMobileSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearchOpen(false);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 px-4 sm:px-6 transition-all duration-300 bg-white text-[#181410] ${
        scrolled
          ? "py-2 sm:py-3 shadow-md border-b border-gray-100"
          : "py-3 sm:py-4 border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link
          href="/"
          className="cursor-pointer relative block w-10 h-10 sm:w-16 sm:h-16 shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Orzino Logo"
            fill
            sizes="(max-width: 640px) 40px, 64px"
            className="object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex items-center gap-7 text-[#181410] font-bold text-[14px] uppercase tracking-wider">
          {LINKS.map((link) => (
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

        {/* DESKTOP SEARCH + ACCOUNT + CART */}
        <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
          <div ref={searchRef} className="relative w-full max-w-[500px]">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder="Search For Anything..."
                className="w-full h-10 pl-8 pr-12 bg-[#f5f5f5] border-none rounded-[9px] text-[13px] text-[#181410] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#FFC300]"
              />
              <Search
                size={21}
                strokeWidth={2}
                className="absolute right-4 text-[#181410] pointer-events-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-11 text-gray-400 hover:text-[#181410] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* DESKTOP SEARCH RESULTS */}
            {isSearchOpen && searchQuery.trim() !== "" && (
              <div className="absolute top-12 left-0 right-0 bg-[#181410] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] max-h-80 overflow-y-auto">
                {filteredSearch.length > 0 ? (
                  <div className="p-2 flex flex-col gap-1">
                    {filteredSearch.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectProduct(item.id)}
                        className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="relative w-10 h-10 bg-white/10 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                          <span className="text-xs font-bold text-white truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#FFC300] font-bold">
                            {item.category} • {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-400">
                    No snacks matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            href="/account"
            aria-label="Account"
            className="shrink-0 w-9 h-9 flex items-center justify-center text-[#181410] hover:text-[#E8115B] transition-colors"
          >
            <UserRound size={21} strokeWidth={1.7} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative shrink-0 w-9 h-9 flex items-center justify-center text-[#181410] hover:text-[#E8115B] transition-colors"
          >
            <ShoppingBag size={21} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-[#D96A2B] text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-0.5 md:hidden">
          <button
            type="button"
            onClick={toggleMobileSearch}
            aria-label="Toggle search"
            className="p-2 text-[#181410] hover:text-[#E8115B] transition-colors cursor-pointer"
          >
            <Search size={21} strokeWidth={1.8} />
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className="p-2 text-[#181410] hover:text-[#E8115B] transition-colors"
          >
            <UserRound size={21} strokeWidth={1.8} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative p-2 text-[#181410] hover:text-[#E8115B] transition-colors"
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 min-w-[17px] h-[17px] px-1 rounded-full bg-[#D96A2B] text-white text-[8px] font-bold flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="p-2 text-[#181410] hover:text-[#E8115B] transition-colors cursor-pointer"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
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
            placeholder="Search For Anything..."
            className="w-full pl-10 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs text-[#181410] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC300] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 text-gray-400 hover:text-[#181410] cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* MOBILE SEARCH RESULTS */}
        {isSearchOpen && searchQuery.trim() !== "" && (
          <div className="mt-2 bg-[#181410] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto">
            {filteredSearch.length > 0 ? (
              <div className="p-2 flex flex-col gap-1">
                {filteredSearch.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer"
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
                No snacks matching "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open
            ? "max-h-80 mt-3 opacity-100 border-t border-gray-200 pt-3"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-3 pb-3 text-[#181410] font-bold uppercase text-[14px] tracking-wider">
          {LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{
                transitionDelay: open ? `${i * 50}ms` : "0ms",
              }}
              className={`transition-all duration-300 ${
                open
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;