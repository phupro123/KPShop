
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
 
    let location = useLocation();
    const currentUser = useSelector((state) => state.users?.current?.data);
    if (currentUser===null) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
