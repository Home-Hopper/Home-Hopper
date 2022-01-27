import { createContext, useState, useEffect } from 'react'
import { getLoggedIn, logout } from '../services/auth.services'
import * as USER_HELPERS from '../utils/userToken'
import LoadingComponent from '../components/Loading'

const AuthContext = createContext()
const AuthProviderWrapper = (props) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken()
    if (!accessToken) {
      return setIsLoading(false)
    }

    const loadUser = async () => {
      try {
        const res = await getLoggedIn()
        if (!res.status) {
          return setIsLoading(false)
        }
        setUser(res.data.user)
        setIsLoading(false)
      } catch (err) {
        console.log('Error loading user:', err)
      }
    }

    loadUser()
  }, [])

  const handleLogout = async () => {
    const accessToken = USER_HELPERS.getUserToken()
    if (!accessToken) {
      setUser(null)
      return setIsLoading(false)
    }
    setIsLoading(true)

    try {
      logout(accessToken)
      USER_HELPERS.removeUserToken()
      setIsLoading(false)
      return setUser(null)
    } catch (err) {
      console.log('Error loggin out:', err)
    }
  }

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
