import React, { useEffect } from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
import { userAuthStore } from './store/authStore'
import axiosInstance from './lib/Axios'
import Navbar from './components/Navbar/Navbar'
import PageLoader from './components/Loader/PageLoader'

function App() {

  const { setAccessToken, setUserAuthenticate, setLoading } = userAuthStore()
  const loadingDelay = 500; // Delay in milliseconds

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



  return (
    <div>
      <PageLoader delay={loadingDelay} /> {/* Pass the delay to the Loader */}
      <Navbar />
      <Router />
      <Toaster />
    </div>
  )
}

export default App