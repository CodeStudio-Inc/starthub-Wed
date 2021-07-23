import * as actions from '../actions'
import axios from 'axios'
import Airtable from 'airtable'

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

export const setNewLists = (data) => {
    return {
        type: actions.SET_NEW_LISTS,
        data: data
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

export const dragWithListAction = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    console.log(droppableIdStart)
    return {
        type: actions.DRAG_WITHIN_LIST,
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId
    }
}

export const dragCardWithInList = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    return dispatch => {
        dispatch(dragWithListAction(
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        ))
        // console.log(droppableIdStart,
        //     droppableIdEnd,
        //     droppableIndexStart,
        //     droppableIndexEnd,
        //     draggableId)
    }
}

export const cardIndexUpdate = (sourceId, destinationId, sourceList, DestList,callback ) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        let lists = [...getState().requests.lists]

        let sourceCards, destinationCards = [];
        
        if(sourceId === destinationId) {
            sourceCards = [...sourceList.cards.map((l ,index) => ({...l, cardIndex: index}))]
        }
        
        if(sourceId !== destinationId){
            sourceCards = [...sourceList.cards.map((l ,index) => ({...l, cardIndex: index}))]
            destinationCards = [...DestList.cards.map((l ,index) => ({...l, cardIndex: index}))]
            console.log(sourceCards ,destinationCards,'lists')
        }

        const token = getState().auth.token

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/list/updateIndexes', {sourceId, destinationId, sourceCards, destinationCards}, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                console.log(res,'fsd')
                callback()
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const createCanvasBoard = (callback) => {
    return (dispatch, getState) => {

        const data = {
            name: 'name'
        }

        const token = getState().auth.token

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/create/canvas', data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const createMilestoneBoard = (callback) => {
    return (dispatch, getState) => {

        const data = {
            name: 'name'
        }

        const token = getState().auth.token

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/create/milestone', data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                callback({ success: true, res: res })
                // console.log(res)
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

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/board', data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

        axios.post(`https://starthubafrica-api.el.r.appspot.com/catalyzer/list/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const createCard = (listId, name, callback) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        const lists = getState().requests.lists
        let cardIndex;

        const list = lists.find(l => l._id === listId);

        if(list.cards.length === 0) cardIndex = 0;
        if(list.cards.length > 0) cardIndex = parseInt(list.cards.length)
        const data = {
           cardIndex, name,listId, description: '', dueDate: ''
        }

        axios.post(`https://starthubafrica-api.el.r.appspot.com/catalyzer/card`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const updateList = (id, name, callback) => {
    return (dispatch, getState) => {
        const token = getState().auth.token

        const data = {
            name
        }
        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/list/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const updateCard = (id, cardIndex, name, callback) => {
    return (dispatch, getState) => {
        const token = getState().auth.token

        const data = {
            name,
            cardIndex
        }
        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/card/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/blog', data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/boards', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const getListsOnBoard = ( callback) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.get(`https://starthubafrica-api.el.r.appspot.com/catalyzer/lists`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setLists(res.data.list))
                dispatch(setCanvasLists(res.data.list))
                dispatch(setMilestoneLists(res.data.list))
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

        axios.get(`https://starthubafrica-api.el.r.appspot.com/catalyzer//board/${id}/cards`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

        axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/blogs', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

        axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/canvas/board', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

        axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/milestone/board', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const deleteCard = (id) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        axios.delete(`https://starthubafrica-api.el.r.appspot.com/catalyzer/card/${id}`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

        axios.delete(`https://starthubafrica-api.el.r.appspot.com/catalyzer/list/${id}`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const getMetricsData = () => {
    return (dispatch, getState) => {

        const baseId = getState().auth.base_key
        const key = process.env.REACT_APP_API_KEY
        var base = new Airtable({apiKey: key}).base(baseId)

        base('Metrics').select({
        maxRecords: 20
        }).eachPage(function page(records, fetchNextPage) {
            dispatch(setMetricsData(records))
            fetchNextPage();

        }, function done(err) {
        if (err) { console.error(err); return }
        })
    }
}

export const archiveCard = (id) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token
        
        const data = {
            archive: true
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/card/archive/${id}`,data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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

export const archiveList = (id) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            archive: true
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/list/archive/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
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





