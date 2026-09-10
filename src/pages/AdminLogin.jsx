import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/admin-login`,
        form
    );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/admin/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Admin login failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 py-16 relative overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -top-32 -left-20"></div>

            <div className="absolute w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl -bottom-32 -right-20"></div>


            <div className="relative w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">

                    <div className="inline-flex w-16 h-16 rounded-2xl bg-orange-500 items-center justify-center text-3xl shadow-xl shadow-orange-500/20">
                        👑
                    </div>

                    <h1 className="text-white text-3xl font-black mt-5">
                        Tasty<span className="text-orange-500">Bites</span>
                    </h1>

                    <p className="text-gray-500 mt-1 text-sm uppercase tracking-[0.2em]">
                        Administration
                    </p>

                </div>


                {/* Card */}
                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl">

                    <div className="text-center">

                        <h2 className="text-3xl font-black">
                            Admin Login
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Access your restaurant dashboard
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-bold mb-2">
                                Admin Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="admin@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-bold mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter admin password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                            />

                        </div>


                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold">
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="w-full bg-gray-950 hover:bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg premium-button"
                        >
                            Enter Dashboard →
                        </button>

                    </form>


                    <div className="mt-7 pt-6 border-t border-gray-100 text-center">

                        <Link
                            to="/"
                            className="text-sm text-gray-400 hover:text-orange-500 transition"
                        >
                            ← Back to TastyBites
                        </Link>

                    </div>

                </div>

                <p className="text-center text-gray-600 text-xs mt-6">
                    Authorized restaurant administrators only
                </p>

            </div>

        </div>
    );
}

export default AdminLogin;