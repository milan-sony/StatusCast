import React from 'react'
import { Link } from 'react-router'

function PageNotFound() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl">
                <img
                    src="/404.png"
                    className="w-[250px]"
                />
                <div>
                    <h1 className="text-5xl lg:text-8xl font-bold font-[poppins]">404</h1>
                    <p className="py-6 text-xl lg:text-xl font-[roboto]">
                        Page Not Found!
                    </p>
                    <Link to="/home" className="btn btn-primary font-[roboto]">
                        Retun Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
