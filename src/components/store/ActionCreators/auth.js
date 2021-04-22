import * as actions from '../Actions'
import axios from 'axios'

export const loginAction = () => {
    return {
        type: actions.LOADING_ACTION
    }
}

export const setError = (error) => {
    console.log('object', error)
    return {
        type: actions.SET_ERROR,
        error
    }
}

export const setUser = (userId, username, email, token) => {
    return {
        type: actions.SET_USER,
        userId,
        username,
        email,
        token
    }
}

export const removeUser = () => {
    return {
        type: actions.REMOVE_USER
    }
}

export const register = (username, email, password, callback) => {
    return async dispatch => {
        dispatch(loginAction())

        const data = {
            username,
            email,
            password
        }

        await axios.put('https://starthubafrica-api.herokuapp.com/auth/signup', data)
            .then(res => {
                console.log(res.data)
                callback({ success: true, res: res })
            })
            .catch(error => {
                callback({ success: false, res: error })
                console.log(error)
            })
    }
}

export const login = (email, password, callback) => {
    return async dispatch => {
        dispatch(loginAction())

        const data = {
            email,
            password
        }

        await axios.post('https://starthubafrica-api.herokuapp.com/auth/signin', data,
            {
                headers:
                {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                dispatch(setUser(res.data.userId, res.data.username, res.data.email, res.data.token))
            })
            .catch(error => {
                callback({ success: false, res: error })
                console.log(error)
            })
    }
}