import axios from 'axios'
import * as USER_HELPERS from '../utils/userToken'

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
export const internalServerError = (err) => {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    }
  }
  return {
    status: false,
    errorMessage: 'Internal server error. Please check your server',
  }
}

export const successStatus = (res) => {
  return {
    status: true,
    data: res.data,
  }
}

// creates a basic url for every request in this file
const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
})

export const login = async (credentials) => {
  try {
    const res = await authService.post('/login', credentials)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const getLoggedIn = async () => {
  try {
    const res = await authService.get(`session`, {
      headers: {
        Authorization: USER_HELPERS.getUserToken(),
      },
    })
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const signup = async (credentials) => {
  try {
    const res = await authService.post('/signup', credentials)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const logout = async () => {
  try {
    const res = await authService.delete('/logout', {
      headers: {
        Authorization: USER_HELPERS.getUserToken(),
      },
    })
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}
