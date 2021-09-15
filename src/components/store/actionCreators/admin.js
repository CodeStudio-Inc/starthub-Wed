import * as actions from '../actions'
import axios from 'axios'
import Airtable from 'airtable'

export const loadAction = () => {
    return {
        type: actions.LOADER_ACTION
    }
}

export const stopLoader = () => {
    return {
        type: actions.STOP_LOADER
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

export const setAdminMetricsData = (data) => {
    return {
        type: actions.SET_ADMIN_METRICS_DATA,
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
                'Access-Control-Allow-Origin': '*',
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
                'Access-Control-Allow-Origin': '*',
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

export const getAdminLists = (userId, boardId,callback) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/admin/lists/${userId}/${boardId}`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res,'ff')
                dispatch(stopLoader())
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
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
                'Access-Control-Allow-Origin': '*',
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

export const getAdminMetricsData = (baseId) => {
    return (dispatch) => {

        dispatch(loadAction())
        const key = process.env.REACT_APP_API_KEY
        var base = new Airtable({apiKey: key}).base(baseId)

        base('Metrics').select({
        maxRecords: 20
        }).eachPage(function page(records, fetchNextPage) {
            dispatch(setAdminMetricsData(records))
            fetchNextPage();

        }, function done(err) {
        if (err) { console.error(err); return }
        })
    }
}

export const archiveAdminBoard = (id,userId, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            userId: userId
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/admin/admin-board/archive/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data)
                dispatch(setBoards(res.data.boards))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const unarchiveAdminBoard = (id,userId, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            userId: userId
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/admin/admin-board/restore-board/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data)
                dispatch(setBoards(res.data.boards))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const archiveAdminList = (id,userId,boardId, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            userId: userId,
            boardId: boardId
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/admin/admin-list/archive/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data.lists)
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const unarchiveAdminList = (id,userId,boardId, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            userId: userId,
            boardId: boardId
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/admin/admin-list/restore-list/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data)
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}