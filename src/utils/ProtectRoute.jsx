import { useEffect } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isUserAuthenticated, user } = userAuthStore()
    const navigate = useNavigate()

    console.log("protectedrouter isUserAuthenticated", isUserAuthenticated)

    useEffect(() => {
        if (!isUserAuthenticated || !user) {
            navigate("/login")
        }
    }, [isUserAuthenticated, navigate])

    return children
}

export default ProtectedRoute