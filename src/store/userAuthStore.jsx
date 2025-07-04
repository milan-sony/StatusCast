import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userAuthStore = create((set) => ({

    user: null,
    accessToken: null,
    isUserAuthenticated: false,
    isLoading: true,
    isSigningUp: false,
    isLoggingIn: false,

    setAccessToken: (accessToken) => set({ accessToken }),
    setUserAuthenticate: (isUserAuthenticated) => set({ isUserAuthenticated }),
    setLoading: (isLoading) => set({ isLoading }),
    setUser: (user) => set({ user }),

    signup: async (data, navigate) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            if (res.data?.status === 201) {
                toast.success(res.data?.message || "Account successfully created!")

                const loginData = {
                    email: data.email,
                    password: data.password
                }

                const loginRes = await axiosInstance.post("/auth/login", loginData)

                if (loginRes.data?.status === 200) {
                    set({
                        user: loginRes.data?.data,
                        accessToken: loginRes.data?.token,
                        isUserAuthenticated: true
                    })
                    toast.success(loginRes.data?.message || "Login successfull")
                    navigate("/home")
                }
            }
        } catch (error) {
            console.error("Error signing up the user, ", error.message)
            toast.error(error.response?.data?.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data, navigate) => {
        set({ isLoggingIn: true })
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
            console.error("Error logging up the user, ", error.message)
            toast.error(error.response?.data.message || "Invalid credentials")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async (navigate) => {
        try {
            const res = await axiosInstance.get("/auth/logout")

            set({
                user: null,
                accessToken: null,
                isUserAuthenticated: false
            })

            toast.success(res.data?.message || "Successfully logged out")
            navigate("/")

        } catch (error) {
            console.error("Error logging out the user, ", error)
        }
    },

    axiosLogout: async () => {
        try {
            const res = await axiosInstance.get("/auth/logout")

            set({
                user: null,
                accessToken: null,
                isUserAuthenticated: false
            })

        } catch (error) {
            console.error("Error logging out the user, ", error)
        }
    }
}))