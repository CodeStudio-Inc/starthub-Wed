import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Table } from 'antd';
import { actionCreators, ModalUI, logo, svg } from '../../Paths';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneIcon from '@mui/icons-material/Done';
import { Helmet } from 'react-helmet';

import './StartupStyles.css';
import '../../Pages/Auth/AuthStyles.css';
const Startups = (props) => {
	const [ state, setState ] = React.useState({
		username: 'Afropay',
		email: 'afropay@gmail.com',
		category: 'catalyzer',
		mentor: '621373424a3c50000a6d2de5',
		password: 'pass0123'
	});
	const [ error, setError ] = React.useState(false);
	const [ success, setSuccess ] = React.useState(false);
	const [ open, setOpen ] = React.useState(false);
	const [ emailcheck, setEmailCheck ] = React.useState('');

	const { loading } = useSelector((state) => state.auth);
	const { users } = useSelector((state) => state.admin);
	const { userId, user_activity } = useSelector((state) => state.auth);
	const filtereUsers = users.filter((el) => el.category === 'catalyzer' && el.mentor === userId);

	let users_activity = [];

	filtereUsers.forEach((element) => {
		let user = user_activity && user_activity.filter((el) => el.username === element.username).slice(-1).pop();
		users_activity.push(user);
	});

	const dispatch = useDispatch();

	React.useEffect(() => {
		getStartups();
		getUserActivity();
	}, []);

	const week1End = 7;
	const week2End = 15;
	const week3End = 23;
	const week4End = 31;

	let dates = [];

	const dataFilter = users_activity.filter(function(element) {
		return element !== undefined;
	});

	dataFilter.forEach((element) => {
		dates.push({ day: parseInt(moment(element.date).format('DD')) });
	});

	const Week1 = dates.filter((el) => el.day <= week1End).length;
	const Week2 = dates.filter((el) => el.day > week1End && el.day < week2End).length;
	const Week3 = dates.filter((el) => el.day > week2End && el.day < week3End).length;
	const Week4 = dates.filter((el) => el.day > week3End && el.day < week4End).length;

	let values = [ Week1, Week2, Week3, Week4 ];
	let labels = [ 'Week1', 'week2', 'week3', 'week4' ];
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'User Activity',
				backgroundColor: '#37561b',
				borderColor: '#dfa126',
				borderWidth: 1,
				data: values
			}
		],
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							precision: 0
						}
					}
				]
			}
		}
	};

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
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
			align: 'left'
		},
		{
			title: 'Date Created',
			dataIndex: 'dateCreated',
			key: 'dateCreated',
			align: 'left'
		}
	];

	const getStartups = () => dispatch(actionCreators.getUsers());
	const getUserActivity = () => dispatch(actionCreators.getUserActivity());

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const handleEmailChange = (e) => {
		setState({ ...state, email: e.target.value });
		validateEmail(state.email);
		if (validateEmail(state.email)) setEmailCheck('');
		if (!validateEmail(state.email)) setEmailCheck('Enter valid email');
	};

	const register = () => {
		setError(false);
		setSuccess(false);
		setEmailCheck('');
		if (!validateEmail(state.email) || !state.email) return setEmailCheck('Enter valid email');
		if (!state.username || !state.category || !state.password) return setEmailCheck('All fields are required');
		dispatch(
			actionCreators.signUp(state.username, state.email, state.category, state.mentor, state.password, (res) => {
				if (res.success) setSuccess(true);
				if (res.error) setError(true);
			})
		);
		// setState({
		// 	username: '',
		// 	email: '',
		// 	category: '',
		// 	password: ''
		// });
	};

	return (
		<div className="startups-container">
			<Helmet>
				<title>Startups Overview</title>
			</Helmet>
			{open ? (
				<ModalUI>
					<div className="login-main">
						<div className="login-main-left">
							<div className="login-main-left-backdrop">
								<div className="text-container">
									<h1>StartHub Catalyzer</h1>
									<h2>World-class venture building for innovators in Uganda.</h2>
								</div>
							</div>
						</div>
						<div className="login-main-right">
							<img style={{ height: '90px', width: '70px' }} src={logo} alt="logo" />
							<h1>Register New Startup</h1>
							<div className="login-form">
								<h5>Username</h5>
								<input
									type="text"
									placeholder="Enter startup name"
									value={state.username}
									onChange={(e) => setState({ ...state, username: e.target.value })}
								/>
								{!emailcheck ? <h5>Email</h5> : null}
								{emailcheck ? <p style={{ color: 'red' }}>{emailcheck}</p> : null}
								<input
									type="email"
									placeholder="@email.com"
									value={state.email}
									onChange={handleEmailChange}
								/>
								<h5>Category</h5>
								<select
									value={state.category}
									onChange={(e) => setState({ ...state, category: e.target.value })}
								>
									<option value="" disabled selected>
										-select-
									</option>
									<option value="internal">StartHub</option>
									<option value="academy">Academy</option>
									<option value="catalyzer">Catalyzer</option>
								</select>
								{state.category === 'internal' ? null : <h5>Mentor</h5>}
								{state.category === 'internal' ? null : (
									<select
										value={state.mentor}
										onChange={(e) => setState({ ...state, mentor: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="621373424a3c50000a6d2de5">Bonita</option>
										<option value="60d477d35fbd800004c84f7c">Matthias</option>
										<option value="610d180215fa3323e44593a9">Timmm</option>
									</select>
								)}
								<h5>Password</h5>
								<input
									placeholder="password"
									value={state.password}
									onChange={(e) => setState({ ...state, password: e.target.value })}
								/>
							</div>
							<button onClick={register}>
								{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Register'}
							</button>
							<p
								className="cancel-btn"
								onClick={() => {
									setOpen(false);
									setSuccess(false);
									setError(false);
								}}
							>
								Cancel
							</p>
							{error ? (
								<div className="error-message">
									<WarningAmberIcon
										style={{ color: '#37561b', fontSize: '20px', marginRight: '0.5rem' }}
									/>
									<h4>Error registering startup, Please try again</h4>
								</div>
							) : null}
							{success ? (
								<div className="error-message">
									<DoneIcon style={{ color: '#37561b', fontSize: '20px', marginRight: '0.5rem' }} />
									<h4>Startup Registered Successfully</h4>
								</div>
							) : null}
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="card-row">
				<div className="card">
					<div className="card-content-row ">
						<div className="card-content-column">
							<h3>Startups</h3>
							<h1>{filtereUsers.length} teams</h1>
						</div>
						<div className="card-content-row-avatar">
							<GroupsIcon style={{ fontSize: '30px', color: '#37561b' }} />
						</div>
					</div>
				</div>
				<div className="card">
					<div className="card-content-row ">
						<div className="card-content-column">
							<h3>Total Investment</h3>
							<h1>20M</h1>
						</div>
						<div className="card-content-row-avatar">
							<TrendingUpIcon style={{ fontSize: '30px', color: '#37561b' }} />
						</div>
					</div>
				</div>
				<div className="card">
					<Line data={data} width={100} height={50} />
				</div>
			</div>
			<div className="add-startup-row">
				<div className="add-startup-button" onClick={() => setOpen(true)}>
					<ControlPointIcon style={{ fontSize: '20px', color: '#fff', marginRight: '0.5rem' }} />
					<p>Add new Startup</p>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={[
					...filtereUsers.map((r) => ({
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
					defaultPageSize: 5,
					showSizeChanger: true,
					pageSizeOptions: [ '10', '20', '30' ]
				}}
			/>
		</div>
	);
};
export default withRouter(Startups);
