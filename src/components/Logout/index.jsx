import React from 'react'
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const isAuth = localStorage.getItem("token");
    if (isAuth) {
        localStorage.removeItem("token")
        return (
            <Navigate to="/login" replace="true" />
        )
    }
}

export default Logout