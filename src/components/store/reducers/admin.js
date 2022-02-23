import * as actions from '../actions'
import { updateObject } from './utility'

const initialState = {
    users: [],
    boards: [],
    lists: [],
    statements: [],
    objectives: [],
    cards: [],
    loans: [],
    revShares: [],
    metrics:[],
    loading: false,
    loader: false,
}

const requests = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOADER_ACTION:
            return updateObject(state, {
                loading: true,
                loader:true,
            })

        case actions.STOP_LOADER:
        return updateObject(state, {
            loading: false,
            loader:false,
        })

        case actions.SET_ADMIN_USER:
            return updateObject(state, {
                users: action.data
            })

        case actions.SET_ADMIN_BOARDS:
            return updateObject(state, {
                boards: action.data
            })

        case actions.SET_ADMIN_LISTS:
            return updateObject(state, {
                lists: action.data
            })

        case actions.SET_ADMIN_STATEMENTS:
            return updateObject(state, {
                statements: action.data
            })

        case actions.SET_ADMIN_OBJECTIVES:
            return updateObject(state, {
                objectives: action.data
            })

        case actions.SET_ADMIN_CARDS:
            return updateObject(state, {
                cards: action.data
            })

        case actions.SET_LOANS:
            return updateObject(state, {
                loader: false,
                loans: action.data
            })

        case actions.SET_REVSHARE:
            return updateObject(state, {
                loader: false,
                revShares: action.data
            })

        case actions.SET_ADMIN_METRICS_DATA:
            return updateObject(state, {
                metrics: action.data
            })

        default:
            return state
    }
}

export default requests;