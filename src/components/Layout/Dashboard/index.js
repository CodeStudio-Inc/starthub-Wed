import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalUI from '../../ModalUI';
import { Table } from 'antd';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import * as actionCreators from '../../store/actionCreators';
import ReactGA from 'react-ga';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './Dashboard.css';
const Dashboard = (props) => {
	const [ open, setOpen ] = useState(false);
	const [ show, setShow ] = useState(false);
	const [ startMonth, setStartMonth ] = useState(0);

	const { expire, category } = useSelector((state) => state.auth);
	const { revenue } = useSelector((state) => state.admin);

	const current_date = Date.now();
	const current_yr = new Date().getFullYear();
	const previous_yr = new Date().getFullYear() - 1;

	let current_month, current_yr_revenue, previous_yr_revenue, six_months_revenue;

	current_month = new Date().getMonth() + 1;

	current_yr_revenue = revenue && revenue.filter((e) => moment(e.date).format('YYYY') === current_yr.toString());
	previous_yr_revenue = revenue && revenue.filter((e) => moment(e.date).format('YYYY') === previous_yr.toString());
	// console.log(Array.from(revenue, ({ month_revenue }) => month_revenue).reduce((a, b) => a + b, 0));

	const checkMonth = (month) => {
		let result = month - 6;
		if (result < 0) {
			result = 12 - Math.abs(result);
		}
		setStartMonth(result);
	};

	useEffect(() => {
		checkMonth(current_month);
		if (current_date >= expire) {
			return setOpen(true);
		}
		getRevenue();
		ReactGA.pageview(window.location.pathname);
	}, []);
	const handleLogoutClick = () => {
		dispatch(actionCreators.removeUser());
		props.history.push('/');
	};

	const dispatch = useDispatch();

	const getRevenue = () => dispatch(actionCreators.getStartupRevenue());

	const percentage = 66;

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
		current_yr_revenue.filter((e) => moment(e.date).format('MM') >= txt1 && moment(e.date).format('MM') <= txt2);

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
				backgroundColor: '#dfa126',
				borderColor: '#222323',
				borderWidth: 1,
				data: rev
			}
		]
	};

	const Expense = {
		labels: months,
		datasets: [
			{
				label: 'Monthly Expenses (UGX)',
				backgroundColor: '#dfa126',
				borderColor: '#222323',
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
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		}
	];

	return (
		<div className="dash-container">
			{show ? (
				<ModalUI>
					<div className="edit-card">
						<h5>Session timeout please login again</h5>
						<button className="session-timeout" onClick={handleLogoutClick}>
							Login
						</button>
					</div>
				</ModalUI>
			) : null}
			{category === 'academy' || category === 'internal' ? (
				<div className="dash-menu">
					<h1>You have no Metrics data registered</h1>
				</div>
			) : (
				<div className="dash-menu">
					<div className="revenue-row">
						{/* <div className="graph-row">
							<div className="revenue-visuals">
								<div className="revenue-inner-row">
									<PersonAddAlt1Icon
										className="register-form-container-icon"
										style={{ fontSize: '70px', color: '#dfa126' }}
									/>
									<div className="revenue-inner-column">
										<h1>133</h1>
										<h4>NEW CUSTOMERS</h4>
									</div>
								</div>
								<hr className="revenue-inner-column-separator" />
								<div className="revenue-inner-row">
									<SignalCellularAltIcon
										className="register-form-container-icon"
										style={{ fontSize: '70px', color: '#dfa126' }}
									/>
									<div className="revenue-inner-column">
										<h1>6,405000 SHS</h1>
										<h4>ACCUMMULATED REVENUE</h4>
									</div>
								</div>
								<hr className="revenue-inner-column-separator" />
								<div className="revenue-inner-row">
									<AccountBalanceWalletIcon
										className="register-form-container-icon"
										style={{ fontSize: '70px', color: '#dfa126' }}
									/>
									<div className="revenue-inner-column">
										<h1>4,500,000 SHS</h1>
										<h4>NET PROFIT</h4>
									</div>
								</div>
							</div>
							<hr />
							<div className="revenue-visuals">
								<h3>SALES TARGET</h3>
								<CircularProgressbar
									background={true}
									backgroundPadding={5}
									value={percentage}
									text={`${percentage}%`}
									styles={buildStyles({
										textColor: '#fff',
										trailColor: '#dfa126',
										backgroundColor: '#dfa126'
									})}
								/>
							</div>
						</div> */}
						<div className="graph-row">
							<div className="revenue">
								<h3>Revenue for the last six months</h3>
								<Line data={Revenue} width={100} height={30} />
							</div>

							<div className="revenue">
								<h3>Expense for the last six months</h3>
								<Line data={Expense} width={100} height={30} />
							</div>
						</div>
						<h2>Reported Metrics</h2>
						<Table
							columns={columns}
							dataSource={[
								...revenue.map((r) => ({
									...r,
									key: r.id,
									revenue: r.month_revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
									expense: r.month_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
									date: r.date
								}))
							]}
							style={{ width: '100%' }}
							pagination={{
								defaultPageSize: 5,
								showSizeChanger: true,
								pageSizeOptions: [ '10', '20', '30' ]
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
