import * as actions from '../actions'
import { updateObject } from './utility'

const initialState = {
    data: [],
    boards: [],
    lists: [],
    cards: [],
    blogs: [],
    canvas_board_id: '',
    canvas_board_name: '',
    milestone_board_id: '',
    milestone_board_name: '',
    loading: false
}

const requests = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOADER_ACTION:
            return updateObject(state, {
                loading: true
            })

        case actions.SET_AIRTABLE_DATA:
            return updateObject(state, {
                data: action.data
            })

        case actions.SET_BOARDS:
            return updateObject(state, {
                boards: action.data
            })

        case actions.SET_LISTS:
            return updateObject(state, {
                lists: action.data
            })

        case actions.SET_CARDS:
            return updateObject(state, {
                cards: action.data
            })
        case actions.SET_BLOGS:
            return updateObject(state, {
                blogs: action.data
            })
        case actions.SET_CANVAS:
            return updateObject(state, {
                canvas_board_id: action.boardId,
                canvas_board_name: action.boardName
            })
        case actions.SET_MILESTONES:
            return updateObject(state, {
                milestone_board_id: action.boardId,
                milestone_board_name: action.boardName
            })
        case actions.DELETE_CARD:
            return updateObject(state, {
                cards: state.cards.filter(({ _id }) => _id !== action.id)
            })
        case actions.DELETE_LIST:
            return updateObject(state, {
                lists: state.lists.filter(({ _id }) => _id !== action.id)
            })

        default:
            return state
    }
}

export default requests;