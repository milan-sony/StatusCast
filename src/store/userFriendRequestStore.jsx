import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userFriendRequestStore = create((set) => ({

    sendRequest: async (id) => {
        try {
            console.log("userFriendRequestStore id: ", id)
            const res = await axiosInstance.post("/friend-requests/send", { to: id })
            console.log("userFriendRequestStore res: ", res)
            toast.success(res?.data?.message)
        } catch (error) {
            console.error("userFriendRequestStore error: ", error)
            toast.error(error.response?.data?.message)
        }
    }

}))