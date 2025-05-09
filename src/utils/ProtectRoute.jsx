import { useEffect } from "react";
import { userAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { isUserAuthenticated } = userAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserAuthenticated) {
            navigate("/login")
        }
    }, [isUserAuthenticated, navigate])

    return children
}

export default ProtectedRoute