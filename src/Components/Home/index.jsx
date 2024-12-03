import { useState } from "react";
import Billing from "../Billing";

export default function Home() {
    const [size, setSize] = useState("");
    const [toppings, setToppings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [receipt, setReceipt] = useState("");

    const availableToppings = [
        "Cheese",
        "Pepperoni",
        "Ham",
        "Pineapple",
        "Sausage",
        "Feta Cheese",
        "Tomatoes",
        "Olives",
    ];

    const addOrder = () => {
        if (!size) {
            alert("Please select a pizza size.");
            return;
        }

        setOrders([...orders, { size, toppings }]);
        setSize("");
        setToppings([]);
    };

    const toggleTopping = (topping) => {
        setToppings((prevToppings) =>
            prevToppings.includes(topping)
                ? prevToppings.filter((t) => t !== topping)
                : [...prevToppings, topping]
        );
    };

    const generateReceipt = () => {
        const formattedOrders = orders.map(
            (order) =>
                `${order.size} - ${order.toppings.length > 0 ? order.toppings.join(", ") : ""}`
        );
        const receiptOutput = Billing.generateReceipt(formattedOrders);
        setReceipt(receiptOutput);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Pizza Palace Billing System
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Order Form */}
                    <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Order</h2>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-2">Select Pizza Size:</label>
                            <select
                                className="w-full p-2 bg-white border border-gray-300 focus:border-gray-500 rounded-lg"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value="">Select size</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-2">Select Toppings:</label>
                            <div className="flex flex-wrap gap-2">
                                {availableToppings.map((topping) => (
                                    <label key={topping} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={toppings.includes(topping)}
                                            onChange={() => toggleTopping(topping)}
                                        />
                                        {topping}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            className="bg-blue-500 text-white px-8 py-2 rounded-lg shadow hover:bg-blue-600"
                            onClick={addOrder}
                        >
                            Add Order
                        </button>
                    </div>

                    {/* Right: Order List */}
                    <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order List</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            {orders.map((order, index) => (
                                <li key={index} className="text-gray-800">
                                    {order.size} - {order.toppings.join(", ") || "No toppings"}
                                </li>
                            ))}
                        </ul>

                        {orders.length === 0 && (
                            <p className="text-gray-500">No orders yet. Add an order to see it here.</p>
                        )}
                    </div>
                </div>

                {/* Receipt Section */}
                <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Receipt</h2>
                    <button
                        className="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg shadow hover:bg-green-600"
                        onClick={generateReceipt}
                    >
                        Generate Receipt
                    </button>
                    <pre className="bg-white p-4 rounded-lg border border-gray-300 text-gray-800">
                        {receipt || "No receipt generated yet."}
                    </pre>
                </div>
            </div>
        </div>
    );
}
