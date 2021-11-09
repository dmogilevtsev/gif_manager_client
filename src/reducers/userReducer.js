import { ACCESS_TOKEN } from '../utils/names'

const SET_USER = 'set_user'
const LOGOUT = 'logout'

const defaultState = {
  currentUser: {},
  isAuth: false,
}

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const logout = () => ({ type: LOGOUT })

// eslint-disable-next-line
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      }
    case LOGOUT:
      localStorage.removeItem(ACCESS_TOKEN)
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      }
    default:
      return state
  }
}
