import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import fileReducer from './fileReducer'
import userReducer from './userReducer'
import loadingReducer from './loadingReducer'
import uploadReducer from './uploadReducer'

const rootReducer = combineReducers({
	user: userReducer,
	files: fileReducer,
	loading: loadingReducer,
	upload: uploadReducer,
})

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
)
