import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userStatusStore = create((set) => ({
    statusData: null,
    isStatusSet: false,
    userStatus: null,
    allFriendsStatus: [],

    setStatus: async (data, navigate) => {
        set({ isStatusSet: true })

        try {
            const res = await axiosInstance.post("/status/set-status", data)
            if (res.data?.status === 201) {
                set({
                    statusData: res.data?.data
                })
                toast.success(res.data?.message || "Status saved successfully")
                navigate("/home")
            } else {
                toast.error(res.data?.message || "You have already set one status")
            }
        } catch (error) {
            console.error("setStatus error", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isStatusSet: false })
        }
    },

    getStatus: async () => {
        try {
            const res = await axiosInstance.get("/status/get-status")
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

    deleteStatus: async () => {
        try {
            const res = await axiosInstance.delete("/status/delete-status")
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
    },

    // getAllUsersStatus: async () => {
    //     try {
    //         const res = await axiosInstance.get("status/get-all-status")
    //         set({
    //             allUserStatus: res.data?.message
    //         })
    //     } catch (error) {
    //         console.error("Del status error: ", error)
    //         toast.error(error.response?.data?.message || "Something went wrong")
    //     }
    // }

    getAllFriendsStatus: async () => {
        try {
            const res = await axiosInstance.get("status/get-friends-status")
            set({
                allFriendsStatus: res.data?.message
            })
        } catch (error) {
            console.error("Del status error: ", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

}))