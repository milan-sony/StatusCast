import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { userAuthStore } from '../../store/authStore';

const PageLoader = ({ delay }) => {
    const [isVisible, setIsVisible] = useState(true);

    const {isLoading} = userAuthStore()
    console.log("delay", delay)

    console.log("isLoading", isLoading)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(isLoading); // Show loader after the specified delay
        }, delay);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [delay]);

    if (!isVisible) {
        return null; // Don't render anything until the delay has passed
    }

    return (
        <div className='w-full h-screen flex items-center justify-center bg-base-200'>
            <Loader className='size-10 animate-spin' />
        </div>
    );
};

export default PageLoader;
