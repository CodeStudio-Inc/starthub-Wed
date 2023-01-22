import * as actions from '../actions';
import { updateObject } from './utility';

const initialState = {
	userId: '',
	username: '',
	email: '',
	token: '',
	mentor: '',
	category: '',
	tokenExpiration: '',
	totalExpectedRevenueShare: 0,
	totalRevSharePaid: 0,
	totalRevenue: 0,
	totalExpense: 0,
	daysSinceLastSubmit: '',
	user_activity: [],
	admin: null,
	loading: false,
	authenticated: false,
	error: ''
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case actions.LOADER_ACTION:
			return updateObject(state, {
				loading: true
			});

		case actions.STOP_LOADER:
			return updateObject(state, {
				loading: false
			});

		case actions.SET_USER:
			return updateObject(state, {
				loading: false,
				admin: action.admin,
				userId: action.userId,
				username: action.username,
				email: action.email,
				category: action.category,
				token: action.token,
				mentor: action.mentor,
				tokenExpiration: action.tokenExpiration,
				totalExpectedRevenueShare: action.totalExpectedRevenueShare,
				totalRevSharePaid: action.totalRevSharePaid,
				totalRevenue: action.totalRevenue,
				totalExpense: action.totalExpense,
				daysSinceLastSubmit: action.daysSinceLastSubmit,
				authenticated: true
			});

		case actions.SET_USER_ACTIVITY:
			return updateObject(state, {
				loading: false,
				user_activity: action.data
			});

		case actions.REMOVE_USER:
			return updateObject(state, {
				userId: '',
				email: '',
				token: '',
				authenticated: false,
				loading: false
			});

		default:
			return state;
	}
};

export default auth;
