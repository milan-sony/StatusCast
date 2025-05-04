import React from 'react'
import { Link } from 'react-router'
import useTheme from '../../hooks/useTheme'
import { MoonIcon, SunIcon } from 'lucide-react'
import { userAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router'

function Navbar() {
    const { theme, toggleTheme } = useTheme()

    const { isUserAuthenticated, logout } = userAuthStore()

    const navigate = useNavigate()

    const handleLogout = () => {
        logout(navigate)
    }

    return (
        <div className="navbar bg-base-200 shadow-sm">
            {isUserAuthenticated ? (
                <>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            <li><Link to="/">Homepage</Link></li>
                            <li><Link to="/portfolio">Portfolio</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost text-xl">StatusCast</Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <label className="swap swap-rotate">
                                <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                                <SunIcon className='size-5 swap-on' />
                                <MoonIcon className='size-5 swap-off' />
                            </label>
                            <li className="ml-4">
                                <details>
                                    <summary>Settings</summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><Link to="/link1">Profile</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost text-xl">StatusCast</Link>
                    </div>
                    <div className="flex-none">
                        <label className="swap swap-rotate mr-4">
                            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                            <SunIcon className='size-5 swap-on' />
                            <MoonIcon className='size-5 swap-off' />
                        </label>
                    </div>
                </>
            )}
        </div>
    )
}

export default Navbar
