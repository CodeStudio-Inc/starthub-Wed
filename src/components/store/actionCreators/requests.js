import * as actions from '../actions'
import axios from 'axios'

export const loadAction = () => {
    return {
        type: actions.LOADER_ACTION
    }
}

export const setBoards = (data) => {
    return {
        type: actions.SET_BOARDS,
        data
    }
}

export const setLists = (data) => {
    return {
        type: actions.SET_LISTS,
        data
    }
}

export const setMilestoneLists = (data) => {
    return {
        type: actions.SET_MILESTONE_LISTS,
        data
    }
}

export const setCanvasLists = (data) => {
    return {
        type: actions.SET_CANVAS_LISTS,
        data
    }
}

export const setCards = (data) => {
    return {
        type: actions.SET_CARDS,
        data
    }
}

export const setMilestoneCards = (data) => {
    return {
        type: actions.SET_MILESTONE_CARDS,
        data
    }
}

export const setCanvasCards = (data) => {
    return {
        type: actions.SET_CANVAS_CARDS,
        data
    }
}

export const setBlogs = (data) => {
    return {
        type: actions.SET_BLOGS,
        data
    }
}

export const setCanvas = (boardId, boardName) => {
    return {
        type: actions.SET_CANVAS,
        boardId,
        boardName
    }
}

export const setMilestone = (boardId, boardName) => {
    return {
        type: actions.SET_MILESTONES,
        boardId,
        boardName
    }
}

export const setAirtableData = (data) => {
    return {
        type: actions.SET_AIRTABLE_DATA,
        data
    }
}

export const setExpenseData = (data) => {
    return {
        type: actions.SET_EXPENSE_DATA,
        data
    }
}

export const setMetricsData = (data) => {
    return {
        type: actions.SET_METRICS_DATA,
        data
    }
}

export const deleteCardAction = (id) => {
    return {
        type: actions.DELETE_CARD,
        id
    }
}

export const deleteListAction = (id) => {
    return {
        type: actions.DELETE_LIST,
        id
    }
}

export const createCanvasBoard = () => {
    return (dispatch, getState) => {

        const data = {
            name: 'name'
        }

        const token = getState().auth.token

        axios.post('https://starthubafrica.herokuapp.com/catalyzer/create/canvas', data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const createMilestoneBoard = () => {
    return (dispatch, getState) => {

        const data = {
            name: 'name'
        }

        const token = getState().auth.token

        axios.post('https://starthubafrica.herokuapp.com/catalyzer/create/milestone', data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const createBoard = (name, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const data = {
            name
        }

        axios.post('https://starthubafrica.herokuapp.com/catalyzer/board', data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const createList = (id, name, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const data = {
            name
        }

        axios.post(`https://starthubafrica.herokuapp.com/catalyzer/list/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const createCard = (boardId, listId, name, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const data = {
            name
        }

        axios.post(`https://starthubafrica.herokuapp.com/catalyzer/board/${boardId}/list/${listId}`, data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res)
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const updateCard = (id, name, callback) => {
    return (dispatch, getState) => {
        const token = getState().auth.token

        const data = {
            name
        }
        axios.put(`https://starthubafrica.herokuapp.com/catalyzer/card/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res)
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const postBlog = (blogTitle, subTitle, quote, description, imageUrl, blogImage, videoUrl, category, conclusion, author, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const data = {
            blogTitle: blogTitle,
            subTitle: subTitle,
            quote: quote,
            description: description,
            imageUrl: imageUrl,
            blogImage: blogImage,
            videoUrl: videoUrl,
            category: category,
            conclusion: conclusion,
            author: author
        }

        axios.post('https://starthubafrica.herokuapp.com/catalyzer/blog', data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err)
            })

    }
}

export const getBoards = () => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get('https://starthubafrica.herokuapp.com/catalyzer/boards', {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {

                dispatch(setBoards(res.data.boards))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getListsOnBoard = (id, callback) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica.herokuapp.com/catalyzer/board/${id}/lists`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)     
                dispatch(setLists(res.data.lists))
                dispatch(setCanvasLists(res.data.lists))
                dispatch(setMilestoneLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getCardsOnBoard = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get(`https://starthubafrica.herokuapp.com/catalyzer//board/${id}/cards`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                dispatch(setCards(res.data.cards))
                dispatch(setCanvasCards(res.data.cards))
                dispatch(setMilestoneCards(res.data.cards))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getBlogs = () => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get('https://starthubafrica.herokuapp.com/catalyzer/blogs', {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                dispatch(setBlogs(res.data.blogs))
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getCanvasBoard = () => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get('https://starthubafrica.herokuapp.com/catalyzer/canvas/board', {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                const board = res.data.boards
                let boardId
                let boardName
                board.forEach(element => {
                    boardId = element._id
                    boardName = element.name
                })
                dispatch(setCanvas(boardId, boardName))
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const getMilestonesBoard = () => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get('https://starthubafrica.herokuapp.com/catalyzer/milestone/board', {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                const board = res.data.boards
                let boardId
                let boardName
                board.forEach(element => {
                    boardId = element._id
                    boardName = element.name
                });
                dispatch(setMilestone(boardId, boardName))
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const getAirTableData = () => {
    return dispatch => {

        const key = 'key8X69XD5EQ4Gsjn'

        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${key}`;
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        axios.get('https://api.airtable.com/v0/appX6seHGXGpzQbwk/REVENUES?maxRecords=13&view=Grid%20view')
            .then(res => {
                // console.log(res)
                dispatch(setAirtableData(res.data.records))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const deleteCard = (id) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.delete(`https://starthubafrica.herokuapp.com/catalyzer/card/${id}`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(deleteCardAction(id))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const deleteList = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.delete(`https://starthubafrica.herokuapp.com/catalyzer/list/${id}`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(deleteListAction(id))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getExpenseData = () => {
    return dispatch => {

        const key = 'key8X69XD5EQ4Gsjn'

        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${key}`;
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        axios.get('https://api.airtable.com/v0/appX6seHGXGpzQbwk/EXPENDITURE?maxRecords=50&view=Grid%20view')
            .then(res => {
                // console.log(res.data.records)
                dispatch(setExpenseData(res.data.records))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getMetricsData = () => {
    return dispatch => {

        const key = 'key8X69XD5EQ4Gsjn'

        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${key}`;
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        axios.get(`https://api.airtable.com/v0/appX6seHGXGpzQbwk/Monthly%20Metrics?maxRecords=6&view=Grid%20view`)
            .then(res => {
                // console.log(res.data.records)
                dispatch(setMetricsData(res.data.records))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

