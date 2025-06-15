import React from 'react'
import { Routes, Route } from "react-router-dom"
import { userAuthStore } from '../store/userAuthStore'
import Index from '../pages/Index/Index'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import ProtectedRoute from '../utils/ProtectRoute'
import Home from '../pages/Home/Home'
import SetStatus from '../pages/SetStatus/SetStatus'
import SearchProfile from '../pages/SearchProfile/SearchProfile'
import PageNotFound from '../pages/PageNotFound/PageNotFound'

function Router() {

    const { isUserAuthenticated } = userAuthStore()
    console.log("router, isUserAuthenticated: ", isUserAuthenticated)

    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/set-status' element={<ProtectedRoute><SetStatus /></ProtectedRoute>} />
            <Route path='/search-profile' element={<ProtectedRoute><SearchProfile /></ProtectedRoute>} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Router