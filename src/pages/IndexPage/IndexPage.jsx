import React from 'react'
import { Link } from 'react-router'

function IndexPage() {
    return (
        <div className="hero bg-base-200 w-full h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="/indeximg.png"
                    className="w-md"
                />
                <div>
                    <h1 className="text-5xl font-bold font-[poppins]">StatusCast</h1>
                    <p className="py-6 font-[poppins]">
                        “Broadcast Your Presence, Online”
                    </p>
                    <Link to={"/home"} className="btn btn-primary font-[roboto]">Get Started</Link>
                </div>
            </div>
        </div>
    )
}

export default IndexPage
