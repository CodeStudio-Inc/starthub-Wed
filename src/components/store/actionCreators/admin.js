import * as actions from '../actions'
import axios from 'axios'


export const loadAction = () => {
    return {
        type: actions.LOADER_ACTION
    }
}

export const setUsers = (data) => {
    return {
        type: actions.SET_ADMIN_USER,
        data
    }
}

export const setBoards = (data) => {
    return {
        type: actions.SET_ADMIN_BOARDS,
        data
    }
}

export const setLists = (data) => {
    return {
        type: actions.SET_ADMIN_LISTS,
        data
    }
}

export const setCards = (data) => {
    return {
        type: actions.SET_ADMIN_CARDS,
        data
    }
}

export const getUsers = () => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get('https://starthubafrica-api.el.r.appspot.com/admin/users', {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setUsers(res.data.users))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAdminBoard = (userId, callback) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/admin/boards/${userId}`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setBoards(res.data.boards))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAdminLists = (userId, boardId) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/admin/lists/${userId}/${boardId}`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res)
                dispatch(setLists(res.data.lists))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAdminCards = (userId, boardId) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/admin/cards/${userId}/${boardId}`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res)
                dispatch(setCards(res.data.cards))
            })
            .catch(error => {
                console.log(error)
            })
    }
}