import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../ultilities/authUtils'

interface props {
    children: React.ReactNode
}

const PrivateRoute: React.FC<props> = (props) => {
    const isLoggedIn = getToken()
    return isLoggedIn ? <>{props.children}</> : <Navigate to='/auth/login' />
}

export default PrivateRoute