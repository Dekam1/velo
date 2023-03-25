import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ children }) {
    const location = useLocation();
    const { userToken } = useAuth();

    if (!userToken) {
        return <Navigate to='/signin' state={{ from: location }} />
    }

    return children
}