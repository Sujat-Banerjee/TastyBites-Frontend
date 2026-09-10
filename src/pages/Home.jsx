import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-[#fff7ed] overflow-hidden">

            {/* ================= HERO ================= */}
            <section className="relative min-h-[720px] flex items-center">

                {/* Background decoration */}
                <div className="blob w-72 h-72 bg-orange-200/40 -top-20 -left-20"></div>

                <div className="blob w-96 h-96 bg-yellow-200/30 top-20 right-[-120px]"></div>

                <div className="blob w-64 h-64 bg-orange-300/20 bottom-[-100px] left-[35%]"></div>

                <div className="max-w-7xl mx-auto px-6 py-20 w-full">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT */}
                        <div className="relative z-10 animate-fade-up">

                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-orange-100 mb-6">
                                <span className="text-orange-500">
                                    ✦
                                </span>

                                <span className="text-sm font-semibold text-gray-700">
                                    Deliciousness delivered differently
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight text-gray-950">

                                Good food.

                                <br />

                                <span className="text-orange-500">
                                    Great mood.
                                </span>

                            </h1>

                            <p className="mt-7 text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                                Discover delicious dishes, explore our
                                handcrafted menu and make every meal
                                worth remembering.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-9">

                                <Link
                                    to="/menu"
                                    className="premium-button bg-orange-500 text-white px-7 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200"
                                >
                                    Explore Menu →
                                </Link>

                                <Link
                                    to="/register"
                                    className="premium-button bg-white text-gray-900 px-7 py-4 rounded-2xl font-bold text-lg border border-gray-200"
                                >
                                    Join TastyBites
                                </Link>

                            </div>

                            {/* Mini stats */}
                            <div className="flex gap-8 mt-10">

                                <div>
                                    <p className="text-2xl font-black">
                                        4+
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Food Categories
                                    </p>
                                </div>

                                <div>
                                    <p className="text-2xl font-black">
                                        100%
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Fresh Experience
                                    </p>
                                </div>

                                <div>
                                    <p className="text-2xl font-black">
                                        ★ 4.9
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Food Lovers
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* RIGHT FOOD VISUAL */}
                        <div className="relative h-[520px] flex items-center justify-center">

                            {/* Main circle */}
                            <div className="absolute w-[380px] h-[380px] md:w-[470px] md:h-[470px] rounded-full bg-orange-500/10"></div>

                            <div className="absolute w-[300px] h-[300px] md:w-[390px] md:h-[390px] rounded-full bg-orange-500/10"></div>

                            {/* Main food card */}
                            <div className="relative z-10 w-[300px] md:w-[360px] bg-white rounded-[40px] p-5 shadow-2xl rotate-[-4deg] animate-float">

                                <div className="h-[300px] md:h-[350px] rounded-[30px] bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100 flex items-center justify-center overflow-hidden">

                                    <div className="text-[150px] md:text-[180px]">
                                        🍛
                                    </div>

                                </div>

                                <div className="px-3 pt-5 pb-2">

                                    <p className="text-orange-500 font-bold text-sm">
                                        TODAY'S SPECIAL
                                    </p>

                                    <div className="flex justify-between items-center mt-1">

                                        <h2 className="text-2xl font-black">
                                            Chef's Special
                                        </h2>

                                        <span className="text-xl font-black">
                                            ₹299
                                        </span>

                                    </div>

                                    <p className="text-gray-500 mt-2 text-sm">
                                        Crafted with fresh ingredients
                                        and unforgettable flavours.
                                    </p>

                                </div>

                            </div>

                            {/* Floating rating */}
                            <div className="absolute z-20 top-16 right-0 md:right-4 bg-white rounded-2xl px-5 py-4 shadow-xl animate-float-slow">

                                <div className="text-yellow-500 text-lg">
                                    ★★★★★
                                </div>

                                <p className="font-bold text-sm mt-1">
                                    Loved by foodies
                                </p>

                            </div>

                            {/* Floating delivery */}
                            <div className="absolute z-20 bottom-16 left-0 md:left-2 bg-black text-white rounded-2xl px-5 py-4 shadow-xl animate-float">

                                <div className="flex items-center gap-3">

                                    <span className="text-2xl">
                                        🛵
                                    </span>

                                    <div>
                                        <p className="font-bold">
                                            Fresh & Tasty
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Every single bite
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Floating emoji */}
                            <div className="absolute top-10 left-8 text-5xl animate-float-slow">
                                🍕
                            </div>

                            <div className="absolute bottom-20 right-4 text-5xl animate-float">
                                🥗
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}
            <section className="relative py-24 bg-white">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center max-w-2xl mx-auto">

                        <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">
                            Why TastyBites
                        </p>

                        <h2 className="text-4xl md:text-5xl font-black mt-3">
                            More than just a menu.
                        </h2>

                        <p className="text-gray-500 mt-4 text-lg">
                            Everything you need for a simple,
                            enjoyable food experience.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-3 gap-7 mt-14">

                        {/* Card 1 */}
                        <div className="food-card glass-card rounded-3xl p-8">

                            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-4xl">
                                🍕
                            </div>

                            <h3 className="text-2xl font-black mt-7">
                                Delicious Food
                            </h3>

                            <p className="text-gray-500 mt-3 leading-relaxed">
                                Carefully selected dishes prepared
                                with flavour, freshness and quality
                                in mind.
                            </p>

                            <div className="mt-6 text-orange-500 font-bold">
                                Taste the difference →
                            </div>

                        </div>


                        {/* Card 2 */}
                        <div className="food-card glass-card rounded-3xl p-8">

                            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-4xl">
                                🥗
                            </div>

                            <h3 className="text-2xl font-black mt-7">
                                Endless Choices
                            </h3>

                            <p className="text-gray-500 mt-3 leading-relaxed">
                                Explore starters, main courses,
                                desserts and beverages all in
                                one beautiful menu.
                            </p>

                            <Link
                                to="/menu"
                                className="block mt-6 text-orange-500 font-bold"
                            >
                                Explore menu →
                            </Link>

                        </div>


                        {/* Card 3 */}
                        <div className="food-card glass-card rounded-3xl p-8">

                            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-4xl">
                                ⭐
                            </div>

                            <h3 className="text-2xl font-black mt-7">
                                Quality First
                            </h3>

                            <p className="text-gray-500 mt-3 leading-relaxed">
                                A restaurant experience designed
                                around simplicity, quality and
                                customer satisfaction.
                            </p>

                            <div className="mt-6 text-orange-500 font-bold">
                                Made with care →
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= DARK CTA ================= */}
            <section className="bg-gray-950 text-white py-24 relative overflow-hidden">

                <div className="absolute w-80 h-80 bg-orange-500/20 rounded-full blur-3xl -right-20 -top-20"></div>

                <div className="absolute w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -left-20 bottom-0"></div>

                <div className="relative max-w-5xl mx-auto px-6 text-center">

                    <p className="text-orange-400 font-bold uppercase tracking-[0.2em]">
                        Your next favourite dish
                    </p>

                    <h2 className="text-4xl md:text-6xl font-black mt-4">
                        Hungry already?
                    </h2>

                    <p className="text-gray-400 text-lg mt-5 max-w-2xl mx-auto">
                        Don't just scroll through food.
                        Discover something delicious.
                    </p>

                    <Link
                        to="/menu"
                        className="inline-block premium-button mt-9 bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg"
                    >
                        Browse Our Menu 🍽️
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;