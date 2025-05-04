import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userAuthStore = create((set) => ({

    user: null,
    accessToken: null,
    isUserAuthenticated: false,

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
                    accessToken: res.data?.token,
                    isUserAuthenticated: true
                })
                toast.success(res.data?.message || "Login successfull")
                navigate("/home")
            }
        } catch (error) {
            console.error("Error logging up the user, ", error)
            toast.error(error.response?.data.message || "Invalid credentials")
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            console.log(res)
            set({
                isUserAuthenticated: true
            })
        } catch (error) {

        }
    },

    profile: async () => {
        try {
            const res = await axiosInstance.post("/auth/profile")
            console.log("Profile res", res)
        } catch (error) {
            console.error(error)
        }
    },

    logout: async (navigate) => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            if (res.data?.status === 200) {
                set({
                    user: null,
                    accessToken: null,
                    isUserAuthenticated: false
                })
                toast.success(res.data?.message || "Successfully logged out")
                navigate("/login")
            }

        } catch (error) {
            console.error("Error logging out the user, ", error.response?.data?.message || "Error logging out the user")
        }
    }
}))