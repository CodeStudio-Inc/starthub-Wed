import * as actions from '../actions'
import axios from 'axios'

export const loaderAction = () => {
    return {
        type: actions.LOADER_ACTION
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


export const login = (email, password) => {
    return dispatch => {
        dispatch(loaderAction())

        const data = {
            email,
            password
        }

        axios.post('https://starthubafrica.herokuapp.com/auth/signin', data)
            .then(res => {
                dispatch(setUser(res.data.userId, res.data.username, res.data.email, res.data.token))
                // console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const signUp = (username, email, password) => {
    return dispatch => {
        dispatch(loaderAction())

        const data = {
            username,
            email,
            password
        }

        axios.put('https://starthubafrica.herokuapp.com/auth/signup', data,
            {
                headers:
                {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                // console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
}