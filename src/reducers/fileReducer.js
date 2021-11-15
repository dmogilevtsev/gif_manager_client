const SET_FILES = 'set files'
const SET_CURRENT_DIR = 'set current dir'
const ADD_FILES = 'add folder'
const MODAL_POPUP = 'MODAL_POPUP'
const PUSH_DIR_STACK = 'PUSH_DIR_STACK'
const DELETE_FILE = 'delete file'

const defaultState = {
	files: [],
	currentDir: null,
	modalPopup: false,
	dirStack: [],
}

// eslint-disable-next-line
export default (state = defaultState, action) => {
	switch ( action.type ) {
		case SET_FILES:
			return { ...state, files: action.payload }
		case SET_CURRENT_DIR:
			return { ...state, currentDir: action.payload }
		case ADD_FILES:
			return { ...state, files: [ ...state.files, action.payload ] }
		case MODAL_POPUP:
			return { ...state, modalPopup: action.payload }
		case PUSH_DIR_STACK:
			return { ...state, dirStack: [ ...state.dirStack, action.payload ] }
		case DELETE_FILE:
			return {
				...state,
				files: [ ...state.files.filter((file) => file.id !== action.payload) ],
			}
		default:
			return state
	}
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const addFile = (file) => ({ type: ADD_FILES, payload: file })
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir })
export const setModalPopup = (modal) => ({ type: MODAL_POPUP, payload: modal })
export const onPushDirStack = (dir) => ({ type: PUSH_DIR_STACK, payload: dir })
export const removeFile = (dirId) => ({ type: DELETE_FILE, payload: dirId })
