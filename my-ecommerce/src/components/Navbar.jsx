import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/action";

export default function Navbar() {
    const cart = useSelector((state) => state.product.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products/categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = () => {

        navigate(`/?search=${search}&category=${selectedCategory}`);
    };

    return (
        <nav className="bg-gray-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link to="/" className="font-bold text-lg text-gray-900">
                    Home
                </Link>
                <Link to="/cart" className="font-bold text-lg text-gray-900">
                    Cart ({cart.length})
                </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2">

                {/* <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                /> */}


                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleSearch}
                    className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-500"
                >
                    Search
                </button>
            </div>
        </nav>
    );
}
