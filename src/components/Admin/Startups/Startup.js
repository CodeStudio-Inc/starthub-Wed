import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BalanceIcon from '@mui/icons-material/Balance';
import SavingsIcon from '@mui/icons-material/Savings';
import { Line } from 'react-chartjs-2';
import { actionCreators } from '../../Paths';
import moment from 'moment';
import 'react-circular-progressbar/dist/styles.css';
import { Helmet } from 'react-helmet';

import Diagnostics from './Diagnostics';
import Navbar from './modals/Navbar';
import './StartupStyles.css';
const Startup = ({ location, history }) => {
	const [ startMonth, setStartMonth ] = React.useState(0);

	const { revenue, loading, values } = useSelector((state) => state.admin);
	const { boards } = useSelector((state) => state.requests);

	const data = location.state.data;
	const startup_revenue = revenue.filter((e) => e.creator === data._id);
	const board_id = boards && boards.at(-1)._id;
	const diagnostics = values && values.at(-1);

	const dispatch = useDispatch();

	const getRevenue = () => dispatch(actionCreators.getRevenue());
	const getBoards = () => dispatch(actionCreators.getAdminBoard(data._id));
	const getValues = () => dispatch(actionCreators.getAdminValues(data._id));

	const current_yr = new Date().getFullYear();
	const previous_yr = new Date().getFullYear() - 1;

	let current_month, current_yr_revenue, previous_yr_revenue, six_months_revenue;

	current_month = new Date().getMonth() + 1;

	current_yr_revenue =
		startup_revenue && startup_revenue.filter((e) => moment(e.date).format('YYYY') === current_yr.toString());
	previous_yr_revenue =
		startup_revenue && startup_revenue.filter((e) => moment(e.date).format('YYYY') === previous_yr.toString());

	const checkMonth = (month) => {
		let result = month - 6;
		if (result < 0) {
			result = 12 - Math.abs(result);
		}
		setStartMonth(result);
	};

	React.useEffect(() => {
		checkMonth(current_month);
		getRevenue();
		getValues();
		getBoards();
	}, []);

	previous_yr_revenue &&
		previous_yr_revenue.forEach((e) => {
			if (moment(new Date()).format('MM') >= '07') return;
			if (moment(new Date()).format('MM') === '01') {
				if (moment(e.date).format('MM') >= '07') current_yr_revenue.push(e);
			}
			if (moment(new Date()).format('MM') === '02') {
				if (moment(e.date).format('MM') >= '08') current_yr_revenue.push(e);
			}
			if (moment(new Date()).format('MM') >= '03') {
				if (moment(e.date).format('MM') >= '09') current_yr_revenue.push(e);
			}
			if (moment(new Date()).format('MM') === '04') {
				if (moment(e.date).format('MM') >= '10') current_yr_revenue.push(e);
			}
			if (moment(new Date()).format('MM') === '05') {
				if (moment(e.date).format('MM') >= '11') current_yr_revenue.push(e);
			}
			if (moment(new Date()).format('MM') === '06') {
				if (moment(e.date).format('MM') >= '12') current_yr_revenue.push(e);
			}
		});

	const zero = '0';
	const txt1 = startMonth.toString().length === 1 ? zero.concat(startMonth.toString()) : startMonth.toString();
	const txt2 =
		current_month.toString().length === 1 ? zero.concat(current_month.toString()) : current_month.toString();

	six_months_revenue =
		current_yr_revenue &&
		current_yr_revenue.filter((e) => moment(e.date).format('MM') >= txt1 || moment(e.date).format('MM') <= txt2);

	let new_revenue = [];

	six_months_revenue &&
		six_months_revenue.forEach((e) => {
			if (moment(e.date).format('MM') === '01' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 1, month: `Jan${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '02' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 2, month: `Feb${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '03' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 3, month: `Mar${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '04' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 4, month: `Apr${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '05' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 5, month: `May${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '06' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 6, month: `Jun${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '07' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 7, month: `Jul${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '08' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 8, month: `Aug${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '09' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 9, month: `Sep${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '10' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 10, month: `Oct${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '11' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 11, month: `Nov${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '12' && moment(e.date).format('YYYY') === previous_yr.toString())
				new_revenue.push({ ...e, index: 12, month: `Dec${previous_yr.toString()}` });
			if (moment(e.date).format('MM') === '01' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 13, month: `Jan${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '02' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 14, month: `Feb${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '03' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 15, month: `Mar${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '04' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 16, month: `Apr${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '05' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 17, month: `May${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '06' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 18, month: `Jun${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '07' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 19, month: `Jul${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '08' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 20, month: `Aug${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '09' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 21, month: `Sep${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '10' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 22, month: `Oct${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '11' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 23, month: `Nov${current_yr.toString()}` });
			if (moment(e.date).format('MM') === '12' && moment(e.date).format('YYYY') === current_yr.toString())
				new_revenue.push({ ...e, index: 24, month: `Dec${current_yr.toString()}` });
		});

	new_revenue.sort((a, b) => a.index - b.index);
	const rev = new_revenue.map((el) => el.month_revenue);
	const expense = new_revenue.map((el) => el.month_expense);
	const months = Array.from(new_revenue, ({ month }) => month);
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
			label: 'Loan Balance',
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

	return (
		<div className="startup-container" id="container">
			<Helmet>
				<title>{data.username}</title>
			</Helmet>
			<Navbar data={data} history={history} />
			<Cards />
			<div className="graph-tab">
				<h2>last Six Months Revenue Reporting</h2>
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
