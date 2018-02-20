import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export const privateRoutes = [
  {
    path: '/dashboard',
    component: Dashboard,
    key: 'map'
  },
]

export const publicRoutes = [{
    path: '/login',
    component: Login
  }
]
