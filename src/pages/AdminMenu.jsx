import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminMenu() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/menu-items`
    );

            setItems(response.data);
        } catch (error) {
            console.error("Failed to load menu items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this menu item?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

           await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/menu-items/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            fetchItems();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete menu item"
            );
        }
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f7f7f5]">

            {/* HEADER */}
            <section className="bg-gray-950 text-white relative overflow-hidden">

                <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -right-32 -top-40"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-12">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>

                            <p className="text-orange-400 text-sm font-bold uppercase tracking-[0.25em]">
                                Restaurant Management
                            </p>

                            <h1 className="text-4xl md:text-5xl font-black mt-3">
                                Menu Items
                            </h1>

                            <p className="text-gray-400 mt-3">
                                Manage your dishes, prices and availability.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/admin/menu/add")}
                            className="bg-orange-500 hover:bg-orange-400 px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/20"
                        >
                            + Add New Dish
                        </button>

                    </div>

                </div>

            </section>


            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* TOOLBAR */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>

                        <p className="text-gray-400 text-sm">
                            Current menu
                        </p>

                        <p className="text-2xl font-black">
                            {filteredItems.length}{" "}
                            {filteredItems.length === 1
                                ? "dish"
                                : "dishes"}
                        </p>

                    </div>

                    <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-80 pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                        />

                    </div>

                </div>


                {/* TABLE */}
                {loading ? (

                    <div className="flex justify-center py-20">

                        <div className="text-center">

                            <div className="text-5xl animate-bounce">
                                🍳
                            </div>

                            <p className="mt-4 text-gray-500 font-semibold">
                                Loading menu...
                            </p>

                        </div>

                    </div>

                ) : filteredItems.length === 0 ? (

                    <div className="bg-white rounded-3xl p-16 text-center mt-6">

                        <div className="text-6xl">
                            🍽️
                        </div>

                        <h2 className="text-2xl font-black mt-5">
                            No dishes found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try another search or add a new dish.
                        </p>

                    </div>

                ) : (

                    <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50 border-b border-gray-100">

                                    <tr>

                                        <th className="text-left px-6 py-5 text-xs uppercase tracking-wider text-gray-400 font-bold">
                                            Dish
                                        </th>

                                        <th className="text-left px-6 py-5 text-xs uppercase tracking-wider text-gray-400 font-bold">
                                            Category
                                        </th>

                                        <th className="text-left px-6 py-5 text-xs uppercase tracking-wider text-gray-400 font-bold">
                                            Price
                                        </th>

                                        <th className="text-left px-6 py-5 text-xs uppercase tracking-wider text-gray-400 font-bold">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-5 text-xs uppercase tracking-wider text-gray-400 font-bold">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredItems.map((item) => (

                                        <tr
                                            key={item._id}
                                            className="border-b border-gray-100 last:border-0 hover:bg-orange-50/40 transition-colors"
                                        >

                                            {/* DISH */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-4">

                                                    {item.image?.url ? (

                                                        <img
                                                            src={item.image.url}
                                                            alt={item.name}
                                                            className="w-16 h-16 object-cover rounded-2xl shadow-sm"
                                                        />

                                                    ) : (

                                                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
                                                            🍽️
                                                        </div>

                                                    )}

                                                    <div>

                                                        <p className="font-black text-gray-900">
                                                            {item.name}
                                                        </p>

                                                        <p className="text-sm text-gray-400 mt-1 max-w-xs truncate">
                                                            {item.description}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* CATEGORY */}
                                            <td className="px-6 py-5">

                                                <span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold">
                                                    {item.category}
                                                </span>

                                            </td>


                                            {/* PRICE */}
                                            <td className="px-6 py-5">

                                                <span className="font-black text-lg">
                                                    ₹{item.price}
                                                </span>

                                            </td>


                                            {/* STATUS */}
                                            <td className="px-6 py-5">

                                                {item.availability ? (

                                                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                        In Stock
                                                    </span>

                                                ) : (

                                                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-bold">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                        Out of Stock
                                                    </span>

                                                )}

                                            </td>


                                            {/* ACTIONS */}
                                            <td className="px-6 py-5">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/menu/edit/${item._id}`
                                                            )
                                                        }
                                                        className="bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-700 px-4 py-2 rounded-xl font-bold text-sm transition-all"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(item._id)
                                                        }
                                                        className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 px-4 py-2 rounded-xl font-bold text-sm transition-all"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminMenu;