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

export const setValue = (value) => {
    return {
        type: actions.SET_VALUE,
        value
    }
}

export const setTeamsValue = (value) => {
    return {
        type: actions.SET_TEAMS_VALUE,
        value
    }
}

export const setVisionValue = (value) => {
    return {
        type: actions.SET_VISION_VALUE,
        value
    }
}

export const setPropositionValue = (value) => {
    return {
        type: actions.SET_PROPOSITION_VALUE,
        value
    }
}

export const setProductValue = (value) => {
    return {
        type: actions.SET_PRODUCT_VALUE,
        value
    }
}

export const setMarketValue = (value) => {
    return {
        type: actions.SET_MARKET_VALUE,
        value
    }
}

export const setBusinessValue = (value) => {
    return {
        type: actions.SET_BUSINESS_VALUE,
        value
    }
}

export const setInvestmentValue = (value) => {
    return {
        type: actions.SET_INVESTMENT_VALUE,
        value
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

export const setStatememnts = (data) => {
    return {
        type: actions.SET_STATEMENTS,
        data
    }
}

export const setObjectives = (data) => {
    return {
        type: actions.SET_OBJECTIVES,
        data
    }
}

export const dragWithListAction = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    // console.log(droppableIdStart)
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

export const cardIndexUpdate = (sourceId, destinationId, sourceList, DestList, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        let lists = [...getState().requests.lists]

        let sourceCards, destinationCards = [];

        if (sourceId === destinationId) {
            sourceCards = [...sourceList.cards.map((l, index) => ({ ...l, cardIndex: index }))]
        }

        if (sourceId !== destinationId) {
            sourceCards = [...sourceList.cards.map((l, index) => ({ ...l, cardIndex: index }))]
            destinationCards = [...DestList.cards.map((l, index) => ({ ...l, cardIndex: index }))]
            // console.log(sourceCards, destinationCards, 'lists')
        }

        const token = getState().auth.token

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/list/updateIndexes', { sourceId, destinationId, sourceCards, destinationCards }, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data, 'fsd')
                dispatch(setLists(res.data.lists))
                callback()
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const createCanvasBoard = (callback) => {
    return (dispatch, getState) => {

        dispatch(loadAction())

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
                dispatch(stopLoader())
                callback({ success: true, res: res })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const createMilestoneBoard = (callback) => {
    return (dispatch, getState) => {

        dispatch(loadAction())

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
                dispatch(stopLoader())
                callback({ success: true, res: res })
                // console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const createAdminBoard = (name, startup, mentor, callback) => {
    return (dispatch, getState) => {

        // dispatch(loadAction())

        const token = getState().auth.token

        const data = {
            name,
            startup,
            mentor
        }

        console.log(data)

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/board', data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                // dispatch(stopLoader())
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const createBoard = (name, startup, boardType, callback) => {
    return (dispatch, getState) => {

        // dispatch(loadAction())

        const token = getState().auth.token

        const data = {
            name,
            startup,
            boardType
        }

        console.log(data)

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/board', data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setBoards(res.data.boards))
                // dispatch(stopLoader())
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const createList = (id, name, callback) => {
    return (dispatch, getState) => {

        dispatch(loadAction())

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
                dispatch(stopLoader())
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const createCanvasLists = (id, callback) => {
    return (dispatch, getState) => {

        dispatch(loadAction())

        const token = getState().auth.token

        const data = {
            name: ''
        }

        axios.post(`https://starthubafrica-api.el.r.appspot.com/catalyzer/create-canvas/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(stopLoader())
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const createAdminCard = (listId, name, callback) => {
    return (dispatch, getState) => {

        dispatch(loadAction())

        const token = getState().auth.token;
        const lists = getState().admin.lists
        let cardIndex;

        const list = lists.find(l => l._id === listId);

        if (list.cards.length === 0) cardIndex = 0;
        if (list.cards.length > 0) cardIndex = parseInt(list.cards.length)
        const data = {
            cardIndex, name, listId, description: '', dueDate: ''
        }

        axios.post(`https://starthubafrica-api.el.r.appspot.com/catalyzer/card`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(stopLoader())
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const createCard = (listId, name, callback) => {
    return (dispatch, getState) => {

        // dispatch(loadAction())

        const token = getState().auth.token;
        const lists = getState().requests.lists
        let cardIndex;

        const list = lists.find(l => l._id === listId);

        if (list.cards.length === 0) cardIndex = 0;
        if (list.cards.length > 0) cardIndex = parseInt(list.cards.length)
        const data = {
            cardIndex, name, listId, description: '', dueDate: ''
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
                // dispatch(stopLoader())
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
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateBoard = (id, name, callback) => {
    return (dispatch, getState) => {

        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            name
        }
        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/board/update/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res.data)
                callback({ success: true, res: res })
                dispatch(setBoards(res.data.boards))
                // dispatch(stopLoader())

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
                dispatch(setLists(res.data.lists))
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
        // dispatch(loadAction())
        const token = getState().auth.token

        axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/boards', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // dispatch(stopLoader())
                dispatch(setBoards(res.data.boards))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getListsOnBoard = (callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
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

export const deleteCard = (listId, cardIndex, callback) => {
    return (dispatch, getState) => {
        dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            cardIndex
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/delete/${listId}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
                dispatch(stopLoader())
                // console.log(res)
                // dispatch(setLists(res.data.list))
                // dispatch(setCanvasLists(res.data.list))
                // dispatch(setMilestoneLists(res.data.list))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const deleteBoard = (id, callback) => {
    return (dispatch, getState) => {
        const token = getState().auth.token

        axios.delete(`https://starthubafrica-api.el.r.appspot.com/catalyzer/board/${id}`, {
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

export const deleteList = (id, callback) => {
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
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getMetricsData = () => {
    return (dispatch, getState) => {

        // dispatch(loadAction())
        const baseId = getState().auth.base_key
        const key = process.env.REACT_APP_API_KEY
        var base = new Airtable({ apiKey: key }).base(baseId)

        base('Metrics').select({
            maxRecords: 100
        }).eachPage(function page(records, fetchNextPage) {
            // console.log(records,'metrics')
            dispatch(setMetricsData(records))
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return }
        })
    }
}

export const archiveList = (id, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            archive: true
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/list/archive/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token,
            }
        })
            .then(res => {
                console.log(res.data.lists,'ll')
                dispatch(setLists(res.data.lists))
                callback({ success: true, res: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const unarchiveList = (id, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            archive: true
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/list/restore-list/${id}`, data, {
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

export const archiveBoard = (id, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            archive: true
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/board/archive/${id}`, data, {
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

export const unarchiveBoard = (id, callback) => {
    return (dispatch, getState) => {
        // dispatch(loadAction())
        const token = getState().auth.token

        const data = {
            archive: true
        }

        axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/board/restore-board/${id}`, data, {
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

export const addValues  = (teams,vision,proposition,product,market,business,investment, callback) => {
    return (dispatch,getState) => {
        dispatch(loadAction())

        const token = getState().auth.token

        const data = {
            teams,
            vision,
            proposition,
            product,
            market,
            business,
            investment
        }

        axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/value', data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            dispatch(stopLoader())
            callback({ success: true, res: res })
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const getValues  = () => {
    return (dispatch,getState) => {

        const token = getState().auth.token


        axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/values', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.scalevalues)
            dispatch(setValue(res.data.scalevalues))
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const addStatement = (id, vision, mission,callback) => {
    return(dispatch, getState) => {

            dispatch(loadAction())

            const token = getState().auth.token

            const data = {
                vision,
                mission
            }

            axios.post(`https://starthubafrica-api.el.r.appspot.com/catalyzer/statement/${id}`,data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.statement)
            dispatch(stopLoader())
            dispatch(setStatememnts(res.data.statements))
            callback({ success: true, res: res })
        })
        .catch(error => {
            console.log(error)
        })

    }
}

export const getStatement = () => {
    return(dispatch, getState) => {

            const token = getState().auth.token

            axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/statements', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            dispatch(setStatememnts(res.data.statements))
            // console.log(res)
        })
        .catch(error => {
            console.log(error)
        })

    }
}

export const editStatement = (id, vision, mission, callback) => {
    return(dispatch, getState) => {

            dispatch(loadAction())

            const token = getState().auth.token

            const data = {
                vision,
                mission
            }

            axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/statement/${id}`,data,{
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            dispatch(setStatememnts(res.data.statements))
            callback({ success: true, res: res })
            dispatch(stopLoader())
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const addObjective = (id, description,callback) => {
    return(dispatch, getState) => {

            dispatch(loadAction())

            const token = getState().auth.token

            const data = {
                description
            }

            axios.post(`https://starthubafrica-api.el.r.appspot.com/catalyzer/objective/${id}`,data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.objs)
            dispatch(setObjectives(res.data.objs))
            callback({ success: true, res: res })
            dispatch(stopLoader())
        })
        .catch(error => {
            console.log(error)
        })

    }
}

export const getObjective = () => {
    return(dispatch, getState) => {

            dispatch(loadAction())

            const token = getState().auth.token

            axios.get('https://starthubafrica-api.el.r.appspot.com/catalyzer/objectives', {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.objs)
            dispatch(stopLoader())
            dispatch(setObjectives(res.data.objs))
        })
        .catch(error => {
            console.log(error)
        })

    }
}

export const editObjective = (id,description, callback) => {
    return(dispatch, getState) => {

        dispatch(loadAction())
        
        const token = getState().auth.token

        const data = {
            description
        }

            axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/objective/${id}`,data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res)
            dispatch(setObjectives(res.data.objs))
            callback({ success: true, res: res })
            dispatch(stopLoader())
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const deleteObjective = (id) => {
    return (dispatch, getState) => {

        dispatch(loadAction())

        const token = getState().auth.token

        axios.delete(`https://starthubafrica-api.el.r.appspot.com/catalyzer/objective/${id}`, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
            .then(res => {
                // console.log(res)
                dispatch(setObjectives(res.data.objs))
                // callback({ success: true, res: res })
                dispatch(stopLoader())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const addkeyResult = (description, measureOfSuccess,objId,callback) => {
    return(dispatch, getState) => {

        dispatch(loadAction())

            const token = getState().auth.token

            const data = {
                description,
                measureOfSuccess,
                objId
            }

            axios.post('https://starthubafrica-api.el.r.appspot.com/catalyzer/keyresult',data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res)
            dispatch(setObjectives(res.data.objs))
            callback({ success: true, res: res })
            dispatch(stopLoader())
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const editkeyResult = (id, description, measureOfSuccess,dateCreated, callback) => {
    return(dispatch, getState) => {

        dispatch(loadAction())
        
        const token = getState().auth.token

        const data = {
            description,
            measureOfSuccess,
            dateCreated
        }

            axios.put(`https://starthubafrica-api.el.r.appspot.com/catalyzer/keyresult/${id}`, data, {
            headers: {
                ContentType: 'Application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res)
            dispatch(setObjectives(res.data.objs))
            callback({ success: true, res: res })
            dispatch(stopLoader())
        })
        .catch(error => {
            console.log(error)
        })
    }
}






