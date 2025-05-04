import { userAuthStore } from "../store/authStore";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const accessToken = userAuthStore(state => state.accessToken)
    return accessToken ? children : <Navigate to="/login" />
}

export default ProtectedRoute