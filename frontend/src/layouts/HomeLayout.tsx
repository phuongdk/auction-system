import React from 'react';
import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const HomeLayout: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className='home-layout-wrapper'>
                <Outlet />
            </div>
        </ThemeProvider>
    );
};

export default HomeLayout;