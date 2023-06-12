import React from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
    palette: {
        mode: 'light',
    },
})

const AuthLayout: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='auth-layout-wrapper'>
                <Outlet />
            </div>
        </ThemeProvider>
    );
};

export default AuthLayout;