import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddMenuItem() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "Starter",
        price: "",
        availability: true
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("category", form.category);
            formData.append("price", form.price);
            formData.append("availability", form.availability);

            if (image) {
                formData.append("image", image);
            }

            await axios.post(
    `${import.meta.env.VITE_API_URL}/api/menu-items`,
    formData,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            alert("Menu item added successfully! 🍽️");

            navigate("/admin/menu");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to add menu item"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fff7ed] relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 -left-32 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>

            {/* Header */}
            <div className="bg-black text-white relative overflow-hidden">

                <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-6xl mx-auto px-6 py-12 relative">

                    <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-bold">
                        TastyBites Administration
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black mt-3">
                        Create a New Dish 🍽️
                    </h1>

                    <p className="text-gray-400 mt-3 max-w-2xl">
                        Add a delicious new item to your TastyBites menu.
                        Give customers something new to crave.
                    </p>

                </div>
            </div>

            {/* Main */}
            <div className="max-w-6xl mx-auto px-6 py-10 relative">

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Info Card */}
                    <div className="lg:col-span-1">

                        <div className="bg-black text-white rounded-3xl p-7 shadow-2xl sticky top-28">

                            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                                ✨
                            </div>

                            <h2 className="text-2xl font-black">
                                Make it tempting.
                            </h2>

                            <p className="text-gray-400 mt-3 leading-relaxed">
                                Great food deserves a great presentation.
                                Add a clear name, tasty description and
                                beautiful image.
                            </p>

                            <div className="mt-8 space-y-4">

                                <div className="flex gap-3 items-center">
                                    <span className="text-orange-400">✓</span>
                                    <span className="text-sm text-gray-300">
                                        High-quality food image
                                    </span>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <span className="text-orange-400">✓</span>
                                    <span className="text-sm text-gray-300">
                                        Accurate pricing
                                    </span>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <span className="text-orange-400">✓</span>
                                    <span className="text-sm text-gray-300">
                                        Correct availability
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 md:p-9">

                            <div className="flex justify-between items-center mb-8">

                                <div>
                                    <p className="text-orange-500 font-bold text-sm">
                                        MENU MANAGEMENT
                                    </p>

                                    <h2 className="text-2xl font-black mt-1">
                                        Dish Information
                                    </h2>
                                </div>

                                <div className="text-4xl">
                                    🍛
                                </div>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* Name */}
                                <div>
                                    <label className="block font-bold text-sm mb-2">
                                        Dish Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="e.g. Chicken Biryani"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block font-bold text-sm mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        placeholder="Describe the dish, ingredients and flavour..."
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
                                    />
                                </div>

                                {/* Category + Price */}
                                <div className="grid md:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block font-bold text-sm mb-2">
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                        >
                                            <option value="Starter">
                                                Starter
                                            </option>

                                            <option value="Main Course">
                                                Main Course
                                            </option>

                                            <option value="Dessert">
                                                Dessert
                                            </option>

                                            <option value="Beverage">
                                                Beverage
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-sm mb-2">
                                            Price (₹)
                                        </label>

                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="299"
                                            min="0"
                                            value={form.price}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                        />
                                    </div>

                                </div>

                                {/* Availability */}
                                <div>
                                    <label className="block font-bold text-sm mb-2">
                                        Availability
                                    </label>

                                    <select
                                        name="availability"
                                        value={form.availability}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                availability:
                                                    e.target.value === "true"
                                            })
                                        }
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                    >
                                        <option value="true">
                                            🟢 In Stock
                                        </option>

                                        <option value="false">
                                            🔴 Out of Stock
                                        </option>
                                    </select>
                                </div>

                                {/* Image */}
                                <div>

                                    <label className="block font-bold text-sm mb-2">
                                        Food Image
                                    </label>

                                    <div className="border-2 border-dashed border-orange-200 rounded-2xl p-6 bg-orange-50/50">

                                        {preview ? (
                                            <div className="relative">

                                                <img
                                                    src={preview}
                                                    alt="Food preview"
                                                    className="w-full h-56 object-cover rounded-xl shadow-md"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImage(null);
                                                        setPreview("");
                                                    }}
                                                    className="absolute top-3 right-3 bg-black/80 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-500 transition"
                                                >
                                                    Remove
                                                </button>

                                            </div>
                                        ) : (
                                            <label className="cursor-pointer block text-center py-8">

                                                <div className="text-5xl mb-3">
                                                    📸
                                                </div>

                                                <p className="font-bold">
                                                    Upload food image
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    PNG, JPG or JPEG · Max 5MB
                                                </p>

                                                <span className="inline-block mt-4 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-500 transition">
                                                    Choose Image
                                                </span>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />

                                            </label>
                                        )}

                                    </div>

                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                                        ⚠️ {error}
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-3">

                                    <button
                                        type="button"
                                        onClick={() => navigate("/admin/menu")}
                                        className="sm:w-1/3 border border-gray-200 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition"
                                    >
                                        ← Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="sm:w-2/3 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-300 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                                    >
                                        {loading
                                            ? "Adding Dish..."
                                            : "Add Menu Item 🍽️"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AddMenuItem;