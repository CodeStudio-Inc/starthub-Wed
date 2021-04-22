import * as actions from '../Actions'
import { updateObject } from './utility'

const initialState = {
    data: [],
    milestones: [],
    lists: [],
    cards: [],
    blogs: [],
    loading: false
}

const requests = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOADING_ACTION:
            return updateObject(state, {
                loading: true
            })

        case actions.SET_AIRTABLE_DATA:
            return updateObject(state, {
                data: action.data
            })

        case actions.SET_MILESTONES:
            return updateObject(state, {
                milestones: action.data
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

        default:
            return state
    }
}

export default requests;