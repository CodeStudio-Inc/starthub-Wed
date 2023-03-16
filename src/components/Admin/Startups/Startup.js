import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BalanceIcon from '@mui/icons-material/Balance';
import SavingsIcon from '@mui/icons-material/Savings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import { Line } from 'react-chartjs-2';
import { svg } from '../../Paths';
import { actionCreators, ModalUI } from '../../Paths';
import { Table } from 'antd';
import 'react-circular-progressbar/dist/styles.css';
import { Helmet } from 'react-helmet';

import RevenueTable from '../../Pages/Metrics/modals/RevenueTable';
import Diagnostics from './Diagnostics';
import Navbar from './modals/Navbar';
import './StartupStyles.css';
const Startup = ({ location, history }) => {
	const [ year, setYear ] = React.useState('');
	const [ year2, setYear2 ] = React.useState('');
	const [ revenueTable, setRevenueTable ] = React.useState(false);
	const { revenue, loader, values, revenue_tracking } = useSelector((state) => state.admin);

	const data = location.state.data;
	const diagnostics = values && values.at(-1);

	const dispatch = useDispatch();

	const getRevenue = () => dispatch(actionCreators.getAminRevenue(data._id));
	const getRevenueTracking = () => dispatch(actionCreators.getRevenueTracking(data._id));
	const getValues = () => dispatch(actionCreators.getAdminValues(data._id));

	React.useEffect(() => {
		getRevenue();
		getRevenueTracking();
		getValues();
	}, []);

	const filterRevenueTracking = React.useMemo(
		() => {
			let revTracking = revenue_tracking.filter(function(element) {
				return element !== undefined;
			});
			return revTracking;
		},
		[ revenue_tracking ]
	);

	const rev = revenue.map((el) => el.month_revenue);
	const expense = revenue.map((el) => el.month_expense);
	const pay = revenue.map((el) => el.revSharepayment);
	const months = Array.from(revenue, ({ month }) => month);

	const columns = [
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		},
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
			title: 'Expected Revenue Share Payment(UGX)',
			dataIndex: 'expectedRevsharePayment',
			key: 'expectedRevsharePayment',
			align: 'left'
		}
	];

	const Revenue = {
		labels: months,
		datasets: [
			{
				label: 'Monthly Revenue (UGX)',
				backgroundColor: '#37561b',
				borderColor: '#37561b',
				borderWidth: 1,
				data: rev
			},
			{
				label: 'Monthly Expenses (UGX)',
				backgroundColor: '#dfa126',
				borderColor: '#dfa126',
				borderWidth: 1,
				data: expense
			},
			{
				label: 'Revenue Share Payment (UGX)',
				backgroundColor: '#7e2527',
				borderColor: '#7e2527',
				borderWidth: 1,
				data: pay
			}
		]
	};

	const card_content = [
		{
			label: 'Total Revenue',
			amount:
				typeof data.totalRevenue === 'undefined'
					? 0
					: data.totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Total Expense',
			amount:
				typeof data.totalExpense === 'undefined'
					? 0
					: data.totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Total Revenue Share Payment',
			amount:
				typeof data.totalRevSharePaid === 'undefined'
					? 0
					: data.totalRevSharePaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <SavingsIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Total Expected Revenue Share Payment',
			amount:
				typeof data.totalExpectedRevenueShare === 'undefined'
					? 0
					: data.totalExpectedRevenueShare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <BalanceIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			label: 'Loan Balance(includes interest)',
			amount: 0,
			icon: <BalanceIcon style={{ fontSize: '25px', color: '#37561b' }} />
		}
	];

	const Cards = () => (
		<div className="startup-card-row">
			{card_content.map((c) => (
				<div className="card" key={c.label}>
					<div className="card-content-row-avatar">{c.icon}</div>
					<div className="card-content-column">
						<h1>{c.amount} Shs</h1>
						<h3>{c.label}</h3>
					</div>
				</div>
			))}
		</div>
	);
	const columnz = [
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
					{/* {r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#DB4437', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)} */}
				</span>
			)
		}
	];

	return (
		<div className="startup-container" id="container">
			<Helmet>
				<title>{data.username}</title>
			</Helmet>
			{revenueTable ? (
				<ModalUI>
					<RevenueTable
						revenue={revenue}
						columns={columns}
						setOpen={setRevenueTable}
						svg={svg}
						loader={loader}
						dispatch={dispatch}
						userId={data._id}
						actionCreators={actionCreators}
					/>
				</ModalUI>
			) : null}
			<Navbar data={data} history={history} />
			<Cards />
			<div className="rev-tracking-table">
				<div className="rev-tracking-table-row">
					<h3>Revenue Reporting Tracking</h3>
					<div className="search-box-row">
						<input placeholder="year" value={year2} onChange={(e) => setYear2(e.target.value)} />
						<button
							style={{ color: '#fff', borderRadius: '5px' }}
							onClick={() => dispatch(actionCreators.searchRevenueTracking(data._id, year2))}
						>
							search
						</button>
					</div>
				</div>
				<Table
					style={{ width: '100%', marginBottom: '1rem' }}
					columns={columnz}
					dataSource={[
						...filterRevenueTracking.map((r) => ({
							...r,
							key: r._id
						}))
					]}
					pagination={false}
				/>
			</div>
			<div className="graph-tab">
				<div className="graph-row">
					<button onClick={() => setRevenueTable(true)}>view reported revenue</button>
					<h3>Revenue Reporting Graph</h3>
					<div className="search-box-row">
						<input placeholder="year" value={year} onChange={(e) => setYear(e.target.value)} />
						<button onClick={() => dispatch(actionCreators.filterAminRevenue(data._id, year))}>
							search
						</button>
						{loader ? <img src={svg} style={{ height: '30px', width: '30px' }} /> : null}
					</div>
				</div>
				<Line data={Revenue} width={100} height={30} />
			</div>
			<Diagnostics
				teams={typeof diagnostics === 'undefined' ? 0 : diagnostics.teams}
				vision={typeof diagnostics === 'undefined' ? 0 : diagnostics.vision}
				proposition={typeof diagnostics === 'undefined' ? 0 : diagnostics.proposition}
				product={typeof diagnostics === 'undefined' ? 0 : diagnostics.product}
				market={typeof diagnostics === 'undefined' ? 0 : diagnostics.market}
				business={typeof diagnostics === 'undefined' ? 0 : diagnostics.business}
				investment={typeof diagnostics === 'undefined' ? 0 : diagnostics.investment}
			/>
		</div>
	);
};
export default Startup;
