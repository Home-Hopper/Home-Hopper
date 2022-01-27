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
const roomService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/rooms`,

  headers: {
    Authorization: USER_HELPERS.getUserToken(),
  },
})

export const getAllRooms = async (search) => {
  try {
    const res = await roomService.get('/for-rent' + search)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const getRoom = async (roomId) => {
  try {
    const res = await roomService.get(`/for-rent/${roomId}`)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const getUserRooms = async (userId) => {
  try {
    const res = await roomService.post('/your-rooms', userId)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const createRoom = async (roomInfo) => {
  try {
    const res = await roomService.post('/create', roomInfo)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const updateRoom = async (roomInfo) => {
  try {
    const res = await roomService.put('/update', roomInfo)
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const updateSavedRooms = async (userId, roomId, toBeSaved) => {
  try {
    const res = await roomService.put('/update-saved', {
      userId,
      roomId,
      toBeSaved,
    })
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}

export const deleteRoom = async (roomId) => {
  try {
    const res = await roomService.delete('/delete', { data: { roomId } })
    return successStatus(res)
  } catch (err) {
    return internalServerError(err)
  }
}
