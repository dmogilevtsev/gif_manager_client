const LOADING = 'loading'

const defaultState = {
  isLoading: false,
}

export const setLoading = (loading) => ({ type: LOADING, payload: loading })

// eslint-disable-next-line
export default (state = defaultState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}
