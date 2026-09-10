import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

       try {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        form
    );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center px-6 py-16 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl -top-32 -right-20"></div>

            <div className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl -bottom-32 -left-20"></div>


            <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[35px] shadow-2xl overflow-hidden">

                {/* LEFT SIDE */}
                <div className="hidden md:flex bg-gray-950 text-white p-12 flex-col justify-between relative overflow-hidden">

                    <div className="absolute w-80 h-80 bg-orange-500/20 rounded-full blur-3xl -right-24 -top-20"></div>

                    <div className="relative">

                        <div className="text-5xl">
                            🍴
                        </div>

                        <h2 className="text-4xl font-black mt-8 leading-tight">
                            Your table
                            <br />
                            is waiting<span className="text-orange-500">.</span>
                        </h2>

                        <p className="text-gray-400 mt-5 leading-relaxed">
                            Create your TastyBites account and
                            discover a world of delicious possibilities.
                        </p>

                    </div>


                    <div className="relative space-y-4">

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-orange-500/10 rounded-xl flex items-center justify-center">
                                🍕
                            </div>

                            <div>
                                <p className="font-bold">
                                    Explore delicious dishes
                                </p>

                                <p className="text-xs text-gray-500">
                                    Discover your next favourite
                                </p>
                            </div>
                        </div>


                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-orange-500/10 rounded-xl flex items-center justify-center">
                                ⭐
                            </div>

                            <div>
                                <p className="font-bold">
                                    Enjoy the experience
                                </p>

                                <p className="text-xs text-gray-500">
                                    Simple. Delicious. Memorable.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>


                {/* FORM */}
                <div className="p-8 md:p-12">

                    <div className="text-center">

                        <div className="md:hidden text-5xl">
                            🍴
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black mt-4 md:mt-0">
                            Create account
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Join the TastyBites family
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-4"
                    >

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                            />
                        </div>


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
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Repeat your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                            />
                        </div>


                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold">
                                {error}
                            </div>
                        )}


                        {message && (
                            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-xl text-sm font-semibold">
                                {message}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg premium-button"
                        >
                            Create My Account →
                        </button>

                    </form>


                    <p className="text-center text-gray-500 mt-7">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-orange-500 font-bold hover:text-orange-600"
                        >
                            Sign in
                        </Link>

                    </p>


                    <Link
                        to="/"
                        className="block text-center text-sm text-gray-400 mt-5 hover:text-orange-500"
                    >
                        ← Back to TastyBites
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;