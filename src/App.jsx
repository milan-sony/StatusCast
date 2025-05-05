import React, { useEffect } from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div>
      <Router />
      <Toaster />
    </div>
  )
}

export default App
