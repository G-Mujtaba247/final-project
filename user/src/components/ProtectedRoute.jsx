import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
