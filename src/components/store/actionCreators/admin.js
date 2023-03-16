import * as actions from '../actions';
import axios from 'axios';

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

		axios
			.get(`admin/users`)
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

		axios
			.get(`admin/boards/${userId}`)
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

		axios
			.get(`admin/lists/${userId}`)
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

		axios
			.get(`admin/statements/${userId}`)
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

		const data = {
			boardId,
			description,
			quarter
		};
		axios
			.post(`admin/objective/${userId}`, data)
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

		const data = {
			description,
			startupId
		};

		axios
			.put(`admin/objective/${id}`, data)
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

export const updateQuarterAdmin = (objId, userId) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const data = {
			userId
		};
		axios
			.put(`admin/update-quarter/${objId}`, data)
			.then((res) => {
				dispatch(setObjectives(res.data.objs));
				dispatch(stopLoader());
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const getAdminObjectives = (userId) => {
	return (dispatch, getState) => {
		// dispatch(loadAction())

		axios
			.get(`admin/objectives?userId=${userId}`)
			.then((res) => {
				// console.log(res);
				dispatch(setObjectives(res.data.objs));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const filterAdminObjectives = (year, userId) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		axios
			.get(`admin/filter?year=${year}&userId=${userId}`)
			.then((res) => {
				// console.log(res);
				dispatch(stopLoader());
				dispatch(setObjectives(res.data.objs));
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const getAllObjectives = () => {
	return (dispatch, getState) => {
		// dispatch(loadAction())

		axios
			.get(`admin/objectives`)
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

		axios
			.delete(`admin/objective/${id}/${startupId}`)
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

		axios
			.put(`admin/archive-obj/${id}`, data)
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

export const addAdminkeyResult = (objId, description, measureOfSuccess, userId, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const data = {
			description,
			measureOfSuccess,
			userId
		};

		axios
			.post(`admin/keyresult/${objId}`, data)
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

export const editAdminkeyResult = (objId, description, measureOfSuccess, dateCreated, userId, callback) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		const data = {
			description,
			measureOfSuccess,
			dateCreated,
			userId
		};

		axios
			.put(`admin/keyresult/${objId}`, data)
			.then((res) => {
				// console.log(res.data);
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

		axios
			.delete(`admin/keyresult/${objId}/${krId}/${startupId}`)
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
		axios
			.get(`admin/values/${userId}`)
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

		axios
			.get(`admin/cards/${userId}/${boardId}`)
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

		const data = {
			userId: userId
		};

		axios
			.put(`admin/admin-board/archive/${id}`, data)
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

		const data = {
			userId: userId
		};

		axios
			.put(`admin/admin-board/restore-board/${id}`, data)
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

		const data = {
			userId: userId,
			boardId: boardId
		};

		axios
			.put(`admin/admin-list/archive/${id}`, data)
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

		const data = {
			userId: userId,
			boardId: boardId
		};

		axios
			.put(`admin/admin-list/restore-list/${id}`, data)
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
			.post(`admin/flatrate`, data)
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

		const data = {
			amount
		};

		axios
			.post(`admin/fr-payment/${loanId}`, data)
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

		axios
			.get(`admin/flatrate`)
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

		axios
			.get(`admin/shorterm-loan?startup=${startup}`)
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
			.post(`admin/reducing-balance`, data)
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

		const data = {
			installAmount
		};

		axios
			.post(`admin/rb-payment/${loanId}`, data)
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

		axios
			.get(`admin/longterm-loan?startup=${startup}`)
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

		axios
			.get(`admin/reducing-balance`)
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
			.post(`admin/revenue-share`, data)
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

		axios
			.get(`admin/revenue-shares`)
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

		const data = {
			approve: ''
		};

		axios
			.put(`admin/approve/${id}`, data)
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

		axios
			.get(`admin/revenue-share?startup=${startup}`)
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

		const data = {
			name,
			imageLink,
			bio
		};

		axios
			.post(`admin/author`, data)
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

		axios
			.get(`admin/authors`)
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

		const data = {
			startup,
			month_revenue,
			month_expense,
			date,
			month
		};

		axios
			.post(`admin/revenue`, data)
			.then((res) => {
				dispatch(stopLoader());
				dispatch(setRevenue(res.data.revenue));
				// console.log(res);
				callback({ success: true, message: res.data.message });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getAminRevenue = (userId) => {
	return (dispatch, getState) => {
		axios
			.get(`admin/admin-revenues/${userId}`)
			.then((res) => {
				// console.log(res, 'revShare');
				dispatch(setRevenue(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const filterAminRevenue = (userId, year) => {
	return (dispatch, getState) => {
		console.log(userId, year);
		dispatch(loadAction());

		axios
			.get(`admin/admin-revenue/search?userId=${userId}&year=${year}`)
			.then((res) => {
				// console.log(res, 'revShare');
				dispatch(stopLoader());
				dispatch(setRevenue(res.data.revenue));
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const getStartupRevenue = () => {
	return (dispatch, getState) => {
		axios
			.get(`admin/revenues`)
			.then((res) => {
				// console.log(res, 'revShare');
				dispatch(setRevenue(res.data.revenue));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const filterStartupRevenue = (year) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		axios
			.get(`admin/revenue/search?year=${year}`)
			.then((res) => {
				// console.log(res, 'startup');
				dispatch(stopLoader());
				dispatch(setRevenue(res.data.revenue));
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const searchRevenueTracking = (userId, year) => {
	return (dispatch, getState) => {
		dispatch(loadAction());
		axios
			.get(`admin/rev-filter/search?userId=${userId}&year=${year}`)
			.then((res) => {
				// console.log(res, 'revShare');
				dispatch(stopLoader());
				dispatch(setRevenueTracking(res.data.revenue));
			})
			.catch((error) => {
				dispatch(stopLoader());
				console.log(error);
			});
	};
};

export const getRevenueTracking = (userId) => {
	return (dispatch, getState) => {
		dispatch(loadAction());

		axios
			.get(`admin/rev-tracking/${userId}`)
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

		axios
			.get(`admin/rev-accumulation`)
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
			.post(`previous-month-email`, data)
			.then((res) => {
				// console.log(res.data);
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

		const data = {
			startup,
			amount,
			month,
			date
		};

		axios
			.post(`admin/revShare-payment`, data)
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
		const data = {
			startup: startup
		};

		axios
			.post(`admin/pending-payments`, data)
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
			.put(`auth/update-user/${userId}`, data)
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
