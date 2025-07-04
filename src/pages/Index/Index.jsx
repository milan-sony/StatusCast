import React from 'react'
import { Link } from 'react-router-dom'

function Index() {

    return (
            <div className="w-full h-screen bg-base-200 flex flex-col">
                {/* Main Content */}
                <div className="flex-grow flex justify-center items-center mt-[80px] mb-[80px]">
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
                            <Link to="/login" className="btn btn-primary font-[roboto]">
                                Get Started
                            </Link>
                        </div>

                    </div>
                </div>

                <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
                    <aside>
                        <p>Made with 💖 <a className="link link-primary"  href='https://milansony.vercel.app'>MS</a></p>
                    </aside>
                </footer>

            </div>
    )
}

export default Index
