import Login from '../front/containers/Login'
import Register from '../front/containers/Register'

const routes = [
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/register',
    exact: true,
    component: Register
  }
]

export default routes
