import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MenuDetails() {
    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const fetchItem = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/menu-items/${id}`
        );

                setItem(response.data);
            } catch (error) {
                console.error("Failed to load item:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl animate-bounce">
                        🍳
                    </div>

                    <p className="mt-5 font-semibold text-gray-500">
                        Preparing your dish...
                    </p>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center px-6">
                <div className="text-center">
                    <div className="text-7xl">
                        🍽️
                    </div>

                    <h1 className="text-3xl font-black mt-5">
                        Dish not found
                    </h1>

                    <p className="text-gray-500 mt-2">
                        We couldn't find the dish you're looking for.
                    </p>

                    <Link
                        to="/menu"
                        className="inline-block mt-7 bg-orange-500 text-white px-6 py-3 rounded-xl font-bold"
                    >
                        ← Back to Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff7ed]">

            {/* TOP DARK SECTION */}
            <section className="bg-gray-950 text-white relative overflow-hidden">

                <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -top-40 -right-20"></div>

                <div className="absolute w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl -bottom-40 -left-20"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-8">

                    <Link
                        to="/menu"
                        className="text-gray-400 hover:text-orange-400 transition"
                    >
                        ← Back to Menu
                    </Link>

                    <p className="text-orange-400 uppercase tracking-[0.25em] text-sm font-bold mt-12">
                        {item.category}
                    </p>

                    <h1 className="text-5xl md:text-6xl font-black mt-3">
                        {item.name}
                    </h1>

                </div>

            </section>


            {/* DETAILS */}
            <section className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* IMAGE */}
                    <div className="relative">

                        <div className="absolute inset-0 bg-orange-300/20 rounded-[40px] blur-2xl"></div>

                        <div className="relative bg-white rounded-[40px] p-4 shadow-2xl">

                            {item.image?.url ? (
                                <img
                                    src={item.image.url}
                                    alt={item.name}
                                    className="w-full h-[450px] object-cover rounded-[32px]"
                                />
                            ) : (
                                <div className="w-full h-[450px] bg-orange-100 rounded-[32px] flex items-center justify-center text-9xl">
                                    🍽️
                                </div>
                            )}

                        </div>

                        {/* Floating category */}
                        <div className="absolute -bottom-5 left-8 bg-white px-5 py-3 rounded-2xl shadow-xl">
                            <p className="text-xs text-gray-400 uppercase font-bold">
                                Category
                            </p>

                            <p className="font-black text-orange-500">
                                {item.category}
                            </p>
                        </div>

                    </div>


                    {/* INFORMATION */}
                    <div>

                        <div className="flex items-center gap-3">

                            <span
                                className={`px-4 py-2 rounded-full text-sm font-bold ${
                                    item.availability
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {item.availability
                                    ? "● Available"
                                    : "● Currently Unavailable"}
                            </span>

                            <span className="text-yellow-500">
                                ★★★★★
                            </span>

                        </div>


                        <h2 className="text-4xl md:text-5xl font-black mt-6">
                            {item.name}
                        </h2>


                        <p className="text-gray-500 text-lg leading-relaxed mt-6">
                            {item.description}
                        </p>


                        <div className="mt-9 bg-white rounded-3xl p-6 shadow-sm border border-orange-100">

                            <p className="text-sm text-gray-400 uppercase font-bold">
                                Price
                            </p>

                            <div className="flex items-center justify-between mt-2">

                                <span className="text-4xl font-black">
                                    ₹{item.price}
                                </span>

                                <span className="text-gray-400">
                                    per serving
                                </span>

                            </div>

                        </div>


                        <Link
                            to="/menu"
                            className="inline-block mt-7 bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg premium-button"
                        >
                            ← Explore More Dishes
                        </Link>

                    </div>

                </div>

            </section>


            {/* BOTTOM */}
            <section className="bg-white py-16">

                <div className="max-w-5xl mx-auto px-6 text-center">

                    <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">
                        TastyBites promise
                    </p>

                    <h2 className="text-3xl md:text-4xl font-black mt-3">
                        Every bite should be worth remembering.
                    </h2>

                    <p className="text-gray-500 mt-4">
                        Discover more flavours from our carefully curated menu.
                    </p>

                </div>

            </section>

        </div>
    );
}

export default MenuDetails;