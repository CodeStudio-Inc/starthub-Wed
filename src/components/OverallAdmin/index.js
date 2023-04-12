import React from 'react';
import { AdminNavbar } from '../Paths';
import { useSelector } from 'react-redux';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import SavingsIcon from '@mui/icons-material/Savings';
import Card from './Card';
import { Table } from 'antd';
import moment from 'moment';

import './Styles.css';
const OverallAdmin = () => {
	const { users } = useSelector((state) => state.admin);

	const tableRef = React.useRef(null);

	const filterUsers = users.filter((el) => el.category === 'catalyzer');
	const revenueTotal = users.filter((el) => el.category === 'catalyzer' && typeof el.totalRevenue !== 'undefined');

	const totalRevenue = Array.from(revenueTotal, ({ totalRevenue }) => totalRevenue).reduce((a, b) => a + b, 0);
	const expenseTotal = Array.from(revenueTotal, ({ totalExpense }) => totalExpense).reduce((a, b) => a + b, 0);
	const totalExpectedRevenuePaid = Array.from(revenueTotal, ({ totalRevSharePaid }) => totalRevSharePaid).reduce(
		(a, b) => a + b,
		0
	);
	const totalExpectedRevenueShare = Array.from(
		revenueTotal,
		({ totalExpectedRevenueShare }) => totalExpectedRevenueShare
	).reduce((a, b) => a + b, 0);

	const columns = [
		{
			title: 'Startup',
			dataIndex: 'username',
			key: 'username',
			align: 'left',
			fixed: true,
			render: (r) => (
				<div className="table-column-row">
					<div className="table-avatar">
						<h3>{r.substring(0, 1)}</h3>
					</div>
					<h5>{r}</h5>
				</div>
			)
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			align: 'left',
			fixed: true,
			render: (r) => <button>Assign Mentor</button>
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			align: 'left'
		},
		{
			title: 'Contract Date',
			dataIndex: 'contractDate',
			key: 'contractDate',
			align: 'left'
		},
		{
			title: 'No. Months since last revenue submit',
			dataIndex: 'daysSinceLastSubmit',
			key: 'daysSinceLastSubmit',
			align: 'center',
			render: (r) => <p>{r ? r : null}</p>
		},
		{
			title: 'Last LoggedIn',
			dataIndex: 'lastLoggedIn',
			key: 'lastLoggedIn',
			align: 'left',
			render: (r) => <p>{r ? moment(r).fromNow() : null}</p>
		},
		{
			title: 'Revenue Share %',
			dataIndex: 'percentageRevShare',
			key: 'percentageRevShare',
			align: 'left',
			render: (r) => <p>{r}%</p>
		},
		{
			title: 'Additional Metrics',
			dataIndex: 'additionalMetrics',
			key: 'additionalMetrics',
			align: 'center',
			render: (r) => <p>{r ? r : '-'}</p>
		},
		{
			title: 'RevenueSharePaid',
			dataIndex: 'totalRevSharePaid',
			key: 'totalRevSharePaid',
			align: 'center'
		},
		{
			title: 'ExpectedRevenueShare',
			dataIndex: 'totalExpectedRevenueShare',
			key: 'totalExpectedRevenueShare',
			align: 'center'
		},
		{
			title: 'LoanBalance',
			dataIndex: 'totalLoanBalance',
			key: 'totalLoanBalance',
			align: 'center'
		}
	];

	const cardContent = [
		{
			label: 'Teams worked with',
			amount: filterUsers.length,
			icon: <GroupsIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Total Revenue',
			amount: totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Total Expenses',
			amount: expenseTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Total Revenue Share Payment',
			amount: totalExpectedRevenuePaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Outstanding Revenue Share Payment',
			amount: Math.round(totalExpectedRevenueShare).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		}
	];
	return (
		<div className="Admin-conatainer">
			<AdminNavbar />
			<div className="Admin-card-row">
				{cardContent.map((r) => <Card label={r.label} amount={r.amount} icon={r.icon} />)}
			</div>
			<div className="Admin-table-column">
				<div className="Admin-table-header">
					<h4>Startups</h4>
				</div>
				<Table
					ref={tableRef}
					columns={columns}
					dataSource={[
						...filterUsers.map((r) => ({
							...r,
							key: r._id,
							username: r.username,
							dateCreated: moment(r.dateCreated).format('LL'),
							totalExpectedRevenueShare: Math.round(r.totalExpectedRevenueShare)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}))
					]}
					style={{ width: '100%' }}
					bordered={true}
					scroll={{
						x: 2000
					}}
					pagination={{
						defaultPageSize: 5,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
				/>
			</div>
		</div>
	);
};

export default OverallAdmin;
