import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../ultilities/authUtils'

interface props {
  children: React.ReactNode
}

const PublicRoute: React.FC<props> = ({children}) => {
  const isLoggedIn = getToken()
  return !isLoggedIn ? <>{children}</> : <Navigate to='/' />
}

export default PublicRoute