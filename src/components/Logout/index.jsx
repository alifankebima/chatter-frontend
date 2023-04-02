import React from 'react'
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert2';

const Logout = () => {
    const isAuth = localStorage.getItem("token");
    if (isAuth) {
        localStorage.removeItem("token");
        swal.fire({
            title: `Logout success`,
            text: `Thank you for using our app!`,
            icon: `success`
          })
        return (
            <Navigate to="/user/login" replace="true" />
        )
    } else {
        swal.fire({
            title: `Logout failed`,
            text: `User is already logged out`,
            icon: `error`
          })
        return (
            <Navigate to="/user/login" replace="true" />
        )
    }
}

export default Logout