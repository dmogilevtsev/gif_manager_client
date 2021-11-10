const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'

const defaultState = {
  isLoading: false,
}

export const showLoadingReducer = () => ({ type: SHOW_LOADING })
export const hideLoadingReducer = () => ({ type: HIDE_LOADING })

// eslint-disable-next-line
export default (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, isLoading: true }
    case HIDE_LOADING:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
