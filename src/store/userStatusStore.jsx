import toast from "react-hot-toast"
import { create } from 'zustand'
import axiosInstance from "../lib/Axios"

export const userStatusStore = create((set) => ({

    setStatus: async (data) => {
        try {
            console.log(data)
            // const res = axiosInstance.post("/status/set-status", data)
        } catch (error) {
            console.error("setStatus error", error)
        }
    }

}))