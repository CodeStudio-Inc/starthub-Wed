import * as actions from '../actions';
import axios from 'axios';

const BaseUrl = 'https://starthubafrica-api.el.r.appspot.com';

export const loadAction = () => {
	return {
		type: actions.LOADER_ACTION
	};
};

export const stopLoader = () => {
	return {
		type: actions.STOP_LOADER
	};
};

export const setUsers = (data) => {
	return {
		type: actions.SET_ADMIN_USER,
		data
	};
};

export const setBoards = (data) => {
	return {
		type: actions.SET_ADMIN_BOARDS,
		data
	};
};

export const setStatememnts = (data) => {
	return {
		type: actions.SET_ADMIN_STATEMENTS,
		data
	};
};

export const setObjectives = (data) => {
	return {
		type: actions.SET_ADMIN_OBJECTIVES,
		data
	};
};

export const setAllObjectives = (data) => {
	return {
		type: actions.SET_ALL_OBJECTIVES,
		data
	};
};

export const setValues = (data) => {
	return {
		type: actions.SET_ADMIN_VALUES,
		data
	};
};

export const setLists = (data) => {
	return {
		type: actions.SET_ADMIN_LISTS,
		data
	};
};

export const setCards = (data) => {
	return {
		type: actions.SET_ADMIN_CARDS,
		data
	};
};

export const setLoans = (data) => {
	return {
		type: actions.SET_LOANS,
		data
	};
};

export const setRBLoans = (data) => {
	return {
		type: actions.SET_RB_LOANS,
		data
	};
};

export const setRevShare = (data) => {
	return {
		type: actions.SET_REVSHARE,
		data
	};
};

export const setAdminMetricsData = (data) => {
	return {
		type: actions.SET_ADMIN_METRICS_DATA,
		data
	};
};

export const setAuthor = (data) => {
	return {
		type: actions.SET_AUTHOR,
		data
	};
};

export const setRevenue = (data) => {
	return {
		type: actions.SET_REVENUE,
		data
	};
};

export const setRevenueTracking = (data) => {
	return {
		type: actions.SET_REVENUE_TRACKING,
		data
	};
};

export const setRevenueAccumulation = (data) => {
	return {
		type: actions.SET_REVENUE_ACCUMULATION,
		data
	};
};

export const setOutstandingRevsharePayment = (data) => {
	return {
		type: actions.SET_OUTSTANDING_REVSHARE_PAYMENT,
		data
	};
};

export const getUsers = () => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/users`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				dispatch(stopLoader());
				// console.log(res)
				dispatch(setUsers(res.data.users));
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const getAdminBoard = (userId) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/boards/${userId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data.boards,'req')
				dispatch(setBoards(res.data.boards));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getAdminLists = (userId) => {
	return (dispatch, getState) => {
		// console.log(boardId,'board')
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/lists/${userId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data.lists,'ff')
				dispatch(stopLoader());
				dispatch(setLists(res.data.lists));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getAdminStatements = (userId) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/statements/${userId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setStatememnts(res.data.statements));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addAdminObjectives = (userId, boardId, description, quarter, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		const data = {
			boardId,
			description,
			quarter
		};
		axios
			.post(`${BaseUrl}/admin/objective/${userId}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setObjectives(res.data.objs));
				callback({ success: true, res: res });
				dispatch(stopLoader());
			})
			.catch((error) => {
				dispatch(stopLoader());
				callback({ success: false });
				console.log(error);
			});
	};
};

export const editAdminObjective = (id, description, startupId, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			description,
			startupId
		};

		axios
			.put(`${BaseUrl}/admin/objective/${id}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setObjectives(res.data.objs));
				callback({ success: true, res: res });
				dispatch(stopLoader());
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getAdminObjectives = (userId) => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/objectives?userId=${userId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res);
				dispatch(setObjectives(res.data.objs));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getAllObjectives = () => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/objectives`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setAllObjectives(res.data.objs));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const deleteAdminObjective = (id, startupId, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		axios
			.delete(`${BaseUrl}/admin/objective/${id}/${startupId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setObjectives(res.data.objs));
				callback({ success: true, res: res });
				dispatch(stopLoader());
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const archiveAdminObjective = (id, startupId, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const data = {
			archive: '',
			startupId
		};

		const token = getState().auth.token;

		axios
			.put(`${BaseUrl}/admin/archive-obj/${id}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setObjectives(res.data.objs));
				callback({ success: true, res: res });
				dispatch(stopLoader());
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addAdminkeyResult = (userId, description, measureOfSuccess, objId, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			description,
			measureOfSuccess,
			objId
		};

		axios
			.post(`${BaseUrl}/admin/keyresult/${userId}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res);
				dispatch(setObjectives(res.data.objs));
				callback({ success: true, res: res });
				dispatch(stopLoader());
			})
			.catch((error) => {
				callback({ success: false });
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const editAdminkeyResult = (description, measureOfSuccess, dateCreated, objId, startupId, callback) => {
	return (dispatch, getState) => {
		console.log(dateCreated, measureOfSuccess);
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			description,
			measureOfSuccess,
			dateCreated,
			objId,
			startupId
		};

		axios
			.put(`${BaseUrl}/admin/keyresult`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setObjectives(res.data.objs));
				callback({ success: true, res: res });
				dispatch(stopLoader());
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const deleteAdminKeyResult = (objId, krId, startupId, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		axios
			.delete(`${BaseUrl}/admin/keyresult/${objId}/${krId}/${startupId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setObjectives(res.data.objs));
				// callback({ success: true, res: res })
				dispatch(stopLoader());
			})
			.catch((error) => {
				callback({ success: false, res: error });
				console.log(error);
			});
	};
};

export const getAdminValues = (userId) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/values/${userId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res)
				dispatch(setValues(res.data.values));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getAdminCards = (userId, boardId) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/cards/${userId}/${boardId}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				console.log(res);
				dispatch(setCards(res.data.cards));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const archiveAdminBoard = (id, userId, callback) => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		const data = {
			userId: userId
		};

		axios
			.put(`${BaseUrl}/admin/admin-board/archive/${id}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data)
				dispatch(setBoards(res.data.boards));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const unarchiveAdminBoard = (id, userId, callback) => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		const data = {
			userId: userId
		};

		axios
			.put(`${BaseUrl}/admin/admin-board/restore-board/${id}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data)
				dispatch(setBoards(res.data.boards));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const archiveAdminList = (id, userId, boardId, callback) => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		const data = {
			userId: userId,
			boardId: boardId
		};

		axios
			.put(`${BaseUrl}/admin/admin-list/archive/${id}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data.lists)
				dispatch(setLists(res.data.lists));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const unarchiveAdminList = (id, userId, boardId, callback) => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		const data = {
			userId: userId,
			boardId: boardId
		};

		axios
			.put(`${BaseUrl}/admin/admin-list/restore-list/${id}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data)
				dispatch(setLists(res.data.lists));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addFlate = (
	amount,
	date,
	duration,
	startup,
	comment,
	interest,
	interestRate,
	grace_period,
	expected_payment,
	loanType
) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			amount,
			date,
			duration,
			startup,
			comment,
			interest,
			interestRate,
			grace_period,
			expected_payment,
			loanType
		};

		axios
			.post(`${BaseUrl}/admin/flatrate`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res);
				dispatch(stopLoader());
				dispatch(setLoans(res.data.loans));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addFlateratePayment = (loanId, amount, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			amount
		};

		axios
			.post(`${BaseUrl}/admin/fr-payment/${loanId}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res);
				dispatch(stopLoader());
				dispatch(setLoans(res.data.loans));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getFlate = () => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/flatrate`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'loans data')
				// dispatch(stopLoader())
				dispatch(setLoans(res.data.loans));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const searchFlatrate = (startup, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/shorterm-loan?startup=${startup}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data, 'loans data');
				dispatch(stopLoader());
				dispatch(setLoans(res.data.loans));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addReducingBalance = (amount, date, duration, startup, comment, interestRate, grace_period, loanType) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			amount,
			loan_date: date,
			duration,
			startup,
			comment,
			interestRate,
			grace_period,
			loanType
		};

		axios
			.post(`${BaseUrl}/admin/reducing-balance`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data);
				dispatch(stopLoader());
				dispatch(setRBLoans(res.data.loans));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addRBPayment = (loanId, installAmount, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			installAmount
		};

		axios
			.post(`${BaseUrl}/admin/rb-payment/${loanId}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res);
				dispatch(stopLoader());
				dispatch(setRBLoans(res.data.loans));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const searchReducingBalance = (startup, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/longterm-loan?startup=${startup}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'loans data')
				dispatch(stopLoader());
				dispatch(setRBLoans(res.data.loans));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getReducingBalance = () => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/reducing-balance`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'loans data')
				// dispatch(stopLoader())
				dispatch(setRBLoans(res.data.loans));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addRevenueShare = (
	pay_for,
	month_of,
	amount,
	startup,
	mode_of_pay,
	transaction_code,
	proof_of_pay,
	callback
) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			amount,
			month_of,
			startup,
			pay_for,
			mode_of_pay,
			transaction_code,
			proof_of_pay
		};

		axios
			.post(`${BaseUrl}/admin/revenue-share`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res.data.revShares);
				callback({ success: true });
				dispatch(stopLoader());
				dispatch(setRevShare(res.data.revShares));
			})
			.catch((error) => {
				console.log(error);
				callback({ success: true, error: error });
			});
	};
};

export const getRevenueShares = () => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/revenue-shares`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'revShare')
				// dispatch(stopLoader())
				dispatch(setRevShare(res.data.revShares));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const approvePayment = (id, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			approve: ''
		};

		axios
			.put(`${BaseUrl}/admin/approve/${id}`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				dispatch(stopLoader());
				dispatch(setRevShare(res.data.revs));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const searchRevShare = (startup) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/revenue-share?startup=${startup}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'revShare')
				dispatch(stopLoader());
				dispatch(setRevShare(res.data.loans));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addAuthor = (name, imageLink, bio, callback) => {
	return (dispatch, getState) => {
		// dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			name,
			imageLink,
			bio
		};

		axios
			.post(`${BaseUrl}/admin/author`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// dispatch(stopLoader());
				dispatch(setAuthor(res.data.authors));
				callback({ success: true, res: res });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getAuthors = () => {
	return (dispatch, getState) => {
		// dispatch(loadAction())
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/authors`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'revShare')
				// dispatch(stopLoader())
				dispatch(setAuthor(res.data.authors));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addRevenue = (startup, month_revenue, month_expense, date, month, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const token = getState().auth.token;

		const data = {
			startup,
			month_revenue,
			month_expense,
			date,
			month
		};

		axios
			.post(`${BaseUrl}/admin/revenue`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				dispatch(stopLoader());
				dispatch(setRevenue(res.data.revenue));
				console.log(res);
				callback({ success: true, message: res.data.message });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getRevenue = () => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/revenues`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'revShare')
				dispatch(stopLoader());
				dispatch(setRevenue(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getStartupRevenue = () => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/revenue`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'revShare')
				dispatch(stopLoader());
				dispatch(setRevenue(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getStartupRevenueTracking = (creator, year, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const data = {
			creator,
			year
		};
		const token = getState().auth.token;

		axios
			.post(`${BaseUrl}/admin/startup-revenue`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res, 'revShare');
				callback({ success: true, res: res });
				dispatch(stopLoader());
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const searchRevenueTracking = (year) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/rev-tracking/search?year=${year}`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res,'revShare')
				dispatch(stopLoader());
				dispatch(setRevenueTracking(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getRevenueTracking = () => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/rev-tracking`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res, 'revShare');
				dispatch(stopLoader());
				dispatch(setRevenueTracking(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getRevenueAccumulation = () => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		axios
			.get(`${BaseUrl}/admin/rev-accumulation`, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log(res, 'revShare');
				dispatch(stopLoader());
				dispatch(setRevenueAccumulation(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const sendEmail = (email, startup, months, callback) => {
	return (dispatch) => {
		const data = {
			email,
			startup,
			months
		};

		axios
			.post(`${BaseUrl}/previous-month-email`, data, {
				contentType: 'application/json'
			})
			.then((res) => {
				console.log(res.data);
				callback({ success: true, res: res.data.message });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addPayment = (startup, amount, month, date) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		const token = getState().auth.token;

		const data = {
			startup,
			amount,
			month,
			date
		};

		axios
			.post(`${BaseUrl}/admin/revShare-payment`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				dispatch(stopLoader());
				// console.log(res);
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const getOutstandingRevenueSharePayment = (startup) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;

		const data = {
			startup: startup
		};

		axios
			.post(`${BaseUrl}/admin/pending-payments`, data, {
				headers: {
					ContentType: 'Application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: token
				}
			})
			.then((res) => {
				dispatch(setOutstandingRevsharePayment(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const updateStartup = (userId, username, email, contractDate, additionalMetrics) => {
	return (dispatch) => {
		dispatch(loadAction());

		const data = {
			username,
			email,
			contractDate,
			additionalMetrics
		};

		axios
			.put(`${BaseUrl}/auth/update-user/${userId}`, data, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch(stopLoader());
				dispatch(setUsers(res.data.users));
				// console.log(res);
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};
