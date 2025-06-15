import { useEffect, useState } from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
import { userAuthStore } from './store/userAuthStore'
import axiosInstance from './lib/Axios'
import Navbar from './components/Navbar/Navbar'
import PageLoader from './components/Loader/PageLoader'

function App() {
  const { setAccessToken, setUserAuthenticate, setLoading, isLoading, setUser, user } = userAuthStore()
  const [showLoader, setShowLoader] = useState(false) // State to control loader visibility
  const loaderDelay = 1000 // Delay in milliseconds

  useEffect(() => {
    const checkRefreshToken = async () => {

      setLoading(true) // Start loading
      setShowLoader(true) // Show loader immediately

      try {

        const res = await axiosInstance.get("/auth/refresh", { withCredentials: true })

        setAccessToken(res.data?.accessToken)
        setUserAuthenticate(true)

        // Fetch user profile after refresh success
        const profileRes = await axiosInstance.post("/user/profile")

        if (profileRes.data?.status === 200) {
          setUser(profileRes.data?.user)
        }

      } catch (error) {

        console.error("Not authenticated", error.message)
        setUserAuthenticate(false)

      } finally {

        setLoading(false) // End loading
        // Set a timeout to hide the loader after the delay
        setTimeout(() => {
          setShowLoader(false)
        }, loaderDelay)

      }
    }

    checkRefreshToken()

    // Cleanup function to clear timeout if the component unmounts
    return () => {
      setShowLoader(false)
    }
  }, [setAccessToken, setUserAuthenticate, setLoading, setUser])

  console.log("isLoading:", isLoading)

  if (showLoader || isLoading) { // Show loader if either condition is true
    return <PageLoader />
  }

  return (
    <div>
      <Navbar />
      <Router />
      <Toaster />
    </div>
  )
}

export default App
