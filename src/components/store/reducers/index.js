import { combineReducers } from 'redux'
import authReducer from './auth'
import requestReducer from './requests'
import adminReducer from './admin'

export default combineReducers({
    auth: authReducer,
    requests: requestReducer,
    admin: adminReducer
})