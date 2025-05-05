import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true, // Send cookies with every single request
})

export default axiosInstance