import React from 'react'
import { Routes, Route } from "react-router-dom";
import IndexPage from '../pages/IndexPage/IndexPage';
import HomePage from '../pages/HomePage/HomePage';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import SignupPage from '../pages/SignupPage/SignupPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProtectedRoute from '../utils/ProtectRoute';
import SetStatusPage from '../pages/SetStatusPage.jsx/SetStatusPage';
import { userAuthStore } from '../store/userAuthStore';

function Router() {
    const {isUserAuthenticated} = userAuthStore()
    console.log("router isUserAuthenticated", isUserAuthenticated)
    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path='/set-status' element={<ProtectedRoute><SetStatusPage /></ProtectedRoute>} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Router