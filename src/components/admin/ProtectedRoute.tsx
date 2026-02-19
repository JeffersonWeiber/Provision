import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // TODO: Integrate with Supabase Auth (Context)
    const isAuthenticated = true; // Mocked for development
    const userRole = 'admin'; // Mocked

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // Optional: Check role
    if (userRole !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
