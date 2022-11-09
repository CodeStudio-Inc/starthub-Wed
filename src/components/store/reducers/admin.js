import * as actions from '../Actions';
import { updateObject } from './utility';

const initialState = {
	users: [],
	boards: [],
	lists: [],
	statements: [],
	objectives: [],
	all_objectives: [],
	values: [],
	cards: [],
	loans: [],
	rb_loans: [],
	revShares: [],
	revenue: [],
	revenue_tracking: [],
	revenue_accumulation: [],
	authors: [],
	metrics: [],
	loading: false,
	loader: false
};

const requests = (state = initialState, action) => {
	switch (action.type) {
		case actions.LOADER_ACTION:
			return updateObject(state, {
				loading: true,
				loader: true
			});

		case actions.STOP_LOADER:
			return updateObject(state, {
				loading: false,
				loader: false
			});

		case actions.SET_ADMIN_USER:
			return updateObject(state, {
				users: action.data
			});

		case actions.SET_ADMIN_BOARDS:
			return updateObject(state, {
				boards: action.data
			});

		case actions.SET_ADMIN_LISTS:
			return updateObject(state, {
				lists: action.data
			});

		case actions.SET_ADMIN_STATEMENTS:
			return updateObject(state, {
				statements: action.data
			});

		case actions.SET_ADMIN_OBJECTIVES:
			return updateObject(state, {
				objectives: action.data
			});

		case actions.SET_ALL_OBJECTIVES:
			return updateObject(state, {
				all_objectives: action.data
			});

		case actions.SET_ADMIN_VALUES:
			return updateObject(state, {
				values: action.data
			});

		case actions.SET_ADMIN_CARDS:
			return updateObject(state, {
				cards: action.data
			});

		case actions.SET_LOANS:
			return updateObject(state, {
				loader: false,
				loans: action.data
			});

		case actions.SET_RB_LOANS:
			return updateObject(state, {
				loader: false,
				rb_loans: action.data
			});

		case actions.SET_REVSHARE:
			return updateObject(state, {
				loader: false,
				revShares: action.data
			});

		case actions.SET_AUTHOR:
			return updateObject(state, {
				loader: false,
				authors: action.data
			});

		case actions.SET_REVENUE:
			return updateObject(state, {
				loader: false,
				revenue: action.data
			});

		case actions.SET_REVENUE_TRACKING:
			return updateObject(state, {
				loader: false,
				revenue_tracking: action.data
			});

		case actions.SET_REVENUE_ACCUMULATION:
			return updateObject(state, {
				loader: false,
				revenue_accumulation: action.data
			});

		case actions.SET_ADMIN_METRICS_DATA:
			return updateObject(state, {
				metrics: action.data
			});

		default:
			return state;
	}
};

export default requests;
