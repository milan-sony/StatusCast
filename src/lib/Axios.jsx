import axios from 'axios'
import { userAuthStore } from '../store/auth';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true, // Send cookies with every single request
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = userAuthStore.getState().accessToken
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        return config
    }
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
    res => res,
    async err => {
        const original = err.config
        if (err.response?.status === 401 && !original._retry) {
            original._retry = true
            try {
                const { data } = await axios.post(import.meta.env.VITE_APP_API_URL, {}, { withCredentials: true })
                userAuthStore.getState().setAccessToken(data.accessToken)
                original.headers['Authorization'] = `Bearer ${data.accessToken}`
                return axiosInstance(original)
            } catch (error) {
                userAuthStore.getState().logout()
            }
        }
        return Promise.reject(err)
    }
)

export default axiosInstance