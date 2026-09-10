import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [stats, setStats] = useState({
        totalMenuItems: 0,
        totalUsers: 0,
        totalOrders: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/dashboard`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

                setStats(response.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl animate-bounce">
                        🍳
                    </div>
                    <p className="mt-4 text-gray-500 font-semibold">
                        Preparing your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f7f5]">

            {/* HEADER */}
            <section className="bg-gray-950 text-white relative overflow-hidden">

                <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -right-20 -top-40"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-12">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>
                            <p className="text-orange-400 text-sm font-bold uppercase tracking-[0.25em]">
                                TastyBites Administration
                            </p>

                            <h1 className="text-4xl md:text-5xl font-black mt-3">
                                Dashboard
                            </h1>

                            <p className="text-gray-400 mt-3">
                                Here's what's happening with your restaurant.
                            </p>
                        </div>

                        <Link
                            to="/admin/menu/add"
                            className="bg-orange-500 hover:bg-orange-400 px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/20"
                        >
                            + Add Menu Item
                        </Link>

                    </div>

                </div>
            </section>


            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-semibold">
                        {error}
                    </div>
                )}


                {/* STAT CARDS */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* MENU */}
                    <div className="group bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <div className="flex justify-between items-start">

                            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl">
                                🍽️
                            </div>

                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                LIVE
                            </span>

                        </div>

                        <p className="text-gray-500 mt-7 font-medium">
                            Total Menu Items
                        </p>

                        <h2 className="text-5xl font-black mt-2 group-hover:text-orange-500 transition-colors">
                            {stats.totalMenuItems}
                        </h2>

                        <Link
                            to="/admin/menu"
                            className="inline-block mt-5 text-orange-500 font-bold text-sm"
                        >
                            Manage menu →
                        </Link>

                    </div>


                    {/* USERS */}
                    <div className="group bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <div className="flex justify-between items-start">

                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
                                👥
                            </div>

                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                USERS
                            </span>

                        </div>

                        <p className="text-gray-500 mt-7 font-medium">
                            Registered Users
                        </p>

                        <h2 className="text-5xl font-black mt-2 group-hover:text-blue-500 transition-colors">
                            {stats.totalUsers}
                        </h2>

                        <Link
                            to="/admin/users"
                            className="inline-block mt-5 text-blue-500 font-bold text-sm"
                        >
                            Manage users →
                        </Link>

                    </div>


                    {/* ORDERS */}
                    <div className="group bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <div className="flex justify-between items-start">

                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                                🛵
                            </div>

                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                ORDERS
                            </span>

                        </div>

                        <p className="text-gray-500 mt-7 font-medium">
                            Total Orders
                        </p>

                        <h2 className="text-5xl font-black mt-2 group-hover:text-green-500 transition-colors">
                            {stats.totalOrders}
                        </h2>

                        <p className="mt-5 text-gray-400 text-sm">
                            Order management coming next
                        </p>

                    </div>

                </div>


                {/* QUICK ACTIONS */}
                <section className="mt-10">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <p className="text-orange-500 text-sm font-bold uppercase tracking-widest">
                                Quick actions
                            </p>

                            <h2 className="text-2xl font-black mt-1">
                                Manage TastyBites
                            </h2>
                        </div>

                    </div>


                    <div className="grid md:grid-cols-3 gap-5">

                        <Link
                            to="/admin/menu"
                            className="bg-gray-950 text-white rounded-2xl p-6 hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="text-3xl">
                                🍴
                            </div>

                            <h3 className="font-bold text-lg mt-4">
                                Menu Management
                            </h3>

                            <p className="text-gray-400 text-sm mt-2">
                                Add, edit and remove dishes.
                            </p>
                        </Link>


                        <Link
                            to="/admin/users"
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all"
                        >
                            <div className="text-3xl">
                                👥
                            </div>

                            <h3 className="font-bold text-lg mt-4">
                                User Management
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                View and manage registered users.
                            </p>
                        </Link>


                        <Link
                            to="/admin/menu/add"
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all"
                        >
                            <div className="text-3xl">
                                ✨
                            </div>

                            <h3 className="font-bold text-lg mt-4">
                                Create New Dish
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                Add a new delicious item to the menu.
                            </p>
                        </Link>

                    </div>

                </section>


                {/* BOTTOM BANNER */}
                <section className="mt-10 bg-orange-500 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">

                    <div className="absolute text-[180px] opacity-10 -right-5 -top-16">
                        🍽️
                    </div>

                    <div className="relative">

                        <p className="font-bold text-orange-100 uppercase tracking-widest text-sm">
                            TastyBites Admin
                        </p>

                        <h2 className="text-3xl md:text-4xl font-black mt-2">
                            Keep your menu fresh.
                        </h2>

                        <p className="text-orange-100 mt-3 max-w-xl">
                            Add new dishes, update availability and
                            keep your restaurant experience delicious.
                        </p>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;