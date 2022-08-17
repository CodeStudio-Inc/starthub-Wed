import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalUI from '../ModalUI';
import { withRouter } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { isInteger } from 'formik';
import axios from 'axios';
import * as actionCreators from '../store/actionCreators';
import { Tabs } from 'antd';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CalculateIcon from '@mui/icons-material/Calculate';

import './Navigation.css';
const { TabPane } = Tabs;

const Topnavbar = (props) => {
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
	const [ error, setError ] = React.useState('');
	const [ emailMessage, setEmailMessage ] = React.useState('');
	const [ disable, setDisable ] = React.useState(false);
	const [ emailModal, setEmailModal ] = React.useState(false);
	const [ message, setMessage ] = React.useState('');
	const [ img, setImg ] = React.useState('');

	const { username, admin, category } = useSelector((state) => state.auth);
	// console.log(emailState.months, 'interest');

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
						state.amount,
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

	return (
		<div className="top-nav">
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
								width: '100%'
							}}
							defaultActiveKey="1"
							centered
							tabBarStyle={{ color: '#dfa126' }}
						>
							<TabPane tab="Revenue Payment" key="1">
								<div className="nav-container-content">
									<h2>Revenue</h2>
									<p>
										Payment for<strong style={{ color: 'red' }}> *</strong>
									</p>
									<select
										value={state.pay_for}
										onChange={(e) => setState({ ...state, pay_for: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="Loan">Loan</option>
										<option value="Revenue share">Revenue share</option>
									</select>
									<p>
										Month of<strong style={{ color: 'red' }}> *</strong>
									</p>
									<select
										value={state.month_of}
										onChange={(e) => setState({ ...state, month_of: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="January">Jan</option>
										<option value="Febuary">Feb</option>
										<option value="March">Mar</option>
										<option value="April">Apr</option>
										<option value="May">May</option>
										<option value="June">Jun</option>
										<option value="July">Jul</option>
										<option value="August">Aug</option>
										<option value="September">Sep</option>
										<option value="October">Oct</option>
										<option value="November">Nov</option>
										<option value="December">Dec</option>
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
										Mode of payment<strong style={{ color: 'red' }}> *</strong>
									</p>
									<select
										value={state.mode_of_pay}
										onChange={(e) => setState({ ...state, mode_of_pay: e.target.value })}
									>
										<option value="" disabled selected>
											-select-
										</option>
										<option value="Mobile Money">Mobile Money</option>
										<option value="Airtel Money">Airtel Money</option>
										<option value="Bank">Bank</option>
									</select>
									<p>
										Transaction Code<strong style={{ color: 'red' }}> *</strong>
									</p>
									<input
										value={state.transaction_code}
										onChange={(e) => setState({ ...state, transaction_code: e.target.value })}
									/>
									<p>
										Proof of payment<strong style={{ color: 'red' }}> *</strong>
									</p>
									<input style={{ border: 'none' }} type="file" onChange={handleChange} />
									<button
										style={{ background: disable ? '#eee' : '#dfa126' }}
										disabled={disable ? true : false}
										onClick={addPayment}
									>
										Submit
									</button>
									{message ? <p>{message}</p> : null}
								</div>
							</TabPane>
							{/* <TabPane tab="Request Loan" key="2">
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
										style={{ background: disable ? '#eee' : '#dfa126' }}
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
							<select onChange={(e) => setEmailState({ ...emailState, startup: e.target.value })}>
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
							<select multiple={true} onChange={handleMultipleSelectChange}>
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
			<div className="top-inner-nav">
				{admin ? <h4 onClick={() => props.history.push('/okr-overview')}>Overview</h4> : null}
				{admin ? <h4 onClick={() => props.history.push('/loans')}>Investments</h4> : null}
				{admin ? <h4 onClick={() => props.history.push('/user-activity')}>User Activity</h4> : null}
				{admin ? <h4 onClick={() => setEmailModal(true)}>Email Reminder</h4> : null}
				{!admin ? <h4 onClick={() => props.history.push('/')}>OKRs</h4> : null}
				{!admin && category !== 'internal' && category !== 'dskills' ? (
					<h4 onClick={() => props.history.push('/canvas-board')}>Lean Canvas</h4>
				) : null}
				{!admin && category !== 'internal' && category !== 'dskills' ? (
					<div onClick={() => setOpen(true)} className="rev-button">
						<h5>loans and revenue</h5>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default withRouter(Topnavbar);
