import { setUser, logout as logoutReducer } from '../reducers/userReducer'
import { ACCESS_TOKEN } from '../utils/names'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AUTH_URL } from '../http'
import { setLoading } from '../reducers/loadingReducer'

export const registration = async (email, password) => {
  try {
    const res = await AuthService.registration(email, password)
    console.log('registration', res.data)
  } catch (error) {
    console.warn(error?.response?.data?.message)
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await AuthService.login(email, password)
      dispatch(setUser(res.data.user))
      localStorage.setItem(ACCESS_TOKEN, res.data[ACCESS_TOKEN])
    } catch (error) {
      console.warn(error?.response?.data?.message)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await AuthService.logout()
      dispatch(logoutReducer())
      localStorage.removeItem(ACCESS_TOKEN)
    } catch (error) {
      console.warn(error?.response?.data?.message)
    }
  }
}

export const checkAuth = () => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const res = await axios.get(`${AUTH_URL}/refresh`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      dispatch(setUser(res.data.user))
      localStorage.setItem(ACCESS_TOKEN, res.data[ACCESS_TOKEN])
    } catch (error) {
      console.warn(error?.response?.data?.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
}
