import React, { useEffect } from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
import { userAuthStore } from './store/authStore'
import axiosInstance from './lib/Axios'
import { Loader } from 'lucide-react'

function App() {

  const { setAccessToken, setUserAuthenticate, setLoading, isLoading } = userAuthStore()

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
    setLoading(true) // Set loading to true before checking the token
    checkRefreshToken()
  }, [setAccessToken, setUserAuthenticate, setLoading])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <Router />
      <Toaster />
    </div>
  )
}

export default App