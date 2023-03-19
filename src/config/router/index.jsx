import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'

import ScrollToTop from '../../components/ScrollToTop'
import Page404 from '../../pages/Page404'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace="true" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router