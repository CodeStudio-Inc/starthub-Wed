import * as actions from '../actions'
import { updateObject } from './utility'

const initialState = {
    users: [],
    boards: [],
    lists: [],
    cards: [],
    loading: false
}

const requests = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOADER_ACTION:
            return updateObject(state, {
                loading: true
            })

        case actions.SET_ADMIN_USER:
            return updateObject(state, {
                loading: false,
                users: action.data
            })

        case actions.SET_ADMIN_BOARDS:
            return updateObject(state, {
                loading: false,
                boards: action.data
            })

        case actions.SET_ADMIN_LISTS:
            return updateObject(state, {
                loading: false,
                lists: action.data
            })

        case actions.SET_ADMIN_CARDS:
            return updateObject(state, {
                loading: false,
                cards: action.data
            })


        default:
            return state
    }
}

export default requests;