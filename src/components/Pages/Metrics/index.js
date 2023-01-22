import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreators, ReportRevenue, RevenueTable, ModalUI } from '../../Paths';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import ReactGA, { set } from 'react-ga';
import { Helmet } from 'react-helmet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BalanceIcon from '@mui/icons-material/Balance';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

import './MetricsStyles.css';
const Metrics = () => {
	const [ startMonth, setStartMonth ] = React.useState(0);
	const [ loanMessage, setLoanMessage ] = React.useState('');
	const [ open, setOpen ] = React.useState(false);
	const [ revenueTable, setRevenueTable ] = React.useState(false);
	const { revenue } = useSelector((state) => state.admin);
	const {
		category,
		username,
		totalExpectedRevenueShare,
		totalRevSharePaid,
		totalRevenue,
		totalExpense,
		daysSinceLastSubmit
	} = useSelector((state) => state.auth);

	const currentYear = new Date().getFullYear();
	const previousYear = new Date().getFullYear() - 1;

	let currentMonth, nextLoanDate, currentYearRevenue, previousYearRevenue, sixMonthRevenue;

	currentMonth = new Date().getMonth() + 1;
	nextLoanDate = '01' + '.' + new Date().getMonth() + 3 + '.' + new Date().getFullYear();

	currentYearRevenue = revenue && revenue.filter((e) => moment(e.date).format('YYYY') === currentYear.toString());
	previousYearRevenue = revenue && revenue.filter((e) => moment(e.date).format('YYYY') === previousYear.toString());

	const checkMonth = (month) => {
		let result = month - 6;
		if (result < 0) {
			result = 12 - Math.abs(result);
		}
		setStartMonth(result);
	};

	React.useEffect(() => {
		loanEligibilityCheck(daysSinceLastSubmit);
		checkMonth(currentMonth);
		getRevenue();
		ReactGA.pageview(window.location.pathname);
	}, []);

	const dispatch = useDispatch();

	const getRevenue = () => dispatch(actionCreators.getStartupRevenue());

	previousYearRevenue &&
		previousYearRevenue.forEach((e) => {
			if (moment(new Date()).format('MM') >= '07') return;
			if (moment(new Date()).format('MM') === '01') {
				if (moment(e.date).format('MM') >= '07') currentYearRevenue.push(e);
			}
			if (moment(new Date()).format('MM') === '02') {
				if (moment(e.date).format('MM') >= '08') currentYearRevenue.push(e);
			}
			if (moment(new Date()).format('MM') >= '03') {
				if (moment(e.date).format('MM') >= '09') currentYearRevenue.push(e);
			}
			if (moment(new Date()).format('MM') === '04') {
				if (moment(e.date).format('MM') >= '10') currentYearRevenue.push(e);
			}
			if (moment(new Date()).format('MM') === '05') {
				if (moment(e.date).format('MM') >= '11') currentYearRevenue.push(e);
			}
			if (moment(new Date()).format('MM') === '06') {
				if (moment(e.date).format('MM') >= '12') currentYearRevenue.push(e);
			}
		});

	const zero = '0';
	const txt1 = startMonth.toString().length === 1 ? zero.concat(startMonth.toString()) : startMonth.toString();
	const txt2 = currentMonth.toString().length === 1 ? zero.concat(currentMonth.toString()) : currentMonth.toString();

	const message1 = (
		<h4>
			You did not report your revenues in time and can only apply for a loan after{' '}
			<strong style={{ color: '#dfa126', fontWeight: 'bold' }}>{nextLoanDate}</strong> <br />
			<span onClick={() => setOpen(true)} className="span-link">
				Report Revenue
			</span>
		</h4>
	);
	const message2 = (
		<h4>
			Congs {username} on reporting your revenues in time. You are Eligible to apply for Starhub loans. Cheers!{' '}
			<strong className="notification">Click to apply</strong>
		</h4>
	);

	const message3 = (
		<h4>
			Please remeber to submit your revenue for the previous month Cheers!{' '}
			<strong className="notification">Click to report </strong>
		</h4>
	);

	const loanEligibilityCheck = (date) => {
		const dateFormat =
			typeof daysSinceLastSubmit === 'undefined'
				? '2022/10/18'
				: daysSinceLastSubmit.replace(/-/g, '/').substring(0, 10);
		const d1 = new Date();
		const d2 = new Date(dateFormat);
		const diff = Math.abs(d1 - d2);

		if (diff >= 4647819936) {
			setLoanMessage(message1);
		}

		if (diff <= 2914385082) {
			setLoanMessage(message2);
		}
		// console.log(diff);
	};

	sixMonthRevenue =
		currentYearRevenue &&
		currentYearRevenue.filter((e) => moment(e.date).format('MM') >= txt1 || moment(e.date).format('MM') <= txt2);

	let new_revenue = [];

	sixMonthRevenue &&
		sixMonthRevenue.forEach((e) => {
			if (moment(e.date).format('MM') === '01' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 1, month: `Jan${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '02' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 2, month: `Feb${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '03' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 3, month: `Mar${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '04' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 4, month: `Apr${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '05' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 5, month: `May${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '06' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 6, month: `Jun${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '07' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 7, month: `Jul${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '08' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 8, month: `Aug${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '09' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 9, month: `Sep${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '10' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 10, month: `Oct${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '11' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 11, month: `Nov${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '12' && moment(e.date).format('YYYY') === previousYear.toString())
				new_revenue.push({ ...e, index: 12, month: `Dec${previousYear.toString()}` });
			if (moment(e.date).format('MM') === '01' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 13, month: `Jan${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '02' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 14, month: `Feb${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '03' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 15, month: `Mar${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '04' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 16, month: `Apr${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '05' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 17, month: `May${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '06' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 18, month: `Jun${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '07' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 19, month: `Jul${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '08' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 20, month: `Aug${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '09' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 21, month: `Sep${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '10' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 22, month: `Oct${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '11' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 23, month: `Nov${currentYear.toString()}` });
			if (moment(e.date).format('MM') === '12' && moment(e.date).format('YYYY') === currentYear.toString())
				new_revenue.push({ ...e, index: 24, month: `Dec${currentYear.toString()}` });
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
				backgroundColor: '#dfa126',
				borderColor: '#dfa126',
				borderWidth: 1,
				data: rev
			},
			{
				label: 'Monthly Expenses (UGX)',
				backgroundColor: '#37561b',
				borderColor: '#37561b',
				borderWidth: 1,
				data: expense
			}
		]
	};

	const columns = [
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
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		}
	];

	const card_content = [
		{
			id: 1,
			label: 'Loan Eligibility',
			amount:
				moment(daysSinceLastSubmit).format('MM') === txt2 && typeof daysSinceLastSubmit !== 'undefined'
					? 'YOU ARE ELIGIBLE'
					: 'YOU ARE NOT ELIGIBLE',
			icon: <CreditScoreIcon style={{ fontSize: '30px', color: '#37561b' }} />
		},
		{
			id: 2,
			label: 'Total Revenue',
			amount:
				typeof totalRevenue === 'undefined'
					? null
					: totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
		},
		{
			id: 3,
			label: 'Total Expense',
			amount:
				typeof totalExpense === 'undefined'
					? null
					: totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
		},
		{
			id: 4,
			label: 'Total Revenue Share Payment',
			amount:
				typeof totalRevSharePaid === 'undefined'
					? null
					: totalRevSharePaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <SavingsIcon style={{ fontSize: '30px', color: '#37561b' }} />
		},
		{
			id: 5,
			label: 'Expected Revenue Share Payment',
			amount:
				typeof totalExpectedRevenueShare === 'undefined'
					? null
					: totalExpectedRevenueShare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <BalanceIcon style={{ fontSize: '30px', color: '#37561b' }} />
		},
		{
			id: 6,
			label: 'Loan Balance',
			amount: 0,
			icon: <BalanceIcon style={{ fontSize: '30px', color: '#37561b' }} />
		}
	];

	const Cards = () => (
		<div className="revenue-card-row">
			{card_content.map((c) => (
				<div className="revenue-card" key={c.id}>
					<div className="revenue-card-content-row ">
						<div className="revenue-card-content-column">
							<h3>{c.label}</h3>
							{c.id !== 1 ? null : <h2>{c.amount}</h2>}
							{c.id === 1 ? null : <h1>{c.amount} Shs</h1>}
							{c.id === 1 && typeof daysSinceLastSubmit !== 'undefined' ? <h4>{loanMessage}</h4> : null}
							{c.id === 1 && typeof daysSinceLastSubmit === 'undefined' ? <h4>{loanMessage}</h4> : null}
						</div>
						{c.id === 1 ? null : <div className="revenue-card-content-row-avatar">{c.icon}</div>}
					</div>
				</div>
			))}
			{card_content.length === 5 ? (
				[ ...new Array(3 - card_content.length % 3).fill() ].map((r) => <div className="revenue-card hidden" />)
			) : (
				[ ...new Array(3 - card_content.length % 3).fill() ].map((r) => <div className="revenue-card none" />)
			)}
		</div>
	);

	return (
		<div className="metrics-container">
			{open ? (
				<ModalUI>
					<ReportRevenue setOpen={setOpen} />
				</ModalUI>
			) : null}
			{revenueTable ? (
				<ModalUI>
					<RevenueTable revenue={revenue} columns={columns} setOpen={setRevenueTable} />
				</ModalUI>
			) : null}
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Cards />
			<button onClick={() => setOpen(true)}>Report Revenue</button>
			<p onClick={() => setRevenueTable(true)}>View Reported Revenue</p>
			{category === 'internal' ? null : (
				<div className="graph-row">
					<div className="revenue">
						<h3>Revenue for the last six months</h3>
						<Line data={Revenue} width={100} height={30} />
					</div>
				</div>
			)}
		</div>
	);
};

export default withRouter(Metrics);
