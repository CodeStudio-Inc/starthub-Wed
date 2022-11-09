import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const RevenueAccumulation = () => {
	const { revenue_accumulation, users, loading } = useSelector((state) => state.admin);
	const { userId } = useSelector((state) => state.auth);
	const filtereUsers = users.filter((el) => el.category === 'catalyzer' && el.mentor === userId);

	let users_revenue_accumulation = [];

	filtereUsers.forEach((element) => {
		let user = revenue_accumulation.filter((el) => el.creator === element._id).slice(-1).pop();
		users_revenue_accumulation.push(user);
	});

	const data = users_revenue_accumulation.filter(function(element) {
		return element !== undefined;
	});

	const columns = [
		{
			title: 'Startup Name',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Monthly Total Revenue Generated(UGX)',
			dataIndex: 'revenue',
			key: 'revenue',
			align: 'left'
		},
		{
			title: 'Monthly Total Expenses Generated(UGX)',
			dataIndex: 'expense',
			key: 'expense',
			align: 'left'
		}
	];

	return (
		<div className="revenue-main">
			<Table
				style={{ width: '90%' }}
				columns={columns}
				dataSource={[
					...data.map((r) => ({
						...r,
						key: r._id,
						startup: r.startup,
						revenue: r.month_revenue_total.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
						expense: r.month_expense_total.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					}))
				]}
				pagination={{
					defaultPageSize: 8,
					showSizeChanger: true,
					pageSizeOptions: [ '10', '20', '30' ]
				}}
				loading={loading ? true : false}
			/>
		</div>
	);
};

export default RevenueAccumulation;
