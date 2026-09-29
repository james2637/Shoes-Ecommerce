import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
	const { products } = useContext(ShopContext);
	const [latestProducts, setLatestProducts] = useState([]);

	useEffect(() => {
		setLatestProducts(products.slice(0, 12));
	}, [products]);

	return (
		<div className="px-1 py-2 bg-gray-100">
			<div className="text-center py-4">
				<h2 className="text-3xl font-bold text-gray-900 pb-4">Explore Our Latest Collection</h2>
			</div>
			{/* Rendering Products */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
				{latestProducts.map((item) => (
					<ProductItem
						id={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
						sizes={item.sizes || []}
						colors={item.colors || []}
						key={item._id}
					/>
				))}
			</div>
		</div>
	);
};

export default LatestCollection;
