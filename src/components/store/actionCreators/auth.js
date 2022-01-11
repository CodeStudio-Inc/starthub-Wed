import * as actions from '../actions'
import axios from 'axios'

export const loaderAction = () => {
    return {
        type: actions.LOADER_ACTION
    }
}

export const setUser = (admin,userId, username, base_key, link, email,category, token, tokenExpiration) => {
    return {
        type: actions.SET_USER,
        admin,
        userId,
        username,
        base_key,
        link,
        email,
        category,
        token,
        tokenExpiration
    }
}


export const removeUser = () => {
    return {
        type: actions.REMOVE_USER
    }
}


export const login = (email, password,callback) => {
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
                dispatch(setUser(res.data.admin, res.data.userId, res.data.username, res.data.base_key, res.data.link, res.data.email,res.data.category, res.data.token, res.data.tokenExpiration))
            })
            .catch(error => {
                console.log(error)
                callback({ success: false, error: error })
            })
    }
}


export const signUp = (username, email, category, password, base_key, link) => {
    return dispatch => {
        dispatch(loaderAction())

        const data = {
            username,
            email,
            category,
            password,
            base_key,
            link,
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
                // callback({ success: true, res: res })
                console.log(res,'response')
                // dispatch(setUser(res.data.admin, res.data.userId, res.data.username, res.data.base_key, res.data.link, res.data.email, res.data.token))
            })
            .catch(error => {
                // callback({ success: false, res: error })
                console.log(error)
            })
    }
}