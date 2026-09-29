import React, { useContext, useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSellerProducts(bestProduct);
  }, [products]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="px-1 py-4 bg-gray-100">
      <div className="text-center py-4">
				<h2 className="text-3xl font-bold text-gray-700 pb-2">Shop From Our Best Sellers</h2>
			</div>

      {/* Scroll Container with Arrow Buttons */}
      <div className="relative px-4">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={24} className="text-gray-900" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 px-12 overflow-x-auto scroll-smooth scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {bestSellerProducts.map((item) => (
            <div key={item._id} className="flex-shrink-0 w-82">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                sizes={item.sizes || []}
                color={item.color || []}
                brand={item.brand || ""}
                description={item.description || ""}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BestSeller;
