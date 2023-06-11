import React from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const AuthLayout: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className='auth-layout-wrapper'>
                <Outlet />
            </div>
        </ThemeProvider>
    );
};

export default AuthLayout;