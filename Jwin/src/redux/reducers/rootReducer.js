import { combineReducers } from 'redux'
import authReducer from './authReducer'
import isAdminReducer from './isAdminReducer'
const rootReducers = combineReducers({
    authReducer,
    isAdminReducer
})

export default rootReducers