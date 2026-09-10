import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
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
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
    );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/menu");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center px-6 py-16 relative overflow-hidden">

            {/* Background */}
            <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl -top-32 -left-20"></div>

            <div className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl -bottom-32 -right-20"></div>


            <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[35px] shadow-2xl overflow-hidden">

                {/* LEFT */}
                <div className="hidden md:flex bg-gray-950 text-white p-12 flex-col justify-between relative overflow-hidden">

                    <div className="absolute w-72 h-72 bg-orange-500/20 rounded-full blur-3xl -right-20 -top-20"></div>

                    <div className="relative">

                        <div className="text-5xl">
                            🍽️
                        </div>

                        <h2 className="text-4xl font-black mt-7">
                            Welcome back
                            <span className="text-orange-500">.</span>
                        </h2>

                        <p className="text-gray-400 mt-4 leading-relaxed">
                            Your favourite flavours are waiting.
                            Sign in and continue exploring TastyBites.
                        </p>

                    </div>

                    <div className="relative">

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                            <p className="text-orange-400 text-2xl">
                                ★★★★★
                            </p>

                            <p className="text-gray-300 mt-2 text-sm">
                                "Good food brings people together."
                            </p>

                        </div>

                    </div>

                </div>


                {/* FORM */}
                <div className="p-8 md:p-12">

                    <div className="text-center">

                        <div className="md:hidden text-5xl">
                            🍽️
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black mt-4 md:mt-0">
                            Sign in
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Enter your details to continue
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="mt-9 space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-bold mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
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
                                placeholder="Enter your password"
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
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg premium-button"
                        >
                            Sign In →
                        </button>

                    </form>


                    <div className="flex items-center gap-4 my-7">

                        <div className="h-px bg-gray-200 flex-1"></div>

                        <span className="text-xs text-gray-400">
                            OR
                        </span>

                        <div className="h-px bg-gray-200 flex-1"></div>

                    </div>


                    <p className="text-center text-gray-500">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-orange-500 font-bold hover:text-orange-600"
                        >
                            Create one
                        </Link>

                    </p>


                    <Link
                        to="/"
                        className="block text-center text-sm text-gray-400 mt-6 hover:text-orange-500"
                    >
                        ← Back to TastyBites
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;