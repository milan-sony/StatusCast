import { userAuthStore } from "../store/authStore";
import { Navigate } from "react-router";

const ProtectedRoute = (childern) => {
    const { accessToken } = userAuthStore()
    return accessToken ? childern : <Navigate to={"/login"} />
}

export default ProtectedRoute