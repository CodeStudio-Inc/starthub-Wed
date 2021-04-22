import * as actions from '../Actions'
import axios from 'axios'
import { TRELLO_KEY, TRELLO_TOKEN } from '../Config'

export const setAirtableData = (data) => {
    return {
        type: actions.SET_AIRTABLE_DATA,
        data
    }
}

export const setMilestones = (data) => {
    return {
        type: actions.SET_MILESTONES,
        data
    }
}

export const setLists = (data) => {
    return {
        type: actions.SET_LISTS,
        data
    }
}

export const setCards = (data) => {
    return {
        type: actions.SET_CARDS,
        data
    }
}

export const setBlogs = (data) => {
    return {
        type: actions.SET_BLOGS,
        data
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

        axios.get('https://api.airtable.com/v0/appX6seHGXGpzQbwk/REVENUES?maxRecords=3&view=Grid%20view')
            .then(res => {
                // console.log(res)
                dispatch(setAirtableData(res.data.records))
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

        axios.post('https://starthubafrica-api.herokuapp.com/catalyzer/board', data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        }
        )
            .then(res => {
                // console.log(res)
                callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const createListOnBoard = (id, name, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const data = {
            name
        }

        axios.post(`https://starthubafrica-api.herokuapp.com/catalyzer/list/${id}`, data, {
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

export const createCard = (boardId, listId, name, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const data = {
            name
        }

        axios.post(`https://starthubafrica-api.herokuapp.com/catalyzer/board/${boardId}/list/${listId}`, data, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res)
                callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export const getBoards = (callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get('https://starthubafrica-api.herokuapp.com/catalyzer/boards', {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data.boards)
                dispatch(setMilestones(res.data.boards))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getLists = (id, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.herokuapp.com/catalyzer/board/${id}/lists`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data)
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

export const getCards = (id) => {
    return dispatch => {
        axios.get(`https://api.trello.com/1/lists/${id}/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
            .then(res => {
                console.log(res.data)
                dispatch(setCards(res.data))
                // callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getBoardCards = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.herokuapp.com/catalyzer/board/${id}/cards`, {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data, 'd')
                dispatch(setCards(res.data.cards))
                // callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err)
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

        axios.post('https://starthubafrica-api.herokuapp.com/catalyzer/blog', data, {
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

export const getsBlogs = () => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        axios.get('https://starthubafrica-api.herokuapp.com/catalyzer/blogs', {
            headers: {
                ContentType: 'Application/json',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data)
                dispatch(setBlogs(res.data.blogs))
                // callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
}