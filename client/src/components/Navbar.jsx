import React, { useState, useEffect, useContext } from "react";
import ProductSearch from "./ProductSearch";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import SideDrawer from "./Drawer.jsx";

const promoOffers = [
  "Latest Collection Out Now - Shop the Trend!",
  "Enjoy Flat 5% Cashback On Your Order!",
  "Free Shipping On Orders Above 999/-",
  "Get 10% Off On Your First Purchase!",
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState([]);
  const [mobileSearchLoading, setMobileSearchLoading] = useState(false);
  const [mobileShowDropdown, setMobileShowDropdown] = useState(false);
  // Mobile search handler
  const handleMobileSearch = async () => {
    if (!mobileSearchQuery) {
      setMobileSearchResults([]);
      setMobileShowDropdown(false);
      return;
    }
    setMobileSearchLoading(true);
    setMobileShowDropdown(true);
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${baseUrl}/api/product/search?q=${encodeURIComponent(mobileSearchQuery)}`);
      const data = await res.json();
      setMobileSearchResults(data.products || []);
    } catch (err) {
      setMobileSearchResults([]);
    } finally {
      setMobileSearchLoading(false);
    }
  };

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    if (!mobileShowDropdown) return;
    const handleClick = (e) => {
      if (!e.target.closest(".mobile-navbar-search-box")) {
        setMobileShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileShowDropdown]);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoOffers.length);
    }, 4000); // Change offer every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  // Search handler for navbar search box
  const handleNavbarSearch = async () => {
    if (!searchQuery) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    setSearchLoading(true);
    setShowDropdown(true);
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${baseUrl}/api/product/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch (err) {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e) => {
      if (!e.target.closest(".navbar-search-box")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);
  return (
    <>
      {/* Animated Promotional Bar */}
      {/* <div className="w-full bg-[#9e9181] text-center py-2 text-white text-sm font-medium overflow-hidden h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={promoIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="block"
          >
            {promoOffers[promoIndex]}
          </motion.span>
        </AnimatePresence>
      </div> */}
  <div className="px-4 sm:px-[5vw] md:px-[3vw] lg:px-[3vw] xl:px-[9vw] bg-gray-100">
  <div className="flex items-center justify-between font-medium md:text-sm  lg:text-sm xl:text-base">

        <SideDrawer visible={visible} setVisible={setVisible} />
        <Link to="/">
          <img src={assets.logo} alt="" className="w-32" />
        </Link>
  

      {/*  Search Box (Desktop)
  <div className="hidden md:flex items-center ml-6 navbar-search-box relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              if (!e.target.value) {
                setShowDropdown(false);
                setSearchResults([]);
              }
            }}
            onKeyDown={e => {
              if (e.key === "Enter") handleNavbarSearch();
            }}
            placeholder="Search products..."
            className="border rounded px-14 py-1 text-sm focus:outline-none md:px-6 md:py-1 md:w-40 lg:px-6 lg:py-1 lg:w-40 xl:px-14 xl:py-1 xl:w-auto"
          />
          <button
            className="ml-2 px-3 py-1 bg-gray-700 text-white rounded md:px-2 md:text-xs lg:px-2 lg:text-xs xl:px-3 xl:text-sm"
            onClick={handleNavbarSearch}
          >
            Search
          </button>
          
          {showDropdown && (
            <div className="absolute left-0 top-full mt-2 w-[320px] max-h-[400px] bg-white border rounded shadow-lg z-50 overflow-auto">
              {searchLoading && <div className="p-4 text-center text-gray-500">Loading...</div>}
              {!searchLoading && searchResults.length === 0 && searchQuery && (
                <div className="p-4 text-center text-gray-500">No products found.</div>
              )}
              {!searchLoading && searchResults.length > 0 && (
                <div className="grid grid-cols-1 gap-2 p-2">
                  {searchResults.map(product => (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                      onClick={() => setShowDropdown(false)}
                    >
                      <img src={product.image?.[0] || product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <div className="font-semibold text-sm">{product.name}</div>
                        <div className="text-xs text-gray-600">${product.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div> */}

  <div className="flex items-center gap-6 md:gap-3 lg:gap-3 xl:gap-6">
          {/* Wishlist Icon with label on hover */}
          <div className="flex flex-col gap-1 items-center justify-center w-9 h-9 rounded-full border border-gray-300">
            <Link to="/wishlist">
              <img
                src={assets.wishlist_icon}
                alt="Wishlist"
                className="w-5 cursor-pointer"
              />
            </Link>
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              Wishlist
            </span>
          </div>
           {/* Cart Icon with label on hover */}
          <div className="flex flex-col gap-1 items-center justify-center w-9 h-9 rounded-full border border-gray-300">
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            </Link>
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              Cart
            </span>
          </div>
          {/* Profile Icon with label on hover */}
          <div className="flex flex-col gap-1 items-center justify-center w-9 h-9 rounded-full border border-gray-300">
            <img
              src={assets.profile_icon}
              alt=""
              onClick={() => (token ? null : navigate("/login"))}
              className="w-4 cursor-pointer"
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              Profile
            </span>
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/login")}
                  >
                    My Profile
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/admin/products")}
                  >
                    Manage products
                  </p>
                  <p className="cursor-pointer hover:text-black" onClick={logout}>
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Search Icon (Mobile only) */}
          <div className="relative group flex items-center sm:hidden">
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
              onClick={() => setMobileSearchOpen(v => !v)}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
            {/* Mobile search dropdown below navbar */}
            {mobileSearchOpen && (
              <div className="fixed left-0 right-0 top-24 w-full bg-white border rounded shadow-lg z-50 p-4 mobile-navbar-search-box">
                <input
                  type="text"
                  value={mobileSearchQuery}
                  onChange={e => {
                    setMobileSearchQuery(e.target.value);
                    if (!e.target.value) {
                      setMobileShowDropdown(false);
                      setMobileSearchResults([]);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter") handleMobileSearch();
                  }}
                  placeholder="Search products..."
                  className="border rounded px-3 py-1 w-full text-sm focus:outline-none"
                />
                <button
                  className="mt-2 w-full px-3 py-1 bg-pink-600 text-white rounded"
                  onClick={handleMobileSearch}
                >
                  Search
                </button>
                {/* Dropdown for mobile search results */}
                {mobileShowDropdown && (
                  <div className="mt-2 max-h-[60vh] overflow-auto">
                    {mobileSearchLoading && <div className="p-4 text-center text-gray-500">Loading...</div>}
                    {!mobileSearchLoading && mobileSearchResults.length === 0 && mobileSearchQuery && (
                      <div className="p-4 text-center text-gray-500">No products found.</div>
                    )}
                    {!mobileSearchLoading && mobileSearchResults.length > 0 && (
                      <div className="grid grid-cols-1 gap-2 p-2">
                        {mobileSearchResults.map(product => (
                          <Link
                            to={`/product/${product._id}`}
                            key={product._id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                            onClick={() => {
                              setMobileShowDropdown(false);
                              setMobileSearchOpen(false);
                            }}
                          >
                            <img src={product.image?.[0] || product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                            <div>
                              <div className="font-semibold text-sm">{product.name}</div>
                              <div className="text-xs text-gray-600">${product.price}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <img
            src={assets.menu_icon}
            alt=""
            className="w-5 cursor-pointer sm:hidden"
            onClick={() => setVisible(true)}
          />
        </div>

      </div>
      {/* ...existing code... */}
      </div>
    </>
  );
};

export default Navbar;
