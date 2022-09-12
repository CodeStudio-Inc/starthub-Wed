import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
const RevenueAccumulation = () => {
	const { revenue_accumulation, loading } = useSelector((state) => state.admin);

	const rev_accumulation = revenue_accumulation && revenue_accumulation;

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
		<div className="rev-content">
			<div className="rev-table-header">
				<h2>Revenue Accumulation</h2>
			</div>
			<Table
				style={{ width: '90%' }}
				columns={columns}
				dataSource={[
					...rev_accumulation.map((r) => ({
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
