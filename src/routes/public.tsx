import { type RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import Register from '../pages/auth/register'
import Login from '../pages/auth/login'
import NotFound from '../pages/notFound'


export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: < ></>,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]
