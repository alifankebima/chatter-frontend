import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'

import ScrollToTop from '../../components/ScrollToTop'
import RequireAuth from '../../components/RequireAuth'
import Page404 from '../../pages/Page404'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import ForgotPassword from '../../pages/ForgotPassword'
import ResetPassword from '../../pages/ResetPassword'
import Coba from '../../pages/Coba'
import Logout from '../../components/Logout'
import EmailVerification from '../../pages/EmailVerification'
import TestRedux from '../../pages/TestRedux'

const Router = () => {
  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/home" element={<Navigate to="/" replace="true" />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/logout" element={<Logout />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/user/verify" element={<EmailVerification />} />
        <Route path="/coba" element={<Coba />} />
        <Route path="/redux" element={<TestRedux />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router