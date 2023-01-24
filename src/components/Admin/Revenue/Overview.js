import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { ModalUI, actionCreators } from '../../Paths';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import moment from 'moment';

const Overview = () => {
	const [ open, setOpen ] = React.useState(false);
	const [ record, setRecord ] = React.useState([]);
	const [ startup, setStartup ] = React.useState('');
	const [ state, setState ] = React.useState({
		year: ''
	});
	const { revenue_tracking, loading, users } = useSelector((state) => state.admin);
	const { userId } = useSelector((state) => state.auth);
	const filtereUsers = users.filter((el) => el.category === 'catalyzer' && el.mentor === userId);

	let users_revenue = [];

	filtereUsers.forEach((element) => {
		let user = revenue_tracking && revenue_tracking.filter((el) => el.creator === element._id).slice(-1).pop();
		users_revenue.push(user);
	});

	const data = users_revenue.filter(function(element) {
		return element !== undefined;
	});

	const dispatch = useDispatch();

	const columnz = [
		{
			title: 'Monthly Revenue(UGX)',
			dataIndex: 'revenue',
			key: 'revenue',
			align: 'left'
		},
		{
			title: 'Monthly Expense(UGX)',
			dataIndex: 'expense',
			key: 'expense',
			align: 'left'
		},
		{
			title: 'Revenue Share Payment(UGX)',
			dataIndex: 'payment',
			key: 'payment',
			align: 'left'
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		}
	];
	const columns = [
		{
			title: 'Startup',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Jan',
			dataIndex: 'jan',
			key: 'jan',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Feb',
			dataIndex: 'feb',
			key: 'feb',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Mar',
			dataIndex: 'mar',
			key: 'mar',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Apr',
			dataIndex: 'apr',
			key: 'apr',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'May',
			dataIndex: 'may',
			key: 'may',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Jun',
			dataIndex: 'jun',
			key: 'jun',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Jul',
			dataIndex: 'jul',
			key: 'jul',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Aug',
			dataIndex: 'aug',
			key: 'aug',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Sep',
			dataIndex: 'sep',
			key: 'sep',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Oct',
			dataIndex: 'oct',
			key: 'oct',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Nov',
			dataIndex: 'nov',
			key: 'nov',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Dec',
			dataIndex: 'dec',
			key: 'dec',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#DB4437', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		}
	];

	const searchRevenue = () => {
		dispatch(actionCreators.searchRevenueTracking(state.year));
	};

	return (
		<div className="revenue-main">
			{open ? (
				<ModalUI>
					<div className="rev-modal-container">
						<div className="rev-modal-header">
							<h2>{startup}</h2>
							<CloseIcon
								className="rev-modal-icon"
								onClick={() => setOpen(false)}
								style={{ fontSize: '20px', color: 'rgba(0,0,0, 0.3)' }}
							/>
						</div>
						<div className="rev-modal-content">
							<Table
								columns={columnz}
								dataSource={[
									...record.map((r) => ({
										...r,
										key: r._id,
										revenue: r.month_revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
										expense: r.month_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
										payment: r.payment
											? r.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											: 'Not submitted',
										date: r.date
									}))
								]}
								style={{ width: '100%' }}
								pagination={{
									defaultPageSize: 8,
									showSizeChanger: true,
									pageSizeOptions: [ '10', '20', '30' ]
								}}
							/>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="revenue-table-header">
				<div className="revenue-table-row">
					<select value={state.year} onChange={(e) => setState({ ...state, year: e.target.value })}>
						<option value="" disabled selected>
							-selec year-
						</option>
						<option value="2020">2020</option>
						<option value="2021">2021</option>
						<option value="2022">2022</option>
						<option value="2023">2023</option>
						<option value="2024">2024</option>
						<option value="2025">2025</option>
					</select>
					<button onClick={searchRevenue}>search</button>
				</div>
				{/* <input
					value={state.year}
					onChange={(e) => setState({ ...state, year: e.target.value })}
					placeholder="search year"
					onKeyUp={(e) => {
						if (e.key === 'Enter' && state.year) {
							dispatch(actionCreators.searchRevenueTracking(state.year));
						}
					}}
				/> */}
				<h2>{state.year ? state.year : moment(new Date()).format('YYYY')} Revenue Reporting</h2>
			</div>
			<Table
				columns={columns}
				dataSource={[
					...data.map((r) => ({
						...r,
						key: r._id
					}))
				]}
				onRow={(record, rowIndex) => {
					return {
						onClick: () => {
							setStartup(record.startup);
							dispatch(
								actionCreators.getStartupRevenueTracking(record.creator, record.year, (res) => {
									if (res.success) {
										setRecord(res.res.data.revenue);
										setOpen(true);
									}
								})
							);
						}
					};
				}}
				style={{ width: '100%' }}
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

export default Overview;
