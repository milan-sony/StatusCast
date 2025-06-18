import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"
import { data } from "react-router-dom"

export const userFriendRequestStore = create((set) => ({

    receivedRequests: [],
    sentRequests: [],
    isLoading: false,

    sendRequest: async (id) => {
        try {
            console.log("sendRequest id: ", id)
            const res = await axiosInstance.post("/friend-requests/send", { to: id })
            console.log("sendRequest res: ", res)
            toast.success(res?.data?.message)
        } catch (error) {
            console.error("sendRequest error: ", error)
            toast.error(error.response?.data?.message)
        }
    },

    getReceivedRequests: async () => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.get("/friend-requests/received-requests")
            console.log("getPendingRequests: ", res)
            set({
                receivedRequests: res?.data?.message
            })
        } catch (error) {
            console.error("getPendingRequests error: ", error)
            toast.error(error.response?.data?.message)
        } finally {
            set({ isLoading: false })
        }
    },

    getSentRequests: async () => {
        set({ isLoading: true })

        try {
            const res = await axiosInstance.get("/friend-requests/sent-requests")
            console.log("getSentRequests: ", res)
            set({
                sentRequests: res?.data?.message
            })
        } catch (error) {
            console.error("getSentRequests error: ", error)
            toast.error(error.response?.data?.message)
        } finally {
            set({ isLoading: false })
        }
    },

    respondToFriendRequest: async (fromUserId, action) => {
        try {
            const res = await axiosInstance.post("/friend-requests/respond-requests", {
                from: fromUserId,
                action
            })
            set({
                receivedRequests: []
            })
            toast.success(res?.data?.message)
            console.log("respondToFriendRequest res: ", res)
        } catch (error) {
            console.error("respondToFriendRequest error: ", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    },

    cancelFriendRequest: async (id) => {
        try {
            const res = await axiosInstance.post("/friend-requests/cancel-requests", { to: id })
            set({
                sentRequests: []
            })
            console.log("cancelFriendRequest", res)
            toast.success(res?.data?.message)
        } catch (error) {
            console.error("cancelFriendRequest error: ", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

}))