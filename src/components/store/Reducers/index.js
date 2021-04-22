import { combineReducers } from 'redux'
import authReducer from './auth'
import requestReducer from './requests'

export default combineReducers({
    auth: authReducer,
    requests: requestReducer
})