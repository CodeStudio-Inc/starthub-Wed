import * as actions from '../Actions';
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

export const setUser = (admin, userId, username, email, category, token, tokenExpiration) => {
	return {
		type: actions.SET_USER,
		admin,
		userId,
		username,
		email,
		category,
		token,
		tokenExpiration
	};
};

export const setUserActivity = (data) => {
	return {
		type: actions.SET_USER_ACTIVITY,
		data
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
			.post('https://starthubafrica-api.el.r.appspot.com/auth/signin', data, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch(stopLoader());
				dispatch(
					setUser(
						res.data.admin,
						res.data.userId,
						res.data.username,
						res.data.email,
						res.data.category,
						res.data.token,
						res.data.tokenExpiration
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

export const userActivity = (email, username, userId) => {
	return (dispatch) => {
		dispatch(loaderAction());

		const data = {
			email,
			username,
			userId
		};

		axios
			.post('https://starthubafrica-api.el.r.appspot.com/admin/user-activity', data, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch(setUserActivity(res.data.user_activity));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addLatestRevenuePayment = (startup) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;

		const data = {
			date: startup
		};

		axios
			.post('https://starthubafrica-api.el.r.appspot.com/admin/revenue-payment', data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				console.log(res);
				dispatch(setUserActivity(res.data.user_activity));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addLatestRevenueSubmission = (startup) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;

		const data = {
			date: startup
		};

		axios
			.post('https://starthubafrica-api.el.r.appspot.com/admin/revenue-submission', data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				dispatch(setUserActivity(res.data.user_activity));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getUserActivity = () => {
	return (dispatch, getState) => {
		const token = getState().auth.token;

		axios
			.get('https://starthubafrica-api.el.r.appspot.com/admin/user-activities', {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				dispatch(setUserActivity(res.data.user_activity));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const signUp = (username, email, category, mentor, password, callback) => {
	return (dispatch) => {
		dispatch(loaderAction());

		const data = {
			username,
			email,
			category,
			mentor,
			password
		};

		axios
			.put('https://starthubafrica-api.el.r.appspot.com/admin/auth/register', data, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch(stopLoader());
				callback({ success: true });
				console.log(res, 'response');
			})
			.catch((error) => {
				dispatch(stopLoader());
				callback({ error: true });
				console.log(error);
			});
	};
};
