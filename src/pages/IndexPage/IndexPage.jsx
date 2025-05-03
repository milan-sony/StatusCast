import React from 'react'
import { Link } from 'react-router'
import Navbar from '../../components/Navbar/Navbar'

function IndexPage() {

    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-base-200 flex flex-col">

                <Navbar />

                {/* Main Content */}
                <div className="flex-grow flex justify-center items-center">
                    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl px-4">

                        {/* Image */}
                        <img
                            src="/indeximg.png"
                            alt="Index"
                            className="w-md object-contain"
                        />

                        {/* Text */}
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold font-[poppins]">StatusCast</h1>
                            <p className="py-4 text-lg font-[poppins]">“Broadcast Your Presence, Online”</p>
                            <Link to="/home" className="btn btn-primary font-[roboto]">
                                Get Started
                            </Link>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default IndexPage
