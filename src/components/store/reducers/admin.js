import * as actions from '../actions'
import { updateObject } from './utility'

const initialState = {
    users: [],
    boards: [],
    lists: [],
    statements: [],
    objectives: [],
    cards: [],
    metrics:[],
    loading: false
}

const requests = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOADER_ACTION:
            return updateObject(state, {
                loading: true
            })

        case actions.STOP_LOADER:
        return updateObject(state, {
            loading: false
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

        case actions.SET_ADMIN_STATEMENTS:
            return updateObject(state, {
                loading: false,
                statements: action.data
            })

        case actions.SET_ADMIN_OBJECTIVES:
            return updateObject(state, {
                loading: false,
                objectives: action.data
            })

        case actions.SET_ADMIN_CARDS:
            return updateObject(state, {
                loading: false,
                cards: action.data
            })

        case actions.SET_ADMIN_METRICS_DATA:
            return updateObject(state, {
                loading: false,
                metrics: action.data
            })


        default:
            return state
    }
}

export default requests;