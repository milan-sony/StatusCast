import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userStatusStore = create((set) => ({
    statusData: null,
    isStatusSet: false,
    userStatus: null,

    setStatus: async (data, navigate) => {
        set({ isStatusSet: true })

        try {
            console.log("data, ", data)
            const res = await axiosInstance.post("/status/set-status", data)
            if (res.data?.status === 201) {
                set({
                    statusData: res.data?.data
                })
                toast.success(res.data?.message || "Status saved successfully")
                navigate("/home")
            } else {
                console.log("setstatus res: ", res)
                toast.error(res.data?.message || "You have already set one status")
            }
        } catch (error) {
            console.error("setStatus error", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isStatusSet: false })
        }
    },

    getStatus: async (userId) => {
        console.log("userId", userId)
        try {
            const res = await axiosInstance.get(`/status/get-status/${userId}`)
            console.log("getStatus res: ", res)
            set({
                userStatus: res.data?.message
            })
        } catch (error) {
            set({
                userStatus: null
            })
            console.error("Error getting the user status: ", error)
        }
    },

    deleteStatus: async (userId) => {
        try {
            const res = await axiosInstance.delete(`/status/delete-status/${userId}`)
            console.log("Del status res: ", res)
            set({
                userStatus: null,
                statusData: null
            })
            toast.success(res.data?.message || "Status deleted successfully")
        } catch (error) {
            set({
                userStatus: null
            })
            console.error("Del status error: ", error)
            toast.error(error.response?.data?.message || "Something went wrong")

        }
    }

}))