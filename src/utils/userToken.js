import * as CONSTS from './consts'

export const getUserToken = () => {
  return localStorage.getItem(CONSTS.ACCESS_TOKEN)
}

export const setUserToken = (value) => {
  return localStorage.setItem(CONSTS.ACCESS_TOKEN, value)
}

export const removeUserToken = () => {
  return localStorage.removeItem(CONSTS.ACCESS_TOKEN)
}
