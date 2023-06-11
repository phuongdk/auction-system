import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout.tsx'
import HomeLayout from './layouts/HomeLayout.tsx'

import LoginPage from './pages/login/index.tsx'
import SignupPage from './pages/signup/index.tsx'

import HomePage from './pages/home/Home.tsx'
import ErrorPage from './pages/error/index.tsx'

import './index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/signup',
        element: <SignupPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
