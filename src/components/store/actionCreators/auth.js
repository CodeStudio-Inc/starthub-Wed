import * as actions from '../actions'
import axios from 'axios'

export const loaderAction = () => {
    return {
        type: actions.LOADER_ACTION
    }
}

export const setUser = (admin,userId, username, base_key, link, email, token) => {
    return {
        type: actions.SET_USER,
        admin,
        userId,
        username,
        base_key,
        link,
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

        axios.post('https://starthubafrica-api.el.r.appspot.com/auth/signin', data,
            {
                headers:
                {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                dispatch(setUser(res.data.admin, res.data.userId, res.data.username, res.data.base_key, res.data.link, res.data.email, res.data.token))
                // console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export const signUp = (username, base_key,link, email, password,callback) => {
    return dispatch => {
        dispatch(loaderAction())

        const data = {
            username,
            base_key,
            link,
            email,
            password
        }

        axios.put('https://starthubafrica-api.el.r.appspot.com/auth/signup', data,
            {
                headers:
                {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                // console.log(res,'response')
                dispatch(setUser(res.data.admin, res.data.userId, res.data.username, res.data.base_key, res.data.link, res.data.email, res.data.token))
            })
            .catch(error => {
                callback({ success: false, res: error })
                console.log(error)
            })
    }
}