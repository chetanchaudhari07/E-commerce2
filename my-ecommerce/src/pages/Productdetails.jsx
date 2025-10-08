import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/action";
import Navbar from "../components/Navbar";

export default function Productdetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <h2 className="text-xl font-medium text-gray-700">Product not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col lg:flex-row gap-8">

                    <div className="flex justify-center lg:w-1/3">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full max-w-xs object-contain"
                        />
                    </div>


                    <div className="lg:w-2/3 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <p className="text-gray-700 mb-6">{product.description}</p>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <span className="text-2xl font-semibold text-gray-900">${product.price}</span>
                            <button
                                className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
                                onClick={() => dispatch(addToCart(product))}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

