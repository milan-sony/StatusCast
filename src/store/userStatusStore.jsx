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
            }
            console.log("status res: ", res)
        } catch (error) {
            console.error("setStatus error", error)
            toast.error(error.response?.data?.message)
        } finally {
            set({ isStatusSet: false })
        }
    },

    getStatus: async (userId) => {
        console.log("userId", userId)
        try {
            const res = await axiosInstance.get(`/status/get-status/${userId}`)
            console.log("getStatus res, ", res)
            set({
                userStatus: res.data?.message
            })
        } catch (error) {
            console.error("Error getting the user status: ", error)
        }
    }

}))