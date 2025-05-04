import { useEffect } from "react";
import { userAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";

// const ProtectedRoute = ({ children }) => {
//     const accessToken = userAuthStore(state => state.accessToken)
//     console.log("Protected route accessToken, ", accessToken)
//     return accessToken ? children : <Navigate to="/login" />
// }

// export default ProtectedRoute

const ProtectedRoute = ({ children }) => {

    const { isUserAuthenticated } = userAuthStore()

    console.log("isUserAuthenticated in protected", isUserAuthenticated)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserAuthenticated) navigate("/login")
    }, [])

    return children
}

export default ProtectedRoute