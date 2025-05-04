import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userAuthStore = create((set) => ({
    user: null,
    accessToken: null,

    setAuth: (user, accessToken) => set({ user, accessToken }),
    setAccessToken: (accessToken) => set({ accessToken }),

    signup: async (data, navigate) => {

        try {
            const res = await axiosInstance.post("/auth/signup", data)
            toast.success(res.data?.message || "Account successfully created!")
            navigate("/login")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    },

    logout: async () => {
        await axiosInstance.post("/auth/logout")
        set({ user: null, accessToken: null })
    }
}))