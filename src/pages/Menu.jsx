import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/menu-items`
    );

                setMenuItems(response.data);
            } catch (error) {
                console.error("Failed to load menu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const filteredItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#fff7ed]">

            {/* HERO */}
            <section className="relative overflow-hidden bg-gray-950 text-white">

                <div className="absolute w-80 h-80 bg-orange-500/20 rounded-full blur-3xl -top-32 -right-20"></div>

                <div className="absolute w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl -bottom-32 -left-20"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

                    <p className="text-orange-400 font-bold uppercase tracking-[0.25em] text-sm">
                        TastyBites Collection
                    </p>

                    <h1 className="text-5xl md:text-6xl font-black mt-4">
                        Discover your
                        <span className="text-orange-500"> next favourite.</span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-5">
                        From tempting starters to indulgent desserts,
                        explore dishes made for every mood.
                    </p>

                    {/* SEARCH */}
                    <div className="max-w-xl mx-auto mt-9 relative">

                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Search for a dish..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white text-gray-900 px-14 py-4 rounded-2xl outline-none border-2 border-transparent focus:border-orange-500 shadow-2xl transition"
                        />

                    </div>

                </div>

            </section>


            {/* MENU */}
            <section className="max-w-7xl mx-auto px-6 py-16">

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="text-center">

                            <div className="text-5xl animate-bounce">
                                🍳
                            </div>

                            <p className="mt-4 text-gray-500 font-semibold">
                                Preparing the menu...
                            </p>

                        </div>
                    </div>
                ) : filteredItems.length === 0 ? (

                    <div className="text-center py-20">

                        <div className="text-6xl">
                            🍽️
                        </div>

                        <h2 className="text-2xl font-black mt-5">
                            No dishes found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try searching for something else.
                        </p>

                    </div>

                ) : (

                    <>
                        <div className="flex justify-between items-end mb-8">

                            <div>
                                <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">
                                    Our dishes
                                </p>

                                <h2 className="text-3xl md:text-4xl font-black mt-1">
                                    Made to make you hungry.
                                </h2>
                            </div>

                            <span className="hidden sm:block bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                                {filteredItems.length}{" "}
                                {filteredItems.length === 1
                                    ? "dish"
                                    : "dishes"}
                            </span>

                        </div>


                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            {filteredItems.map((item) => (

                                <div
                                    key={item._id}
                                    className="food-card bg-white rounded-[28px] overflow-hidden shadow-md border border-orange-100"
                                >

                                    {/* IMAGE */}
                                    <div className="relative h-64 overflow-hidden">

                                        {item.image?.url ? (
                                            <img
                                                src={item.image.url}
                                                alt={item.name}
                                                className="food-image w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-orange-100 flex items-center justify-center text-7xl">
                                                🍽️
                                            </div>
                                        )}

                                        {/* Category */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-orange-600 shadow">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Availability */}
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur ${
                                                    item.availability
                                                        ? "bg-green-500 text-white"
                                                        : "bg-red-500 text-white"
                                                }`}
                                            >
                                                {item.availability
                                                    ? "Available"
                                                    : "Sold Out"}
                                            </span>
                                        </div>

                                    </div>


                                    {/* CONTENT */}
                                    <div className="p-6">

                                        <h3 className="text-2xl font-black">
                                            {item.name}
                                        </h3>

                                        <p className="text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>


                                        <div className="flex items-center justify-between mt-6">

                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold">
                                                    Price
                                                </p>

                                                <p className="text-2xl font-black text-gray-900">
                                                    ₹{item.price}
                                                </p>
                                            </div>


                                            <Link
                                                to={`/menu/${item._id}`}
                                                className="premium-button bg-gray-950 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-500"
                                            >
                                                View Dish →
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    </>

                )}

            </section>


            {/* BOTTOM CTA */}
            <section className="bg-orange-500 py-16 text-white text-center">

                <h2 className="text-3xl md:text-4xl font-black">
                    Something delicious is waiting.
                </h2>

                <p className="mt-3 text-orange-100">
                    Explore. Choose. Enjoy.
                </p>

            </section>

        </div>
    );
}

export default Menu;