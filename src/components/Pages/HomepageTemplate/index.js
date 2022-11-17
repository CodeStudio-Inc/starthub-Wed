import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	OKRs,
	LeanCanvas,
	logo,
	Metrics,
	DiagnosticsTest,
	Calendar,
	actionCreators,
	ModalUI,
	Startups,
	OkrOverview,
	UserActivity,
	Revenues
} from '../../Paths';
import { Tabs, Spin } from 'antd';
import { isInteger } from 'formik';
import axios from 'axios';
import ListAltIcon from '@material-ui/icons/ListAlt';
import BarChartIcon from '@material-ui/icons/BarChart';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import BuildIcon from '@material-ui/icons/Build';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import './HomepageStyles.css';
const { TabPane } = Tabs;
const HomepageTemplate = (props) => {
	const [ index, setIndex ] = useState(0);
	const [ active, setActive ] = React.useState({
		actionObject: null,
		objects: [
			{
				title: 'OKRs',
				icon: <ListAltIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			},
			{
				title: 'Lean Canvas',
				icon: <DeveloperBoardIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			},
			{
				title: 'Metrics',
				icon: <BarChartIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			},
			{
				title: 'Diagnostics',
				icon: <BuildIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			},
			{
				title: 'Schedule',
				icon: <CalendarMonthIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			}
		]
	});
	const [ adminLink, setAdmin ] = React.useState({
		actionObject: null,
		objects: [
			{
				title: 'Startups',
				icon: <GroupsIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			},
			{
				title: 'OKR Overview',
				icon: <AnalyticsIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			},
			// {
			// 	title: 'Investments',
			// 	icon: <LocalAtmIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			// },
			{
				title: 'User Activity',
				icon: <EventNoteIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			},
			{
				title: 'Revenue',
				icon: <PaymentIcon style={{ fontSize: '25px' }} className="home-link-icon" />
			}
		]
	});
	const [ open, setOpen ] = React.useState(false);
	const [ state, setState ] = React.useState({
		pay_for: '',
		month_of: '',
		amount: '',
		startup: '',
		mode_of_pay: '',
		transaction_code: ''
	});
	const [ loanState, setLoanState ] = React.useState({
		amount: '',
		loan_type: '',
		duration: '',
		interest: '',
		expected_payment: ''
	});
	const [ emailState, setEmailState ] = React.useState({
		email: '',
		startup: '',
		months: []
	});
	const [ revState, setRevState ] = React.useState({
		month_revenue: '',
		month_expense: '',
		date: '',
		month: ''
	});
	const [ error, setError ] = React.useState('');
	const [ error1, setError1 ] = React.useState('');
	const [ error2, setError2 ] = React.useState('');
	const [ emailMessage, setEmailMessage ] = React.useState('');
	const [ disable, setDisable ] = React.useState(false);
	const [ emailModal, setEmailModal ] = React.useState(false);
	const [ message, setMessage ] = React.useState('');
	const [ img, setImg ] = React.useState('');

	const { loader } = useSelector((state) => state.admin);
	const { username, admin, tokenExpiration } = useSelector((state) => state.auth);

	const current_date = Date.now();

	React.useEffect(() => {
		if (current_date >= tokenExpiration) {
			dispatch(actionCreators.removeUser());
			props.history.push('/');
		}
	}, []);

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setImg(e.target.files[0]);
	};

	const handleMultipleSelectChange = (e) => {
		let value = Array.from(e.target.selectedOptions, (option) => option.value);
		setEmailState({ ...emailState, months: value });
	};

	const calculate_loan = () => {
		if (loanState.loan_type === 'short-term') {
			setLoanState({
				...loanState,
				interest: parseInt(loanState.amount) * 0.01 * parseInt(loanState.duration),
				expected_payment:
					parseInt(loanState.amount) + parseInt(loanState.amount) * 0.01 * parseInt(loanState.duration)
			});
		}
		if (loanState.loan_type === 'long-term') {
			setLoanState({
				...loanState,
				interest: parseInt(loanState.amount) * 0.015,
				expected_payment: parseInt(loanState.amount) + parseInt(loanState.amount) * 0.015
			});
		}
	};

	const toggleActive = (index) => {
		setActive({ ...active, actionObject: active.objects[index] });
	};

	const toggleActiveStyle = (index) => {
		if (active.objects[index] === active.actionObject) {
			return 'home-link home-active';
		} else {
			return 'home-link home-inactive';
		}
	};

	const addPayment = async () => {
		if (
			state.amount === '' ||
			state.pay_for === '' ||
			state.month_of === '' ||
			state.transaction_code === '' ||
			state.mode_of_pay === ''
		)
			return setMessage('All fields are required');
		setMessage('Uploading...');
		setDisable(true);
		const data = new FormData();
		data.append('file', img);
		data.append('upload_preset', 'starthub_preset');
		await axios
			.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
			.then((res) => {
				setMessage('Image uploaded');
				dispatch(
					actionCreators.addRevenueShare(
						state.pay_for,
						state.month_of,
						parseInt(state.amount.replace(/,/g, '')),
						username,
						state.mode_of_pay,
						state.transaction_code,
						res.data.url,
						(res) => {
							if (res.success) {
								setMessage('Payment added, Thank you!');
								setState({
									pay_for: '',
									month_of: '',
									amount: '',
									startup: '',
									mode_of_pay: '',
									transaction_code: ''
								});
								setDisable(false);
							}
						}
					)
				);
			})
			.catch((error) => {
				setMessage('Trouble Uploading Image, Try again');
				console.log(error);
			});
	};

	const addRevenue = () => {
		if (
			revState.month_revenue === '' ||
			revState.month_expense === '' ||
			revState.date === '' ||
			revState.month === ''
		)
			return setMessage('All fields are reequired');
		dispatch(
			actionCreators.addRevenue(
				username,
				parseInt(revState.month_revenue.replace(/,/g, '')),
				parseInt(revState.month_expense.replace(/,/g, '')),
				revState.date,
				revState.month
			)
		);
		setRevState({
			month_expense: '',
			month_revenue: '',
			date: '',
			month: ''
		});
		setMessage('');
	};

	const handleLogoutClick = (e) => {
		dispatch(actionCreators.removeUser());
		props.history.push('/');
	};

	return (
		<div className="homepage-container">
			{open ? (
				<ModalUI>
					<div className="nav-modal-container">
						<div className="nav-container-header">
							<CloseIcon
								onClick={() => setOpen(false)}
								className="nav-icon"
								style={{ color: 'rgba(0,0,0,0.3)' }}
							/>
						</div>
						<Tabs
							style={{
								width: '100%',
								height: '80vh',
								overflowY: 'scroll'
							}}
							defaultActiveKey="1"
							centered
							tabBarStyle={{ color: '#37561b' }}
						>
							<TabPane tab="Report Revenue" key="1">
								<div className="nav-container-content">
									<div className="label">
										<h1>Monthly Reporting {username}</h1>
										<h4>
											Needs to be done every month. You have 2 weeks for the reporting after a
											month has passed. For example, January revenues must be reported latest by
											14th of Feb. If you fail to report for one month, you will not be able to
											request a loan in the next 6 months from StartHub. We will also not list you
											for any investment matchmaking for 9 months as we do not have enough data.
										</h4>
									</div>
									<div className="label">
										<p>
											Monthly Revenue(UGX)<strong style={{ color: 'red' }}> *</strong>
										</p>
										<h5>All revenues from 1st day of month to last day of the month.</h5>
									</div>
									<input
										value={revState.month_revenue}
										required="required"
										onChange={(e) => {
											if (!isInteger(revState.month_revenue))
												setError1('Enter amount or "0" if no revenue generated');
											if (isInteger(revState.month_revenue)) setError1('');
											setRevState({ ...revState, month_revenue: e.target.value });
										}}
									/>
									{error1 ? <p style={{ color: 'rgba(0,0,0,0.4)' }}>{error1}</p> : null}
									<div className="label">
										<p>
											Monthly Expenses(UGX)<strong style={{ color: 'red' }}> *</strong>
										</p>
										<h5>All expenses from 1st day of month to last day of the month. </h5>
									</div>
									<input
										value={revState.month_expense}
										required="required"
										onChange={(e) => {
											if (!isInteger(revState.month_expense))
												setError2('Enter amount or "0" if no expenses incurred');
											if (isInteger(revState.month_expense)) setError2('');
											setRevState({ ...revState, month_expense: e.target.value });
										}}
									/>
									{error2 ? <p style={{ color: 'rgba(0,0,0,0.4)' }}>{error2}</p> : null}
									<div className="label">
										<p>
											Date<strong style={{ color: 'red' }}> *</strong>
										</p>
										<h5>
											Put ANY day in the month you are reporting for. Even if you report only in
											July but for the month of June, select any date in June.
										</h5>
									</div>
									<input
										type="date"
										required="required"
										value={revState.date}
										onChange={(e) => {
											setRevState({ ...revState, date: e.target.value });
										}}
									/>
									<div className="label">
										<p>
											Month<strong style={{ color: 'red' }}> *</strong>
										</p>
										<h5>Put the month that you are submitting revenue for</h5>
									</div>
									<select
										required="required"
										value={revState.month}
										onChange={(e) => {
											setRevState({ ...revState, month: e.target.value });
										}}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="Jan">January</option>
										<option value="Feb">Febuary</option>
										<option value="Mar">March</option>
										<option value="Apr">April</option>
										<option value="May">May</option>
										<option value="Jun">June</option>
										<option value="Jul">July</option>
										<option value="Aug">August</option>
										<option value="Sep">September</option>
										<option value="Oct">October</option>
										<option value="Nov">November</option>
										<option value="Dec">December</option>
									</select>
									<button
										style={{
											background: disable ? '#eee' : '#37561b',
											marginTop: '1rem',
											color: '#fff'
										}}
										disabled={loader ? true : false}
										onClick={addRevenue}
									>
										{loader ? <Spin /> : 'Submit'}
									</button>
									{message ? <p>{message}</p> : null}
								</div>
							</TabPane>
							<TabPane tab="Report Payment" key="2">
								<div className="nav-container-content">
									<div className="label">
										<h2>Revenue</h2>
									</div>
									<div className="label">
										<p>
											Payment for<strong style={{ color: 'red' }}> *</strong>
										</p>
									</div>
									<select
										value={state.pay_for}
										onChange={(e) => setState({ ...state, pay_for: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										{/* <option value="Loan">Loan</option> */}
										<option value="Revenue share">Revenue share</option>
									</select>
									<div className="label">
										<p>
											Month of<strong style={{ color: 'red' }}> *</strong>
										</p>
									</div>
									<select
										value={state.month_of}
										onChange={(e) => setState({ ...state, month_of: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="Jan">January</option>
										<option value="Feb">Febuary</option>
										<option value="Mar">March</option>
										<option value="Apr">April</option>
										<option value="May">May</option>
										<option value="Jun">June</option>
										<option value="Jul">July</option>
										<option value="Aug">August</option>
										<option value="Sep">September</option>
										<option value="Oct">October</option>
										<option value="Nov">November</option>
										<option value="Dec">December</option>
									</select>
									<div className="label">
										<p>
											Amount<strong style={{ color: 'red' }}> *</strong>
										</p>
									</div>
									<input
										value={state.amount}
										onChange={(e) => {
											if (!isInteger(state.amount)) setError('Enter amount in shillings');
											if (isInteger(state.amount)) setError('');
											setState({ ...state, amount: e.target.value });
										}}
									/>
									{error ? <p style={{ color: 'rgba(0,0,0,0.4)' }}>{error}</p> : null}
									<div className="label">
										<p>
											Mode of payment<strong style={{ color: 'red' }}> *</strong>
										</p>
									</div>
									<select
										value={state.mode_of_pay}
										onChange={(e) => setState({ ...state, mode_of_pay: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="Mobile Money">Mobile Money</option>
										<option value="Airtel Money">Airtel Money</option>
										<option value="Cash">Cash</option>
										<option value="Bank">Bank</option>
									</select>
									<div className="label">
										<p>
											Transaction Code<strong style={{ color: 'red' }}> *</strong>
										</p>
									</div>
									<input
										value={state.transaction_code}
										onChange={(e) => setState({ ...state, transaction_code: e.target.value })}
									/>
									<div className="label">
										<p>
											Proof of payment<strong style={{ color: 'red' }}> *</strong>
										</p>
									</div>
									<input style={{ border: 'none' }} type="file" onChange={handleChange} />
									<button
										style={{
											background: disable ? '#eee' : '#37561b',
											marginTop: '1rem',
											color: '#fff'
										}}
										disabled={disable ? true : false}
										onClick={addPayment}
									>
										Submit
									</button>
									{message ? <p>{message}</p> : null}
								</div>
							</TabPane>
							{/* <TabPane tab="Request Loan" key="3">
								<div className="nav-container-content">
									<h2>Request Loan</h2>
									<Accordion style={{ width: '70%', marginBottom: '0.5rem', background: '#eee' }}>
										<AccordionSummary
											expandIcon={<CalculateIcon />}
											aria-controls="panel1a-content"
											id="panel1a-header"
										>
											<h4>Loan Calculator</h4>
										</AccordionSummary>
										<AccordionDetails className="accordion">
											<div className="accordion-container">
												<input
													placeholder="amount"
													value={loanState.amount}
													onChange={(e) =>
														setLoanState({ ...loanState, amount: e.target.value })}
												/>
												<input
													type="number"
													min="0"
													required="required"
													placeholder="Duration"
													value={loanState.duration}
													onChange={(e) =>
														setLoanState({ ...loanState, duration: e.target.value })}
												/>
												<select
													value={loanState.loan_type}
													onChange={(e) =>
														setLoanState({ ...loanState, loan_type: e.target.value })}
												>
													<option value="" disabled selected>
														-loan type-
													</option>
													<option value="short-term">short-term</option>
													<option value="long-term">long-term</option>
												</select>
												<button onClick={calculate_loan}>calculate</button>
											</div>
											<div className="accordion-container">
												<h4>Interest</h4>
												<h4>Outstanding balance</h4>
											</div>
											<div className="accordion-container">
												<div className="accordion-container-row">
													{loanState.loan_type ? <h3>{loanState.interest}</h3> : null}
												</div>
												<div className="accordion-container-row">
													{loanState.loan_type ? <h3>{loanState.expected_payment}</h3> : null}
												</div>
											</div>
										</AccordionDetails>
									</Accordion>
									<p>
										Loan type<strong style={{ color: 'red' }}> *</strong>
									</p>
									<select
										value={state.pay_for}
										onChange={(e) => setState({ ...state, pay_for: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="short-term">short-term loan</option>
										<option value="long-term">long-term loan</option>
									</select>

									<p>
										Amount<strong style={{ color: 'red' }}> *</strong>
									</p>
									<input
										value={state.amount}
										onChange={(e) => {
											if (!isInteger(state.amount)) setError('Enter amount in Shillings');
											if (isInteger(state.amount)) setError('');
											setState({ ...state, amount: e.target.value });
										}}
									/>
									{error ? <p style={{ color: 'red' }}>{error}</p> : null}
									<p>
										What will the loan be used for?<strong style={{ color: 'red' }}> *</strong>
									</p>
									<textarea
										value={state.transaction_code}
										onChange={(e) => setState({ ...state, transaction_code: e.target.value })}
									/>
									<button
										style={{ background: disable ? '#eee' : '#37561b' }}
										disabled={disable ? true : false}
										onClick={addPayment}
									>
										Request
									</button>
									{message ? <p>{message}</p> : null}
								</div>
							</TabPane> */}
						</Tabs>
					</div>
				</ModalUI>
			) : null}
			{emailModal ? (
				<ModalUI>
					<div className="nav-modal-container">
						<div className="nav-container-header">
							<CloseIcon
								onClick={() => setEmailModal(false)}
								className="nav-icon"
								style={{ color: 'rgba(0,0,0,0.3)' }}
							/>
						</div>
						<div className="nav-container-content">
							<h3>Revenue Submission Reminder Email</h3>
							<input
								placeholder="Email"
								type="email"
								value={emailState.email}
								onChange={(e) => setEmailState({ ...emailState, email: e.target.value })}
							/>
							<select
								onChange={(e) => setEmailState({ ...emailState, startup: e.target.value })}
								className="nav-container-select1"
							>
								<option value="" disabled selected>
									-select startup-
								</option>
								<option value="OnScore Africa">OnScore Africa</option>
								<option value="Solfix">Solfix</option>
								<option value="Rada Safaris">Rada Safaris</option>
								<option value="Zetu Africa">Zetu Africa</option>
								<option value="Social Clark">Social Clark</option>
								<option value="Inove Labs">Inove Labs</option>
								<option value="OMNI Gym">OMNI Gym</option>
								<option value="Isharc">Isharc</option>
								<option value="Qiribu">Qiribu</option>
								<option value="Figurines">Figurines</option>
								<option value="Grab Gas">Grab Gas</option>
								<option value="Onestope">Onestope</option>
								<option value="ShareCARD">ShareCARD</option>
							</select>
							<select
								multiple={true}
								onChange={handleMultipleSelectChange}
								className="nav-container-select2"
							>
								<option value="" disabled selected>
									-select months-
								</option>
								<option>January</option>
								<option>Febuary</option>
								<option>March</option>
								<option>April</option>
								<option>May</option>
								<option>June</option>
								<option>July</option>
								<option>August</option>
								<option>September</option>
								<option>October</option>
								<option>November</option>
								<option>December</option>
							</select>
							<button
								onClick={() =>
									dispatch(
										actionCreators.sendEmail(
											emailState.email,
											emailState.startup,
											emailState.months,
											(res) => {
												if (res.success) {
													setEmailMessage(res.res);
													setEmailState({
														email: '',
														startup: '',
														months: []
													});
												}
											}
										)
									)}
							>
								Send Email
							</button>
							<p>{emailMessage ? emailMessage : null}</p>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="homepage-sidebar">
				<div className="homepage-avatar">
					<img src={logo} alt="logo" />
				</div>
				<div className="username-logo">
					<AccountBoxIcon style={{ fontSize: '25px', color: '#37561b' }} />
					<h2>{username}</h2>
				</div>
				{admin &&
					adminLink.objects.map((e, index) => (
						<div
							key={index}
							className={toggleActiveStyle(index)}
							onClick={() => {
								toggleActive(index);
								setIndex(index);
							}}
						>
							<div className="home-link-row">
								{e.icon}
								<h4>{e.title}</h4>
							</div>
						</div>
					))}
				{!admin &&
					active.objects.map((e, index) => (
						<div
							key={index}
							className={toggleActiveStyle(index)}
							onClick={() => {
								toggleActive(index);
								setIndex(index);
							}}
						>
							<div className="home-link-row">
								{e.icon}
								<h4>{e.title}</h4>
							</div>
						</div>
					))}
				<div className="logout" onClick={handleLogoutClick}>
					<LogoutIcon style={{ fontSize: '20px' }} className="logout-icon" />
					<h5>Logout</h5>
				</div>
			</div>
			{!admin ? (
				<div className="homepage-main">
					{index === 0 ? <OKRs setOpen={setOpen} /> : null}
					{index === 1 ? <LeanCanvas /> : null}
					{index === 2 ? <Metrics /> : null}
					{index === 3 ? <DiagnosticsTest /> : null}
					{index === 4 ? <Calendar /> : null}
				</div>
			) : null}
			{admin ? (
				<div className="homepage-main">
					{index === 0 ? <Startups /> : null}
					{index === 1 ? <OkrOverview /> : null}
					{index === 2 ? <UserActivity /> : null}
					{index === 3 ? <Revenues /> : null}
				</div>
			) : null}
		</div>
	);
};
export default HomepageTemplate;
