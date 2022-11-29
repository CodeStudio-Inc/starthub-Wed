import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { actionCreators } from '../../Paths';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import './UserActivityStyles.css';
const UserActivity = () => {
	const { users } = useSelector((state) => state.admin);
	const { user_activity, userId } = useSelector((state) => state.auth);

	const filtereUsers = users.filter((el) => el.category === 'catalyzer' && el.mentor === userId);

	let users_activity = [];

	filtereUsers.forEach((element) => {
		let user = user_activity && user_activity.filter((el) => el.username === element.username).slice(-1).pop();
		users_activity.push(user);
	});

	const data = users_activity.filter(function(element) {
		return element !== undefined;
	});

	const dispatch = useDispatch();

	React.useEffect(() => {
		getUserActivity();
	}, []);

	const getUserActivity = () => dispatch(actionCreators.getUserActivity());

	const columns = [
		{
			title: 'Startup',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			align: 'left'
		},
		{
			title: 'Last loggedIn',
			dataIndex: 'loginDate',
			key: 'loginDate',
			align: 'left'
		}
	];

	return (
		<div className="user-activity-container">
			<Helmet>
				<title>User Activity</title>
			</Helmet>
			<Table
				columns={columns}
				dataSource={[
					...data.map((r) => ({
						...r,
						key: r._id,
						startup: r.username,
						email: r.email,
						loginDate: moment(r.date).format('DD.MM.YYYY, h:mm:ss a')
					}))
				]}
				style={{ width: '90%', marginTop: '2rem' }}
				pagination={{
					defaultPageSize: 8,
					showSizeChanger: true,
					pageSizeOptions: [ '10', '20', '30' ]
				}}
			/>
		</div>
	);
};

export default withRouter(UserActivity);
