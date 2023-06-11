import React from 'react'
import LoginComponent from './components'
import { get } from '../../helpers/apiClient'

const LoginPage: React.FC = () => {
  get('/users').then(response => console.log('response', response))
  return (
    <>
     <LoginComponent />
    </>
  )
}

export default LoginPage