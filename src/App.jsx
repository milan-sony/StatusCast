import React, { useEffect } from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
import { userAuthStore } from './store/authStore'
import axiosInstance from './lib/Axios'

function App() {

  const { setUser, setAccessToken } = userAuthStore()

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const res = await axiosInstance.post("/auth/refresh", null, { withCredentials: true })
        setAccessToken(res.data?.accessToken)
        const checkProfile = await axiosInstance.post("/api/check", {
          headers: { Authorization: `Bearer ${res.data?.accessToken}` }
        })
        setUser(checkProfile.data.user)
      } catch (error) {
        console.error("Not authenticated", error)
      }
    }
    checkRefreshToken()
  }, [])

  return (
    <div>
      <Router />
      <Toaster />
    </div>
  )
}

export default App
