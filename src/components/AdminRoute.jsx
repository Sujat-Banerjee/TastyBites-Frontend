import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
    const token = localStorage.getItem("token");

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    if (!token || !user || user.role !== "admin") {
        return <Navigate to="/admin-login" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;