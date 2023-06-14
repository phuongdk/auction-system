import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './Header'
import Footer from './Footer'

import { setAuthorization } from '../ultilities/apiClient'
import { getToken } from '../ultilities/authUtils'
import { UserContext } from '../ultilities/contexts'

interface props {
  children?: React.ReactNode
}

const UserProvider: React.FC<props> = ({ children }) => {
  const user = {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    full_name: '',
    balance: 0,
    temporary_hold: null
  }
  const [userInfo, updateData] = useState(user);
  return (
    <UserContext.Provider value={{ ...userInfo, updateData }}>
      {children}
    </UserContext.Provider>
  )
}

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const HomeLayout: React.FC = () => {
  useEffect(() => {
    const token = getToken()
    if (token) {
      setAuthorization(token)
    }
  }, [])

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='home-layout-wrapper'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </UserProvider>
  )
}

export default HomeLayout