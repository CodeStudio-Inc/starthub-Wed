import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalUI from '../ModalUI';
import { withRouter } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { isInteger } from 'formik';
import axios from 'axios';
import * as actionCreators from '../store/actionCreators';

import './Navigation.css';
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
	const [ error, setError ] = React.useState('');
	const [ disable, setDisable ] = React.useState(false);
	const [ message, setMessage ] = React.useState('');
	const [ img, setImg ] = React.useState('');

	const { username, admin, category } = useSelector((state) => state.auth);
	// console.log(category);

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setImg(e.target.files[0]);
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
						<div className="nav-container-content">
							<h2>Payment Form</h2>
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
						</div>
						<button
							style={{ background: disable ? '#eee' : '#dfa126' }}
							disabled={disable ? true : false}
							onClick={addPayment}
						>
							Submit
						</button>
						{message ? <p>{message}</p> : null}
					</div>
				</ModalUI>
			) : null}
			<div className="top-inner-nav">
				{admin ? <h4 onClick={() => props.history.push('/okr-overview')}>Overview</h4> : null}
				{admin ? <h4 onClick={() => props.history.push('/loans')}>Investments</h4> : null}
				{admin ? <h4 onClick={() => props.history.push('/user-activity')}>User Activity</h4> : null}
				{!admin ? <h4 onClick={() => props.history.push('/')}>OKRs</h4> : null}
				{!admin && category !== 'internal' && category !== 'dskills' ? (
					<h4 onClick={() => props.history.push('/canvas-board')}>Lean Canvas</h4>
				) : null}
				{!admin && category !== 'internal' && category !== 'dskills' ? (
					<div onClick={() => setOpen(true)} className="rev-button">
						<h5>Revenue Payment</h5>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default withRouter(Topnavbar);
