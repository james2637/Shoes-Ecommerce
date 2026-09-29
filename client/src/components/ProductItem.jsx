import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { Heart, ShoppingBag } from "lucide-react";

const ProductItem = ({ id, image, name, price, sizes = [], color = [], brand = "", description = "" }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Color mapping - convert color names to hex
  const colorClassMap = {
  White: 'bg-white',
  Blue: 'bg-blue-600',
  Black: 'bg-black',
  Red: 'bg-red-500',
  Green: 'bg-green-500',
  Yellow: 'bg-yellow-500',
  Gray: 'bg-gray-500',
  Pink: 'bg-pink-500',
  Purple: 'bg-purple-500',
};

  
  const colorClass = (colorName) => {
    return colorClassMap[colorName] || 'bg-gray-500'; // Default gray if not found
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(id, selectedSize);
    toast.success("Added to cart!");
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleViewProduct = () => {
    navigate(`/product/${id}`);
  };

  // Truncate description to one line
  const truncateDescription = (text) => {
    if (!text) return "Premium quality shoes";
    return text.length > 50 ? text.substring(0, 50) + "..." : text;
  };

  return (
    <div className="bg-white rounded-3xl p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight pr-2">
            {name}
          </h3>
          <p className="text-lg font-bold text-gray-900 whitespace-nowrap">
            {currency}{price}
          </p>
        </div>
      </div>

      {/* Color Dots */}
      <div className="flex space-x-2 mb-6">
  {color.length > 0 ? (
    color.map((colorName, index) => (
      <div
        key={index}
        className={`w-4 h-4 rounded-full cursor-pointer hover:scale-110 transition-transform ring-1 ring-gray-300 ${colorClassMap[colorName] || 'bg-gray-500'}`}
        title={colorName}
      />
    ))
  ) : (
    // fallback
       <>
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <div className="w-4 h-4 rounded-full bg-blue-500" />
          </>
 )}
</div>

      {/* Shoe Image */}
      <div className="mb-6 flex items-center justify-center h-48 relative group">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={handleViewProduct}
        />
      </div>

      {/* View Details Button */}
      {/* <button
        onClick={handleViewProduct}
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Details
      </button> */}

      {/* Size Selection and Actions - All in one line */}
      <div className="flex items-center gap-2">
        {/* Size Buttons */}
        <div className="flex flex-shrink-0">
          {sizes && sizes.length > 0 ? (
            sizes.slice(0, 3).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 m-0.5 rounded-lg font-medium text-sm transition-all flex-shrink-0 ${
                  selectedSize === size
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-300'
                }`}
              >
                {size}
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-500">No sizes</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0 ml-auto">
          <button
            onClick={toggleFavorite}
            className="w-10 h-10  rounded-lg flex items-center justify-end  transition-colors flex-shrink-0"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}
            />
          </button>
          <button 
            onClick={handleAddToBag}
            className="px-2 h-10 bg-gray-100 rounded-lg flex items-center space-x-2 hover:bg-gray-900 hover:text-white transition-all group flex-shrink-0"
          >
            <span className="text-sm font-medium whitespace-nowrap">Add to Bag</span>
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

    
    </div>
  );
};

export default ProductItem;
