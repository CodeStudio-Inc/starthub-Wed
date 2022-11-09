import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import { Tabs } from 'antd';
import { Table } from 'antd';
import { Line } from 'react-chartjs-2';
import { actionCreators, AdminLeanCanvas } from '../../Paths';
import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './StartupStyles.css';
const Startup = ({ location, history }) => {
	const { TabPane } = Tabs;
	const [ startMonth, setStartMonth ] = React.useState(0);

	const { revenue, objectives } = useSelector((state) => state.admin);

	const data = location.state.data;
	const startup_revenue = revenue.filter((e) => e.creator === data._id);

	const total_revenue = Array.from(startup_revenue, ({ month_revenue }) => month_revenue).reduce((a, b) => a + b, 0);
	const total_expense = Array.from(startup_revenue, ({ month_expense }) => month_expense).reduce((a, b) => a + b, 0);

	const dispatch = useDispatch();

	const getRevenue = () => dispatch(actionCreators.getRevenue());
	const getObjectives = () => dispatch(actionCreators.getAdminObjectives(data._id));

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
		getObjectives();
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

	const card_content = [
		{
			label: 'Total Revenue',
			amount: total_revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
		},
		{
			label: 'Total Expense',
			amount: total_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
		},
		{
			label: 'Total Revenue Share Payment',
			amount: 0,
			icon: <SavingsIcon style={{ fontSize: '30px', color: '#37561b' }} />
		}
	];

	const Cards = () => (
		<div className="startup-card-row">
			{card_content.map((c) => (
				<div className="card" key={c.label}>
					<div className="card-content-row ">
						<div className="card-content-column">
							<h3>{c.label}</h3>
							<h1>{c.amount} Shs</h1>
						</div>
						<div className="card-content-row-avatar">{c.icon}</div>
					</div>
				</div>
			))}
		</div>
	);

	const percentage = 66;

	const quarter1 = objectives.filter((e) => e.quarter === 1);
	const quarter2 = objectives.filter((e) => e.quarter === 2);
	const quarter3 = objectives.filter((e) => e.quarter === 3);
	const quarter4 = objectives.filter((e) => e.quarter === 4);

	const columns = [
		{
			title: 'Objective',
			dataIndex: 'description',
			key: 'description',
			align: 'left',
			render: (r) => (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						background: '#36561b56',
						padding: '5px',
						borderRadius: '5px'
					}}
				>
					<p style={{ color: '#37561b', margin: '0' }}>{r}</p>
				</div>
			)
		},
		{
			title: 'Keyresults',
			dataIndex: 'keyresults',
			key: 'keyresults',
			align: 'left',
			render: (r) => <div>{r.map((k) => k.description).join('\n')}</div>
		},
		{
			title: 'Percentage Covered',
			dataIndex: 'objPercentage',
			key: 'objPercentage',
			align: 'center',
			render: (r) => (
				<div style={{ height: '40px' }}>
					{/* <p style={{ color: r === 100 ? '#37561b' : '#dfa126' }}>{Math.round(r)}%</p> */}
					<Box sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress variant="determinate" value={r} color="success" />
						<Box
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<p style={{ color: '#dfa126', margin: '0' }}>{`${Math.round(r)}%`}</p>
						</Box>
					</Box>
				</div>
			)
		},
		{
			title: 'Date Created',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'left'
		}
	];

	return (
		<div className="startup-container">
			<div className="profile-row ">
				<div className="icon-row" onClick={() => history.goBack()}>
					<KeyboardBackspaceIcon style={{ fontSize: '20px', color: '#37561b', marginRight: '0.3rem    ' }} />
					<h4>Back</h4>
				</div>
				<div className="profile-lable-row">
					<div className="table-avatar">
						<h3>{data.username.substring(0, 1)}</h3>
					</div>
					<h2>{data.username}</h2>
				</div>
			</div>
			<Cards />
			<div className="graph-row">
				<div className="left-container">
					<div className="graph-tab">
						<h2>Metrics</h2>
						<Tabs
							style={{ width: '100%' }}
							defaultActiveKey="1"
							centered
							tabBarStyle={{ color: '#37561b' }}
						>
							<TabPane tab="Revenue" key="1" className="graph-tab-content">
								<Line data={Revenue} width={100} height={30} />
							</TabPane>
							<TabPane tab="Expense" key="2" className="graph-tab-content">
								<Line data={Expense} width={100} height={30} />
							</TabPane>
						</Tabs>
					</div>
					<div className="table-tab">
						<h2>Objective Keyresults</h2>
						<Tabs
							style={{ width: '100%' }}
							defaultActiveKey="1"
							centered
							tabBarStyle={{ color: '#37561b' }}
						>
							<TabPane tab="Quarter 1" key="1" className="graph-tab-content">
								<Table
									columns={columns}
									dataSource={[
										...quarter1.map((r) => ({
											...r,
											key: r._id,
											createdAt: moment(r.createdAt).format('LL')
										}))
									]}
									style={{ width: '100%' }}
									pagination={{
										defaultPageSize: 5,
										showSizeChanger: true,
										pageSizeOptions: [ '10', '20', '30' ]
									}}
								/>
							</TabPane>
							<TabPane tab="Quarter 2" key="2" className="graph-tab-content">
								<Table
									columns={columns}
									dataSource={[
										...quarter2.map((r) => ({
											...r,
											key: r._id,
											createdAt: moment(r.createdAt).format('LL')
										}))
									]}
									style={{ width: '100%' }}
									pagination={{
										defaultPageSize: 5,
										showSizeChanger: true,
										pageSizeOptions: [ '10', '20', '30' ]
									}}
								/>
							</TabPane>
							<TabPane tab="Quarter 3" key="3" className="graph-tab-content">
								<Table
									columns={columns}
									dataSource={[
										...quarter3.map((r) => ({
											...r,
											key: r._id,
											createdAt: moment(r.createdAt).format('LL')
										}))
									]}
									style={{ width: '100%' }}
									pagination={{
										defaultPageSize: 5,
										showSizeChanger: true,
										pageSizeOptions: [ '10', '20', '30' ]
									}}
								/>
							</TabPane>
							<TabPane tab="Quarter 4" key="4" className="graph-tab-content">
								<Table
									columns={columns}
									dataSource={[
										...quarter4.map((r) => ({
											...r,
											key: r._id,
											createdAt: moment(r.createdAt).format('LL')
										}))
									]}
									style={{ width: '100%' }}
									pagination={{
										defaultPageSize: 5,
										showSizeChanger: true,
										pageSizeOptions: [ '10', '20', '30' ]
									}}
								/>
							</TabPane>
						</Tabs>
					</div>
				</div>
				<div className="right-container">
					<div className="progress">
						<h2>Mentorship Timeline</h2>
						<CircularProgressbar
							background={true}
							backgroundPadding={4}
							value={percentage}
							text={`${percentage} weeks left`}
							styles={buildStyles({
								textColor: '#fff',
								textSize: '10px',
								trailColor: '#37561b',
								backgroundColor: '#37561b'
							})}
						/>
					</div>
					<div className="lean-canvas">
						<AdminLeanCanvas userId={data._id} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Startup;
