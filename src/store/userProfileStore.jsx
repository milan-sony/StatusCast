import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userProfileStore = create((set) => ({
    userProfiles: [],

    searchUserProfiles: async (data) => {
        try {
            console.log("userProfileStore data: ", data)

            const res = await axiosInstance.post("/search/search-profile", data)

            console.log("userProfileStore res: ", res)
            
            if (res.data?.status === 200) {
                set({
                    userProfiles: res.data?.message
                })
            }
        } catch (error) {
            console.error("Error in userProfileStore: ", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

}))