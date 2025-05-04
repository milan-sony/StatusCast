import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { userAuthStore } from '../../store/authStore'

function HomePage() {

    const { profile } = userAuthStore()

    useEffect(() => {
        profile()
    }, [])

    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-base-200">
                <Navbar />
                <div className='h-screen bg-amber-200'>

                </div>
            </div>
        </>
    )
}

export default HomePage
