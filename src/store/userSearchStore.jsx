import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userSearchStore = create((set) => ({
    userProfiles: [],
    isLoading: false,

    searchUserProfiles: async (data) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.post("/search/search-profile", data)

            console.log("userProfileStore res: ", res)

            set({
                userProfiles: res.data?.message
            })

        } catch (error) {
            console.error("Error in userProfileStore: ", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isLoading: false })
        }
    }

}))