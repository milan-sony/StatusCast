import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

function IndexPage() {

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")

    useEffect(() => {
        localStorage.setItem("theme", theme)
        const localTheme = localStorage.getItem("theme")
        document.querySelector("html").setAttribute("data-theme", localTheme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-base-200 flex flex-col">

                {/* Theme Toggle */}
                <div className="flex justify-end p-4">
                    <label className="swap swap-rotate">
                        <input type="checkbox" onChange={toggleTheme} />
                        {/* Sun icon */}
                        <img className="size-5 swap-on" src="/sun.png" alt="sun" />
                        <img className="size-5 swap-off" src="/moon.png" alt="moon" />
                    </label>
                </div>

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
