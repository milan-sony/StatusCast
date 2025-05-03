import React from 'react'
import { Routes, Route } from "react-router";
import IndexPage from '../pages/IndexPage/IndexPage';
import HomePage from '../pages/HomePage/HomePage';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import SignupPage from '../pages/SignupPage/SignupPage';
import LoginPage from '../pages/LoginPage/LoginPage';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Router