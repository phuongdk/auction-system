import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './Header'
import Footer from './Footer'

import { setAuthorization } from '../ultilities/apiClient';
import { getToken } from '../ultilities/authUtils';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const HomeLayout: React.FC = () => {
  useEffect(() => {
    const token = getToken()
    if (token) {
      setAuthorization(token);
    }
  }, [])

  return (
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
  );
};

export default HomeLayout;