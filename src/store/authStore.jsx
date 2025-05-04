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
            if (res.data?.status === 201) {
                toast.success(res.data?.message || "Account successfully created!")
                navigate("/login")
            }
        } catch (error) {
            console.error("Error signing up the user, ", error)
            toast.error(error.response?.data?.message)
        }
    },

    login: async (data, navigate) => {
        try {
            const res = await axiosInstance.post("/auth/login", data)
            if (res.data?.status === 200) {
                set({
                    user: res.data?.data,
                    accessToken: res.data?.token
                })
                toast.success(res.data?.message || "Login successfull")
                navigate("/home")
            }
        } catch (error) {
            console.error("Error logging up the user, ", error)
            toast.error(error.response?.data.message || "Invalid credentials")
        }
    },

    logout: async () => {
        await axiosInstance.post("/auth/logout")
        set({ user: null, accessToken: null })
    }
}))