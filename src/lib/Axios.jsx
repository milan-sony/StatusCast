import axios from 'axios'
import { userAuthStore } from '../store/authStore'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true, // Send cookies with every single request
})

// Axios interceptors ref. link : https://medium.com/@barisberkemalkoc/axios-interceptor-intelligent-db46653b7303

// Add a request interceptor -  include an authentication token in every request’s
axiosInstance.interceptors.request.use((config) => {
    const token = userAuthStore.getState().accessToken
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

// Add a response interceptor - catching and handling errors
axiosInstance.interceptors.response.use( // Registers an interceptor for all responses made using axiosInstance
    res => res, // If the response is successful, just return it as-is
    async err => {
        const original = err.config // If there's an error, store the original request config for retrying later
        if (err.response?.status === 401 && !original._retry) { // Check if the error is 401 Unauthorized and ensure it hasn’t been retried already (to prevent infinite loops)
            original._retry = true // Mark this request as "retried" to avoid retrying again if refresh fail
            try {
                const { data } = await axios.post(import.meta.env.VITE_APP_API_URL, '/auth/refresh', {}, { withCredentials: true }) // Send a request to refresh the access token
                userAuthStore.getState().setAccessToken(data.accessToken) // Updates the new accessToken in the Zustand store (userAuthStore) used for managing auth state
                original.headers['Authorization'] = `Bearer ${data.accessToken}` // Updates the original failed request with the new access token
                return axiosInstance(original) // Retries the original request with the updated token
            } catch (error) {
                userAuthStore.getState().logout() // If refreshing the token fails (e.g., refresh token expired), log the user out
            }
        }
        return Promise.reject(err) // If the error wasn't a 401 or retry failed, propagate the error normally
    }
)

export default axiosInstance