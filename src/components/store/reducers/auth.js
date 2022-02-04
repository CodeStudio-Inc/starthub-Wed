import * as actions from '../actions'
import { updateObject } from './utility'

const initialState = {
    userId: '',
    username: '',
    base_key:'',
    unique_startup_link:'',
    link:'',
    email: '',
    token: '',
    category:'',
    tokenExpiration:'',
    user_activity: [],
    admin:null,
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
                admin: action.admin,
                userId: action.userId,
                username: action.username,
                base_key: action.base_key,
                link: action.link,
                email: action.email,
                category: action.category,
                token: action.token,
                tokenExpiration: action.tokenExpiration,
                authenticated: true
            })

        case actions.SET_USER_ACTIVITY:
            return updateObject(state, {
                loading: false,
                user_activity: action.data
            })

        case actions.REMOVE_USER:
            return updateObject(state, {
                userId: '',
                email: '',
                token: '',
                authenticated: false,
                loading: false
            })


        default:
            return state
    }
}

export default auth;