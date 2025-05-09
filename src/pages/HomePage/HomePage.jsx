import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { userAuthStore } from '../../store/authStore'

function HomePage() {

    const { profile, user } = userAuthStore()

    console.log("user:, ", user)

    useEffect(() => {
        profile()
    }, [])

    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-base-200">
                <div className='h-screen bg-base-100'>
                    <h1>Hello {user?.firstName}</h1>
                </div>
            </div>
        </>
    )
}

export default HomePage
