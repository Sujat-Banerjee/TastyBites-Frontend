import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl text-white border-b border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* LOGO */}
                <Link
                    to="/"
                    className="group flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
                        🍽️
                    </div>

                    <div>
                        <h1 className="text-xl md:text-2xl font-black tracking-tight">
                            Tasty<span className="text-orange-400">Bites</span>
                        </h1>

                        <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">
                            Taste. Enjoy. Repeat.
                        </p>
                    </div>
                </Link>


                {/* NAVIGATION */}
                <div className="flex items-center gap-2 md:gap-4">

                    <Link
                        to="/"
                        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                            isActive("/")
                                ? "bg-white/10 text-orange-400"
                                : "text-gray-300 hover:text-orange-400 hover:bg-white/5"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/menu"
                        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                            isActive("/menu")
                                ? "bg-white/10 text-orange-400"
                                : "text-gray-300 hover:text-orange-400 hover:bg-white/5"
                        }`}
                    >
                        Menu
                    </Link>


                    {isAdmin ? (
                        <>
                            <Link
                                to="/admin/dashboard"
                                className="hidden md:block px-4 py-2 rounded-xl text-gray-300 hover:text-orange-400 hover:bg-white/5 transition-all"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/admin/menu"
                                className="hidden md:block px-4 py-2 rounded-xl text-gray-300 hover:text-orange-400 hover:bg-white/5 transition-all"
                            >
                                Manage Menu
                            </Link>

                            <Link
                                to="/admin/users"
                                className="hidden md:block px-4 py-2 rounded-xl text-gray-300 hover:text-orange-400 hover:bg-white/5 transition-all"
                            >
                                Users
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="ml-2 bg-red-500/90 hover:bg-red-500 px-5 py-2.5 rounded-xl font-bold transition-all hover:-translate-y-0.5"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hidden sm:block px-4 py-2 rounded-xl text-gray-300 hover:text-orange-400 hover:bg-white/5 transition-all"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>

            {/* subtle bottom accent */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

        </nav>
    );
}

export default Navbar;