import * as actions from '../actions'
import { updateObject } from './utility'

const initialState = {
    userId: '',
    username: '',
    email: '',
    token: '',
    loading: false,
    authenticated: false,
    error: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOADER_ACTION:
            return updateObject(state, {
                loading: true
            })

        case actions.SET_USER:
            return updateObject(state, {
                loading: false,
                userId: action.userId,
                username: action.username,
                email: action.email,
                token: action.token,
                authenticated: true
            })

        case actions.REMOVE_USER:
            return updateObject(state, {
                userId: '',
                email: '',
                token: '',
                authenticated: false
            })


        default:
            return state
    }
}

export default auth;