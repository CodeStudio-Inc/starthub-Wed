import * as actions from '../actions';
import axios from 'axios';

export const loaderAction = () => {
	return {
		type: actions.LOADER_ACTION
	};
};

export const stopLoader = () => {
	return {
		type: actions.STOP_LOADER
	};
};

export const setUser = (
	admin,
	userId,
	username,
	email,
	category,
	token,
	mentor,
	tokenExpiration,
	totalExpectedRevenueShare,
	totalRevSharePaid,
	totalRevenue,
	totalExpense,
	daysSinceLastSubmit,
	loanEligibility,
	loanEligibilityMsg,
	loanApplicationDate,
	eligibilityCheck
) => {
	return {
		type: actions.SET_USER,
		admin,
		userId,
		username,
		email,
		category,
		token,
		mentor,
		tokenExpiration,
		totalExpectedRevenueShare,
		totalRevSharePaid,
		totalRevenue,
		totalExpense,
		daysSinceLastSubmit,
		loanEligibility,
		loanEligibilityMsg,
		loanApplicationDate,
		eligibilityCheck
	};
};

export const removeUser = () => {
	return {
		type: actions.REMOVE_USER
	};
};

export const login = (email, password, callback) => {
	return (dispatch) => {
		dispatch(loaderAction());

		const data = {
			email,
			password
		};

		axios
			.post(`auth/signin`, data)
			.then((res) => {
				dispatch(stopLoader());
				// console.log(res.data);
				dispatch(
					setUser(
						res.data.admin,
						res.data.userId,
						res.data.username,
						res.data.email,
						res.data.category,
						res.data.token,
						res.data.mentor,
						res.data.tokenExpiration,
						res.data.totalExpectedRevenueShare,
						res.data.totalRevSharePaid,
						res.data.totalRevenue,
						res.data.totalExpense,
						res.data.daysSinceLastSubmit,
						res.data.loanEligibility,
						res.data.loanEligibilityMsg,
						res.data.loanApplicationDate,
						res.data.eligibilityCheck
					)
				);
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
				callback({ success: false, error: error });
			});
	};
};

export const getUser = (userId) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		axios
			.get(`auth/user/${userId}`)
			.then((res) => {
				// console.log(res.data);
				dispatch(
					setUser(
						res.data.admin,
						res.data.userId,
						res.data.username,
						res.data.email,
						res.data.category,
						token,
						res.data.mentor,
						res.data.tokenExpiration,
						res.data.totalExpectedRevenueShare,
						res.data.totalRevSharePaid,
						res.data.totalRevenue,
						res.data.totalExpense,
						res.data.daysSinceLastSubmit,
						res.data.loanEligibility,
						res.data.loanEligibilityMsg,
						res.data.loanApplicationDate,
						res.data.eligibilityCheck
					)
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const signUp = (
	username,
	email,
	category,
	mentor,
	password,
	contractDate,
	additionalMetrics,
	percentageShare,
	callback
) => {
	return (dispatch) => {
		dispatch(loaderAction());

		const data = {
			username,
			email,
			category,
			mentor,
			password,
			contractDate,
			additionalMetrics,
			percentageShare
		};

		axios
			.put(`auth/register`, data)
			.then((res) => {
				dispatch(stopLoader());
				callback({ success: true, res: res.data.message });
			})
			.catch((error) => {
				dispatch(stopLoader());
				callback({ error: true, err: error });
				console.log(error);
			});
	};
};

export const loanEligibilityCheck = () => {
	return (dispatch, getState) => {
		const data = {
			data: ''
		};
		axios
			.post(`auth/loan-eligibility`, data)
			.then((res) => {
				// console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
