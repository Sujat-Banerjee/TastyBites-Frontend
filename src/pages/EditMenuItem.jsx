import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditMenuItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "Starter",
        price: "",
        availability: true
    });

    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
       const fetchItem = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/menu-items/${id}`
        );

                const item = response.data;

                setForm({
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    price: item.price,
                    availability: item.availability
                });

                setCurrentImage(item.image?.url || "");

            } catch (error) {
                setError("Failed to load menu item");
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

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
        setSaving(true);

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

            await axios.put(
    `${import.meta.env.VITE_API_URL}/api/menu-items/${id}`,
    formData,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            alert("Menu item updated successfully! ✨");

            navigate("/admin/menu");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update menu item"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fff7ed]">
                <div className="text-center">
                    <div className="text-5xl animate-bounce">
                        🍽️
                    </div>

                    <p className="mt-4 font-bold text-lg">
                        Loading your dish...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff7ed] relative overflow-hidden">

            {/* Background decorations */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 -left-32 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>

            {/* Header */}
            <div className="bg-black text-white relative overflow-hidden">

                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-6xl mx-auto px-6 py-12 relative">

                    <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-bold">
                        TastyBites Administration
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black mt-3">
                        Refine Your Dish ✏️
                    </h1>

                    <p className="text-gray-400 mt-3 max-w-2xl">
                        Update the details, pricing or presentation of
                        your menu item.
                    </p>

                </div>
            </div>

            {/* Main */}
            <div className="max-w-6xl mx-auto px-6 py-10 relative">

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Preview Card */}
                    <div className="lg:col-span-1">

                        <div className="bg-black text-white rounded-3xl p-6 shadow-2xl sticky top-28">

                            <p className="text-orange-400 text-xs uppercase tracking-[0.25em] font-bold">
                                Current Dish
                            </p>

                            <h2 className="text-2xl font-black mt-2">
                                {form.name}
                            </h2>

                            <div className="mt-6 overflow-hidden rounded-2xl">

                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="New preview"
                                        className="w-full h-56 object-cover"
                                    />
                                ) : currentImage ? (
                                    <img
                                        src={currentImage}
                                        alt={form.name}
                                        className="w-full h-56 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-56 bg-gray-900 flex items-center justify-center text-6xl">
                                        🍛
                                    </div>
                                )}

                            </div>

                            <div className="flex justify-between items-center mt-5">

                                <span className="text-gray-400">
                                    {form.category}
                                </span>

                                <span className="text-orange-400 font-black text-xl">
                                    ₹{form.price}
                                </span>

                            </div>

                            <div className="mt-4">

                                {form.availability ? (
                                    <span className="inline-flex items-center gap-2 text-green-400 text-sm font-bold">
                                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 text-red-400 text-sm font-bold">
                                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                        Out of Stock
                                    </span>
                                )}

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
                                        Edit Dish Information
                                    </h2>
                                </div>

                                <div className="text-4xl">
                                    ✨
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

                                {/* Current Image */}
                                {currentImage && !preview && (
                                    <div>

                                        <label className="block font-bold text-sm mb-2">
                                            Current Image
                                        </label>

                                        <div className="rounded-2xl overflow-hidden border border-gray-200">

                                            <img
                                                src={currentImage}
                                                alt={form.name}
                                                className="w-full h-52 object-cover"
                                            />

                                        </div>

                                    </div>
                                )}

                                {/* Replace Image */}
                                <div>

                                    <label className="block font-bold text-sm mb-2">
                                        Replace Image
                                    </label>

                                    <div className="border-2 border-dashed border-orange-200 rounded-2xl p-5 bg-orange-50/50">

                                        {preview ? (
                                            <div className="relative">

                                                <img
                                                    src={preview}
                                                    alt="New food preview"
                                                    className="w-full h-52 object-cover rounded-xl"
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
                                            <label className="cursor-pointer block text-center py-6">

                                                <div className="text-4xl mb-2">
                                                    📸
                                                </div>

                                                <p className="font-bold">
                                                    Choose a new image
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
                                        disabled={saving}
                                        className="sm:w-2/3 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-300 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                                    >
                                        {saving
                                            ? "Saving Changes..."
                                            : "Save Changes ✨"}
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

export default EditMenuItem;