import React from 'react'
import { Link } from 'react-router'

function IndexPage() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="/indeximg.png"
                    className="max-w-sm"
                />
                <div>
                    <h1 className="text-5xl font-bold">StatusCast</h1>
                    <p className="py-6">
                        “Broadcast Your Presence, Online”
                    </p>
                    <Link to={"/home"} className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    )
}

export default IndexPage
