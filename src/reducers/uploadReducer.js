const SHOW_UPLOADER = 'SHOW_UPLOADER'
const HIDE_UPLOADER = 'HIDE_UPLOADER'
const ADD_FILE_TO_UPLOADER = 'ADD_FILE_TO_UPLOADER'
const REMOVE_FILE_FROM_UPLOADER = 'REMOVE_FILE_FROM_UPLOADER'
const CHANGE_PROGRESS = 'CHANGE_PROGRESS'
const CLEAR_STATE = 'CLEAR_STATE'

const defaultState = {
  isVisible: false,
  files: [],
}

// eslint-disable-next-line
export default (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_UPLOADER:
      return { ...state, isVisible: true }
    case HIDE_UPLOADER:
      return { ...state, isVisible: false }
    case ADD_FILE_TO_UPLOADER:
      return {
        ...state,
        files: [...state.files, action.payload],
      }
    case REMOVE_FILE_FROM_UPLOADER:
      return {
        ...state,
        files: [...state.files.filter((file) => file.id !== action.payload)],
      }
    case CHANGE_PROGRESS:
      return {
        ...state,
        files: [
          ...state.files.map((file) =>
            file.id === action.payload.id
              ? { ...file, progress: action.payload.progress }
              : { ...file }
          ),
        ],
      }
    case CLEAR_STATE:
      return {
        isVisible: false,
        files: [],
      }
    default:
      return state
  }
}

export const showUploaderReducer = () => ({ type: SHOW_UPLOADER })
export const hideUploaderReducer = () => ({ type: HIDE_UPLOADER })
export const addFileToUploaderReducer = (file) => ({
  type: ADD_FILE_TO_UPLOADER,
  payload: file,
})
export const removeFileFromUploaderReducer = (fileId) => ({
  type: REMOVE_FILE_FROM_UPLOADER,
  payload: fileId,
})
export const changeProgressUploaderReducer = (progress) => ({
  type: CHANGE_PROGRESS,
  payload: progress,
})
export const clearStateUploaderReducer = () => ({ type: CLEAR_STATE })