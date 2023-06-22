import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout.tsx'
import HomeLayout from './layouts/HomeLayout.tsx'

import LoginPage from './pages/login/index.tsx'
import SignupPage from './pages/signup/index.tsx'

import HomePage from './pages/home/index.tsx'
import ErrorPage from './pages/error/index.tsx'

import PublicRoute from './routes/PublicRoute.tsx'
import PrivateRoute from './routes/PrivateRoute.tsx'

import './index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <PrivateRoute><HomePage /></PrivateRoute>,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <PublicRoute><LoginPage /></PublicRoute>,
      },
      {
        path: '/auth/signup',
        element: <PublicRoute><SignupPage /></PublicRoute>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
