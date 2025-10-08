import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/action";
import Navbar from "../components/Navbar";

export default function Cart() {
    const { cart } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const [form, setForm] = useState({ name: "", email: "", address: "" });
    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!form.address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (!validate()) return;

        dispatch(clearCart());
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-96">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank you!</h2>
                    <p className="text-gray-700">Your order has been placed successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

                {cart.length === 0 ? (
                    <p className="text-gray-500 text-lg">No items in cart</p>
                ) : (
                    <>
                        
                        <div className="space-y-6 mb-12">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between bg-white rounded-lg p-4 shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 object-contain rounded"
                                        />
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                                            <p className="text-gray-500">${item.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            {/* Total Price */}
                            <div className="flex justify-end mt-6">
                                <p className="text-xl font-semibold text-gray-900">
                                    Total: ${totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>


                        <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
                            <form onSubmit={handlePlaceOrder} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <textarea
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        rows={3}
                                    ></textarea>
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500"
                                >
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
