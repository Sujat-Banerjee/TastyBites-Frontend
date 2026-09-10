import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/users`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            setUsers(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load users"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            fetchUsers();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );
        }
    };

    const adminCount = users.filter(
        (user) => user.role === "admin"
    ).length;

    const regularUsers = users.filter(
        (user) => user.role === "user"
    ).length;

    return (
        <div className="min-h-screen bg-[#fff7ed] relative overflow-hidden">

            {/* Background decorations */}
            <div className="absolute -top-40 -right-40 w-[450px] h-[450px] bg-orange-300/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-yellow-200/20 rounded-full blur-3xl"></div>

            {/* Header */}
            <div className="bg-black text-white relative overflow-hidden">

                <div className="absolute right-10 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-6xl mx-auto px-6 py-12 relative">

                    <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-bold">
                        TastyBites Administration
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black mt-3">
                        Manage Users 👥
                    </h1>

                    <p className="text-gray-400 mt-3 max-w-2xl">
                        Keep track of your TastyBites community and
                        manage registered users from one place.
                    </p>

                </div>
            </div>

            {/* Main */}
            <div className="max-w-6xl mx-auto px-6 py-10 relative">

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-5 mb-8">

                    <div className="bg-black text-white rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition">

                        <p className="text-gray-400 text-sm">
                            Total Accounts
                        </p>

                        <p className="text-4xl font-black mt-2">
                            {users.length}
                        </p>

                        <p className="text-orange-400 text-sm mt-2">
                            Registered members
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:-translate-y-1 transition">

                        <p className="text-gray-500 text-sm">
                            Regular Users
                        </p>

                        <p className="text-4xl font-black mt-2">
                            {regularUsers}
                        </p>

                        <p className="text-blue-500 text-sm mt-2">
                            Customer accounts
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:-translate-y-1 transition">

                        <p className="text-gray-500 text-sm">
                            Administrators
                        </p>

                        <p className="text-4xl font-black mt-2">
                            {adminCount}
                        </p>

                        <p className="text-purple-500 text-sm mt-2">
                            Admin accounts
                        </p>

                    </div>

                </div>

                {/* Loading */}
                {loading && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

                        <div className="text-5xl animate-bounce">
                            👥
                        </div>

                        <p className="font-bold text-lg mt-4">
                            Loading users...
                        </p>

                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl">
                        ⚠️ {error}
                    </div>
                )}

                {/* Users Table */}
                {!loading && !error && users.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">

                        {/* Table Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div>
                                <p className="text-orange-500 text-xs uppercase tracking-[0.2em] font-bold">
                                    USER DIRECTORY
                                </p>

                                <h2 className="text-2xl font-black mt-1">
                                    Registered Users
                                </h2>
                            </div>

                            <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-bold text-sm">
                                {users.length} Accounts
                            </div>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[750px]">

                                <thead className="bg-black text-white">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-xs uppercase tracking-wider">
                                            User
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs uppercase tracking-wider">
                                            Email
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs uppercase tracking-wider">
                                            Role
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs uppercase tracking-wider">
                                            Joined
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs uppercase tracking-wider">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {users.map((user) => (

                                        <tr
                                            key={user._id}
                                            className="border-b border-gray-100 hover:bg-orange-50/50 transition"
                                        >

                                            {/* User */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-lg">
                                                        {user.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <p className="font-bold">
                                                            {user.name}
                                                        </p>

                                                        <p className="text-xs text-gray-400">
                                                            TastyBites member
                                                        </p>
                                                    </div>

                                                </div>

                                            </td>

                                            {/* Email */}
                                            <td className="px-6 py-5 text-gray-600">
                                                {user.email}
                                            </td>

                                            {/* Role */}
                                            <td className="px-6 py-5">

                                                <span
                                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                                                        user.role === "admin"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-blue-100 text-blue-700"
                                                    }`}
                                                >

                                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>

                                                    {user.role === "admin"
                                                        ? "Administrator"
                                                        : "User"}

                                                </span>

                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 text-gray-500">
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}
                                            </td>

                                            {/* Delete */}
                                            <td className="px-6 py-5">

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            user._id
                                                        )
                                                    }
                                                    className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>
                )}

                {/* Empty */}
                {!loading && !error && users.length === 0 && (

                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

                        <div className="text-6xl">
                            👥
                        </div>

                        <h2 className="text-2xl font-black mt-4">
                            No users yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Registered customers will appear here.
                        </p>

                    </div>

                )}

            </div>
        </div>
    );
}

export default Users;