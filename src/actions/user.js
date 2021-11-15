import { logout as logoutReducer, setUser } from '../reducers/userReducer'
import { ACCESS_TOKEN } from '../utils/names'
import AuthService from '../services/AuthService'
import $api, { AUTH_URL } from '../http'
import { hideLoadingReducer, showLoadingReducer } from '../reducers/loadingReducer'

export const registration = async (email, password) => {
	try {
		await AuthService.registration(email, password)
	} catch ( error ) {
		alert(error?.response?.data?.message)
	}
}

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const res = await AuthService.login(email, password)
			dispatch(setUser(res.data.user))
			localStorage.setItem(ACCESS_TOKEN, res.data[ACCESS_TOKEN])
		} catch ( error ) {
			alert(error?.response?.data?.message)
		}
	}
}

export const logout = () => {
	return async (dispatch) => {
		try {
			await AuthService.logout()
			dispatch(logoutReducer())
			localStorage.removeItem(ACCESS_TOKEN)
		} catch ( error ) {
			alert(error?.response?.data?.message)
		}
	}
}

export const checkAuth = () => {
	return async (dispatch) => {
		dispatch(showLoadingReducer())
		try {
			const res = await $api.get(`${ AUTH_URL }/refresh`)
			dispatch(setUser(res.data.user))
			localStorage.setItem(ACCESS_TOKEN, res.data[ACCESS_TOKEN])
		} catch ( error ) {
			console.warn(error?.response)
			console.warn(error?.response?.data?.message)
		} finally {
			dispatch(hideLoadingReducer())
		}
	}
}
