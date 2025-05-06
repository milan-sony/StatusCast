import { useEffect } from "react";
import { userAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { isUserAuthenticated, isLoading } = userAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isUserAuthenticated) {
            navigate("/login")
        }
    }, [isUserAuthenticated, isLoading, navigate])

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin' />
            </div>
        )
    }

    return children
}

export default ProtectedRoute