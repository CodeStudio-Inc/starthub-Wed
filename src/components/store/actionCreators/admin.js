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

export const setStatememnts = (data) => {
    return {
        type: actions.SET_ADMIN_STATEMENTS,
        data
    }
}

export const setObjectives = (data) => {
    return {
        type: actions.SET_ADMIN_OBJECTIVES,
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

export const setLoans = (data) => {
    return {
        type: actions.SET_LOANS,
        data
    }
}

export const setRevShare = (data) => {
    return {
        type: actions.SET_REVSHARE,
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

export const getAdminBoard = (userId) => {
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
                // console.log(res.data.boards,'req')
                dispatch(setBoards(res.data.boards))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAdminLists = (userId) => {
    return (dispatch, getState) => {
        // console.log(boardId,'board')
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/admin/lists/${userId}`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data.lists,'ff')
                dispatch(stopLoader())
                dispatch(setLists(res.data.lists))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAdminStatements = (userId) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/admin/statements/${userId}`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setStatememnts(res.data.statements))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAdminObjectives = (userId) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/admin/objectives/${userId}`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setObjectives(res.data.objs))
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

export const addLoan = (amount,date,duration,startup,comment,interestRate,grace_period,expected_payment) => {
    return (dispatch, getState) => {
            
         dispatch(loadAction())

            const token = getState().auth.token

            const data = {
                amount,
                date,
                duration,
                startup,
                comment,
                interestRate,
                grace_period,
                expected_payment
            }

            axios.post(`https://starthubafrica-api.el.r.appspot.com/admin/loan`,data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.loans)
            dispatch(stopLoader())
            dispatch(setLoans(res.data.loans))
        })
        .catch(error => {
            console.log(error)
        })

    }
}

export const addLoanPayment = (amount,date,startup,comment,loanId) => {
    return (dispatch, getState) => {
            
         dispatch(loadAction())

            const token = getState().auth.token

            const data = {
                amount,
                date,
                startup,
                comment,
                loanId
            }

            axios.post(`https://starthubafrica-api.el.r.appspot.com/admin/payment`,data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.loans)
            dispatch(stopLoader())
            dispatch(setLoans(res.data.loans))
        })
        .catch(error => {
            console.log(error)
        })

    }
}

export const getLoans = () => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        axios.get('https://starthubafrica-api.el.r.appspot.com/admin/loans', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res,'loans data')
                // dispatch(stopLoader())
                dispatch(setLoans(res.data.loans))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const addRevenueShare = (amount,startup,date,comment) => {
    return (dispatch, getState) => {
            
         dispatch(loadAction())

            const token = getState().auth.token

            const data = {
                amount,
                startup,
                date,
                comment
            }

            axios.post(`https://starthubafrica-api.el.r.appspot.com/admin/revenue-share`,data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.loans)
            dispatch(stopLoader())
            dispatch(setRevShare(res.data.revShares))
        })
        .catch(error => {
            console.log(error)
        })

    }
}

export const getRevenueShares = () => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        axios.get('https://starthubafrica-api.el.r.appspot.com/admin/revenue-shares', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res,'revShare')
                // dispatch(stopLoader())
                dispatch(setRevShare(res.data.revShares))
            })
            .catch(error => {
                console.log(error)
            })
    }
}