import { Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../pages/LogIn'
import Signup from '../pages/Signup'
import YourRooms from '../pages/YourRooms'
import ForRent from '../pages/ForRent'
import RoomInfo from '../pages/RoomInfo'
import NewRoom from '../pages/NewRoom'
import Profile from '../pages/Profile'
import AboutUs from '../pages/AboutUs'
import * as PATHS from '../utils/paths'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const AppRoutes = () => {
  const { user } = useContext(AuthContext)
  return [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/:id',
      element: !user ? <Signup /> : <Navigate to={PATHS.HOMEPAGE} replace />,
    },

    {
      path: PATHS.LOGINPAGE,
      element: !user ? <Login /> : <Navigate to={PATHS.HOMEPAGE} replace />,
    },
    {
      path: PATHS.FORRENT,
      element: <ForRent />,
    },
    {
      path: PATHS.ROOMINFO,
      element: <RoomInfo />,
    },
    {
      path: PATHS.PROFILE,
      element: user ? <Profile /> : <Navigate to={PATHS.LOGINPAGE} replace />,
    },
    {
      path: PATHS.YOURROOMS,
      element:
        user && user.isLandlord ? (
          <YourRooms />
        ) : (
          <Navigate to={PATHS.LOGINPAGE} replace />
        ),
    },
    {
      path: PATHS.NEWROOM,
      element: user ? <NewRoom /> : <Navigate to={PATHS.LOGINPAGE} replace />,
    },
    {
      path: PATHS.ABOUTUS,
      element: <AboutUs />,
    },
  ]
}

export default AppRoutes
