import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar2() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimerRef = useRef(null);

  // Mobile
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState([]);
  const [mobileSearchLoading, setMobileSearchLoading] = useState(false);
  const [mobileShowDropdown, setMobileShowDropdown] = useState(false);
  const mobileSearchTimerRef = useRef(null);

  const baseUrl = import.meta.env.VITE_API_URL || "";

  const handleNavbarSearch = async () => {
    if (!searchQuery) { setSearchResults([]); setShowDropdown(false); return; }
    setSearchLoading(true); setShowDropdown(true);
    try {
      const res = await fetch(`${baseUrl}/api/product/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch { setSearchResults([]); } finally { setSearchLoading(false); }
  };

  const handleMobileSearch = async () => {
    if (!mobileSearchQuery) { setMobileSearchResults([]); setMobileShowDropdown(false); return; }
    setMobileSearchLoading(true); setMobileShowDropdown(true);
    try {
      const res = await fetch(`${baseUrl}/api/product/search?q=${encodeURIComponent(mobileSearchQuery)}`);
      const data = await res.json();
      setMobileSearchResults(data.products || []);
    } catch { setMobileSearchResults([]); } finally { setMobileSearchLoading(false); }
  };

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!showDropdown) return;
    const handler = (e) => { if (!e.target.closest(".navbar-search-box")) setShowDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showDropdown]);

  // Close mobile dropdown on outside click
  useEffect(() => {
    if (!mobileShowDropdown) return;
    const handler = (e) => { if (!e.target.closest(".mobile-search-box")) setMobileShowDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileShowDropdown]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      if (mobileSearchTimerRef.current) clearTimeout(mobileSearchTimerRef.current);
    };
  }, []);

  const navLinks = [
    { to: "/collection?cat=men", label: "Men" },
    { to: "/collection?cat=women", label: "Woman" },
    { to: "/collection?cat=children", label: "Children" },
	{ to: "/collection?cat=Sport Wear", label: "Sport Wear" },
	{ to: "/collection?cat=Sneakers", label: "Sneakers" },
    { to: "/collection?cat=new", label: "New Collection" },
    { to: "/collection?cat=popular", label: "Popular" },
  ];

  const SearchDropdown = ({ results, loading, query }) => (
    <div className="absolute top-full left-0 mt-2 w-[290px] bg-white border border-gray-200 rounded shadow-xl z-50" style={{ fontFamily: "Outfit, sans-serif" }}>
      <div className="max-h-[340px] overflow-auto">
        {loading && <div className="p-3 text-center text-gray-500 text-[13px]">Loading...</div>}
        {!loading && results.length === 0 && query && (
          <div className="p-3 text-center text-gray-500 text-[13px]">No products found.</div>
        )}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 gap-1.5 p-1.5">
            {results.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded"
                onClick={() => { setShowDropdown(false); setMobileShowDropdown(false); setSearchQuery(""); setMobileSearchQuery(""); }}
              >
                <img src={product.image?.[0] || product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                <div>
                  <div className="font-semibold text-[13px] text-gray-800">{product.name}</div>
                  <div className="text-[10px] text-gray-600">${product.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ─── DESKTOP NAVBAR ─── */}
      <nav className="hidden md:flex items-center gap-8 bg-gray-900 font-bold px-20 py-2.5 w-full text-sm text-white">

        {/* Nav links */}
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `whitespace-nowrap transition-colors hover:text-blue-400 focus:text-blue-500 rounded-full border border-gray-600 px-3 py-1 `
            }
          >
            {label}	
          </NavLink>
        ))}

        {/* Inline search */}
        <div className="relative navbar-search-box flex items-center gap-1.5 ml-1 rounded-full border border-gray-700 px-2 py-1 text-sm">
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              if (!val) { setSearchResults([]); if (searchTimerRef.current) { clearTimeout(searchTimerRef.current); searchTimerRef.current = null; } return; }
              setShowDropdown(true);
              if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
              searchTimerRef.current = setTimeout(() => { handleNavbarSearch(); searchTimerRef.current = null; }, 1000);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchTimerRef.current) { clearTimeout(searchTimerRef.current); searchTimerRef.current = null; }
                handleNavbarSearch();
              }
            }}
            placeholder="Search "
            className="bg-transparent focus:outline-none text-white text-sm w-72 pb-0.5 placeholder-white transition-colors"
          />
          <button onClick={handleNavbarSearch} aria-label="Search" className="text-white hover:text-white transition-colors rounded-full p-1 bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>

          {showDropdown && <SearchDropdown results={searchResults} loading={searchLoading} query={searchQuery} />}
        </div>

        {/* Right links */}
        <NavLink to="/about" className={({ isActive }) =>
              `whitespace-nowrap transition-colors hover:text-blue-400 focus:text-blue-500  rounded-full border border-gray-700 px-3 py-1 text-sm${isActive ? "text-white" : "text-gray-300"}`}
            >About</NavLink>
        <NavLink to="/faq" className={({ isActive }) =>
              `whitespace-nowrap transition-colors hover:text-blue-400 focus:text-blue-500  rounded-full border border-gray-700 px-3 py-1 text-sm${isActive ? "text-white" : "text-gray-300"}`
            }>FAQ's</NavLink>
      </nav>


    
    </>
  );
}