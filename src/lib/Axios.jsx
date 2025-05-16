import axios from 'axios';
import { userAuthStore } from '../store/userAuthStore';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true, // Send cookies with every single request
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = userAuthStore.getState().accessToken;
    console.log("Axios token", token);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    res => res, // If the response is successful, just return it as-is
    async err => {
        const original = err.config; // Store the original request config for retrying later

        if (err.response?.status === 401 && !original._retry) {
            original._retry = true; // Mark this request as "retried"

            try {
                const refreshURL = `${import.meta.env.VITE_APP_API_URL}/auth/refresh`;
                const { data } = await axios.get(refreshURL, { withCredentials: true }); // Send a request to refresh the access token
                console.log("axios data, ", data);

                userAuthStore.getState().setAccessToken(data.accessToken); // Update the accessToken in the Zustand store
                original.headers['Authorization'] = `Bearer ${data.accessToken}`; // Update the original request with the new access token

                return axiosInstance(original); // Retry the original request
            } catch (error) {
                console.log("Logging out from axios due to refresh token failure");
                // Handle navigation outside of the interceptor
                userAuthStore.getState().axiosLogout(); // Log the user out
            }
        }
        return Promise.reject(err); // Propagate the error normally
    }
);

export default axiosInstance;
