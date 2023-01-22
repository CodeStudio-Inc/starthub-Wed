import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, svg } from '../../../Paths';
import CloseIcon from '@material-ui/icons/Close';

const MakePayment = ({ setOpen, startups, loading }) => {
	const [ state, setState ] = React.useState({
		startup: '',
		amount: '',
		month: '',
		date: '',
		disable: false
	});

	// console.log(loading);

	const dispatch = useDispatch();

	const addPayment = () => {
		if (!state.startup || !state.amount || !state.month || !state.date)
			return setState({ ...state, disable: true });
		dispatch(actionCreators.addPayment(state.startup, state.amount, state.month, state.date));
		setState({
			startup: '',
			amount: '',
			month: '',
			date: '',
			disable: false
		});
	};

	return (
		<div className="payment-modal-container">
			<div className="payment-modal-header">
				<CloseIcon
					style={{ fontSize: '25px', color: 'rgba(0,0,0,0.4)' }}
					className="close-modal-icon"
					onClick={() => setOpen(false)}
				/>
			</div>
			<div className="payment-modal-content">
				<h4>Startup</h4>
				<select value={state.startup} onChange={(e) => setState({ ...state, startup: e.target.value })}>
					<option value="" disabled selected>
						-select startup-
					</option>
					{startups.map((s) => <option value={s.username}>{s.username}</option>)}
				</select>
				<h4>Amount</h4>
				<input value={state.amount} onChange={(e) => setState({ ...state, amount: e.target.value })} />
				<h4>Month</h4>
				<select value={state.month} onChange={(e) => setState({ ...state, month: e.target.value })}>
					<option value="" disabled selected>
						-select month-
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
				<h4>Date</h4>
				<input type="date" value={state.date} onChange={(e) => setState({ ...state, date: e.target.value })} />
			</div>
			<button disabled={state.disable} onClick={addPayment}>
				{loading ? <img src={svg} style={{ height: '20px', width: '20px' }} /> : 'Save'}
			</button>
		</div>
	);
};

export default MakePayment;
