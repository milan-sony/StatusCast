import React, { useEffect } from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
import { userAuthStore } from './store/authStore'
import axiosInstance from './lib/Axios'

function App() {

  const { setAccessToken, setUserAuthenticate, setLoading } = userAuthStore()

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const res = await axiosInstance.get("/auth/refresh", null, { withCredentials: true })
        setAccessToken(res.data?.accessToken)
        setUserAuthenticate(true)
      } catch (error) {
        console.error("Not authenticated", error.message)
      } finally {
        setLoading(false)
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
