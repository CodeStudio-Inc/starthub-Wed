import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreators } from '../../Paths';
import { Table } from 'antd';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

import './MetricsStyles.css';
const Metrics = () => {
	const [ startMonth, setStartMonth ] = React.useState(0);

	const { revenue } = useSelector((state) => state.admin);
	const { category } = useSelector((state) => state.auth);

	const current_yr = new Date().getFullYear();
	const previous_yr = new Date().getFullYear() - 1;

	let current_month, current_yr_revenue, previous_yr_revenue, six_months_revenue;

	current_month = new Date().getMonth() + 1;

	current_yr_revenue = revenue && revenue.filter((e) => moment(e.date).format('YYYY') === current_yr.toString());
	previous_yr_revenue = revenue && revenue.filter((e) => moment(e.date).format('YYYY') === previous_yr.toString());

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
		ReactGA.pageview(window.location.pathname);
	}, []);

	const dispatch = useDispatch();

	const getRevenue = () => dispatch(actionCreators.getStartupRevenue());

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
				backgroundColor: '#37561b',
				borderColor: '#37561b',
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
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		}
	];

	return (
		<div className="metrics-container">
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			{category === 'internal' ? null : (
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
			)}
			{category === 'internal' ? <h2>No revenue reported for this user</h2> : <h2>Reported Metrics</h2>}
			{category === 'internal' ? null : (
				<Table
					columns={columns}
					dataSource={[
						...revenue.map((r) => ({
							...r,
							key: r._id,
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
			)}
		</div>
	);
};

export default withRouter(Metrics);
