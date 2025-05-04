import { create } from zustand
import axiosInstance from "../lib/Axios"

export const userAuthStore = create((set) => ({
    user: null,
    accessToken: null,

    setAuth: (user, accessToken) => set({ user, accessToken }),
    setAccessToken: (accessToken) => set({ accessToken }),

    logout: async () => {
        await axiosInstance.post("/auth/logout")
        set({ user: null, accessToken: null })
    }
}))