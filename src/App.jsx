import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetails from "./pages/MenuDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminMenu from "./pages/AdminMenu";
import Users from "./pages/Users";
import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:id" element={<MenuDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* ADMIN PROTECTED ROUTES */}
                <Route element={<AdminRoute />}>

                    <Route
                        path="/admin/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/admin/menu"
                        element={<AdminMenu />}
                    />

                    <Route
                        path="/admin/menu/add"
                        element={<AddMenuItem />}
                    />

                    <Route
                        path="/admin/menu/edit/:id"
                        element={<EditMenuItem />}
                    />

                    <Route
                        path="/admin/users"
                        element={<Users />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;