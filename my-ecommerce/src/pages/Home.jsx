import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../store/action";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { products } = useSelector((state) => state.product);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";
    const categoryQuery = queryParams.get("category") || "";

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        let tempProducts = products;


        if (searchQuery) {
            tempProducts = tempProducts.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }


        if (categoryQuery) {
            tempProducts = tempProducts.filter(
                (product) => product.category === categoryQuery
            );
        }

        setFilteredProducts(tempProducts);
    }, [products, searchQuery, categoryQuery]);

    return (
        <div className="bg-white">
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
                    All Products
                </h2>

                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative cursor-pointer border rounded-lg p-4 hover:shadow-md transition"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">{product.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        ${product.price}
                                    </p>
                                </div>
                                <button
                                    className="mt-3 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(addToCart(product));
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
