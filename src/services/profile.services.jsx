import axios from 'axios'
// import * as USER_HELPERS from '../utils/userToken'

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

const profileService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/profile`,
})

export const getSavedRooms = async (userId) => {
  try {
    const res = await profileService.get(`/${userId}`)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}
export const updateProfile = async (credentials) => {
  try {
    const res = await profileService.put('/update', credentials)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}
