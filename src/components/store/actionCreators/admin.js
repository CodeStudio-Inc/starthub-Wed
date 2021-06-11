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
        const token = getState().auth.admin_token

        axios.get('https://starthubafrica.herokuapp.com/admin/users', {
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

export const getAdminBoard = (userId) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.admin_token

        axios.get(`https://starthubafrica.herokuapp.com/admin/boards/${userId}`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setBoards(res.data.boards))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAdminLists = (userId, boardId) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.admin_token

        axios.get(`https://starthubafrica.herokuapp.com/admin/lists/${userId}/${boardId}`, {
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
        const token = getState().auth.admin_token

        axios.get(`https://starthubafrica.herokuapp.com/admin/cards/${userId}/${boardId}`, {
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