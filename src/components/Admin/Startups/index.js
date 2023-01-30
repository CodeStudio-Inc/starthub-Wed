import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Table } from 'antd';
import { actionCreators, ModalUI, svg } from '../../Paths';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddCardIcon from '@mui/icons-material/AddCard';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Helmet } from 'react-helmet';
import { DownloadTableExcel } from 'react-export-table-to-excel';

import AddStartup from './modals/AddStartup';
import MakePayment from './modals/MakePayment';
import './StartupStyles.css';
import '../../Pages/Auth/AuthStyles.css';
const Startups = (props) => {
	const [ addStartupModal, setAddStartupModal ] = React.useState(false);
	const [ paymentsModal, setPaymentsModal ] = React.useState(false);

	const { users, outstanding_revenue_payment } = useSelector((state) => state.admin);
	const { userId, user_activity } = useSelector((state) => state.auth);
	const filterUsers = users.filter((el) => el.category === 'catalyzer' && el.mentor === userId);

	const tableRef = React.useRef(null);

	let users_activity = [];

	filterUsers.forEach((element) => {
		let user = user_activity && user_activity.filter((el) => el.username === element.username).slice(-1).pop();
		users_activity.push(user);
	});

	// const totalRevenue = Array.from(filterUsers, ({ totalRevenue }) => totalRevenue).reduce((a, b) => a + b, 0);
	console.log(outstanding_revenue_payment, 'pp');
	const dispatch = useDispatch();

	React.useEffect(() => {
		getStartups();
		getUserActivity();
	}, []);

	const dataFilter = users_activity.filter(function(element) {
		return element !== undefined;
	});

	const columns = [
		{
			title: 'Startup',
			dataIndex: 'username',
			key: 'username',
			align: 'left',
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
			title: 'Last Revenue submit',
			dataIndex: 'daysSinceSubmit',
			key: 'daysSinceSubmit',
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

	const getStartups = () => dispatch(actionCreators.getUsers());
	const getUserActivity = () => dispatch(actionCreators.getUserActivity());

	return (
		<div className="startups-container">
			<Helmet>
				<title>Startups Overview</title>
			</Helmet>
			{addStartupModal ? (
				<ModalUI>
					<AddStartup setOpen={setAddStartupModal} />
				</ModalUI>
			) : null}
			{paymentsModal ? (
				<ModalUI>
					<MakePayment
						startups={filterUsers}
						outstanding={
							typeof outstanding_revenue_payment === 'undefined' ? null : outstanding_revenue_payment
						}
						setOpen={setPaymentsModal}
					/>
				</ModalUI>
			) : null}
			<div className="card-row">
				<div className="card">
					<div className="card-content-row ">
						<div className="card-content-column">
							<h3>Startups</h3>
							<h1>{filterUsers.length} teams</h1>
						</div>
						<div className="card-content-row-avatar">
							<GroupsIcon style={{ fontSize: '30px', color: '#37561b' }} />
						</div>
					</div>
				</div>
				<div className="card">
					<div className="card-content-row ">
						<div className="card-content-column">
							<h3>Total Revenue</h3>
							<h1>0 shs</h1>
						</div>
						<div className="card-content-row-avatar">
							<TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
						</div>
					</div>
				</div>
				<div className="card">
					<div className="card-content-row ">
						<div className="card-content-column">
							<h3>Total Revenue Share Payment</h3>
							<h1>0 shs</h1>
						</div>
						<div className="card-content-row-avatar">
							<TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
						</div>
					</div>
				</div>
				<div className="card">
					<div className="card-content-row ">
						<div className="card-content-column">
							<h3>Outstanding Revenue Share Payment</h3>
							<h1>0 shs</h1>
						</div>
						<div className="card-content-row-avatar">
							<TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
						</div>
					</div>
				</div>
			</div>
			<div className="add-startup-row">
				<div className="add-startup-button" onClick={() => setPaymentsModal(true)}>
					<AddCardIcon style={{ fontSize: '20px', color: '#fff', marginRight: '0.5rem' }} />
					<p>Add Payment</p>
				</div>
				<div className="export-container">
					<DownloadTableExcel
						filename="Catalyzer Startups"
						sheet="Startup Records"
						currentTableRef={tableRef.current}
					>
						<button> Export excel </button>
					</DownloadTableExcel>
				</div>
				<div className="add-startup-button" onClick={() => setAddStartupModal(true)}>
					<ControlPointIcon style={{ fontSize: '20px', color: '#fff', marginRight: '0.5rem' }} />
					<p>Add new Startup</p>
				</div>
			</div>
			<Table
				ref={tableRef}
				columns={columns}
				dataSource={[
					...filterUsers.map((r) => ({
						...r,
						key: r._id,
						username: r.username,
						dateCreated: moment(r.dateCreated).format('LL')
					}))
				]}
				onRow={(record, rowIndex) => {
					return {
						onClick: () => {
							props.history.push(`/startup/${record.username}`, { data: record });
						}
					};
				}}
				style={{ width: '90%' }}
				pagination={{
					defaultPageSize: 9,
					showSizeChanger: true,
					pageSizeOptions: [ '10', '20', '30' ]
				}}
			/>
		</div>
	);
};
export default withRouter(Startups);
