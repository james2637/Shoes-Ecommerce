import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/collection", label: "Categories" },
    { to: "/collection", label: "Collections" },
    { to: "/collection", label: "New Arrival" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <button
  onClick={() => setIsOpen(true)}
  className="flex flex-col gap-1 items-center justify-center w-10 h-10 rounded-full border border-gray-200 "
  aria-label="Open menu"
>
  <span className="w-4 h-[2.4px] bg-gray-700 group-hover:bg-white block transition-colors duration-200" />
  <span className="w-4 h-[2.4px] bg-gray-700 group-hover:bg-white block transition-colors duration-200" />
  <span className="w-4 h-[2.4px] bg-gray-700 group-hover:bg-white block transition-colors duration-200" />
</button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col px-6 py-6 gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={label}>
              <NavLink
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 text-sm text-gray-700 border-b border-gray-100 hover:text-black transition-colors group ${
                    isActive ? "font-medium text-black" : ""
                  }`
                }
              >
                <span className="w-0 group-hover:w-4 h-[1.5px] bg-gray-700 transition-all duration-200 ease-out" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}