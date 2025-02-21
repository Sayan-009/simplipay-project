import React from 'react'
import { Link } from 'react-router-dom'
import Login from './ui/Login'

function LoginComponent() {
  return (
    <>
      <div className="p-2 flex justify-between ">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          SimpliPay
        </Link>
        <Link to="/" className="text-l font-bold text-gray-800 dark:text-white flex items-center gap-1">
          <img src="../src/assets/back.png" alt="back button" className="w-4 h-3" /> <span>Home</span>
        </Link>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800">
        <Login />
      </div>
    </>

  )
}

export default LoginComponent
