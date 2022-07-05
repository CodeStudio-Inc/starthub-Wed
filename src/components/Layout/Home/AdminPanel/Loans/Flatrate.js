import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isInteger } from 'formik';
import { Table } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import { Spin } from 'antd';

import './Loans.css';
const Flatrate = ({ loans, props }) => {
	const [ state, setState ] = useState({
		amount: '',
		loanType: 'Short Term',
		date: '',
		startup: '',
		comment: '',
		interestRate: '',
		duration: '',
		grace_period: '',
		expected_payment: '',
		p_amount: '',
		p_date: '',
		p_startup: '',
		p_comment: ''
	});

	const [ showReceipt, setShowReceipt ] = useState(false);
	const [ error, setError ] = useState('');

	const { users, loading } = useSelector((state) => state.admin);

	const catalyzer = users.filter((user) => user.category === 'catalyzer');
	const username = Array.from(catalyzer, ({ username }) => username);
	// console.log(loans, 'state');

	// console.log(state.expected_payment, 'flatrate');

	const dispatch = useDispatch();

	useEffect(() => {}, []);

	let flatrate;

	const checkDurationValue = ({ target: { value: duration } }) => {
		flatrate = parseInt(state.amount) + parseInt(state.amount) * 0.01 * duration;
		if (duration <= 12) {
			setState((r) => ({
				...r,
				duration,
				interestRate: '1%',
				expected_payment: flatrate
			}));
			setShowReceipt(true);
		}
	};

	const emptyFieldsCheck =
		state.amount !== '' &&
		state.duration !== '' &&
		state.grace_period !== '' &&
		state.startup !== '' &&
		state.date !== '';

	const addLoan = () => {
		dispatch(
			actionCreators.addFlate(
				state.amount,
				state.date,
				state.duration,
				state.startup,
				state.comment,
				state.interestRate,
				state.grace_period,
				state.expected_payment,
				state.loanType
			)
		);
		setError('');
		setState({
			amount: '',
			date: '',
			duration: '',
			startup: '',
			comment: '',
			interestRate: '',
			grace_period: '',
			expected_payment: ''
		});
	};

	const columns = [
		{
			title: 'Startup Name',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Loan Amount(UGX)',
			dataIndex: 'amount',
			key: 'amount',
			align: 'left'
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		},
		{
			title: 'Outstanding Balance',
			dataIndex: 'outstanding',
			key: 'outstanding',
			align: 'left'
		},
		{
			title: 'Expected Balance',
			dataIndex: 'balance',
			key: 'balance',
			align: 'left'
		}
	];

	return (
		<div className="loans-main">
			<div className="loans-form">
				<div className="loan-form">
					<h2>ShortTerm Loan</h2>
					<div className="loan-separator" />
					<div className="loans-row">
						<div className="row-child">
							<div className="amount-row">
								<input
									type="text"
									required="required"
									placeholder="Amount"
									value={state.amount}
									onChange={(e) => {
										if (!isInteger(state.amount)) setError('Enter amount in UGX shillings');
										if (isInteger(state.amount)) setError('');
										setState({ ...state, amount: e.target.value });
									}}
								/>
								<h4>Shs</h4>
							</div>
							<div className="amount-row">
								<input
									type="date"
									value={state.date}
									onChange={(e) => setState({ ...state, date: e.target.value })}
								/>
							</div>
							<div className="amount-row">
								<input
									type="number"
									min="0"
									required="required"
									placeholder="Duration"
									value={state.duration}
									onChange={checkDurationValue}
								/>
								<h4>Months</h4>
							</div>
							<div className="amount-row">
								<input
									type="number"
									min="0"
									max="3"
									required="required"
									placeholder="Grace Period"
									value={state.grace_period}
									onChange={(e) => setState({ ...state, grace_period: e.target.value })}
								/>
								<h4>Months</h4>
							</div>
						</div>
						<div className="row-child">
							<select
								value={state.startup}
								onChange={(e) => setState({ ...state, startup: e.target.value })}
							>
								<option value="" disabled selected>
									Select Startup
								</option>
								<option value={username[0]}>Qiribu</option>
								<option value={username[1]}>Inove Labs</option>
								<option value={username[2]}>Isharc</option>
								<option value={username[3]}>Social Clark</option>
								<option value={username[4]}>Figurines</option>
								<option value={username[5]}>Rada Safaris</option>
								<option value={username[6]}>Zetu Africa</option>
								<option value={username[7]}>OMNI Gym</option>
								<option value={username[8]}>Economic Misfit</option>
								<option value={username[9]}>Solfix</option>
								<option value={username[10]}>Grab Gas</option>
								<option value={username[11]}>OnScore Africa</option>
								<option value={username[12]}>WAGE Spices</option>
								<option value={username[13]}>Divine Renewable Energy</option>
							</select>
							<textarea
								placeholder="Comment"
								value={state.comment}
								onChange={(e) => setState({ ...state, comment: e.target.value })}
							/>
						</div>
					</div>
					{error ? <p>{error}</p> : null}
					{showReceipt ? (
						<div className="receipt">
							<h3>Flat Rate</h3>
							<div className="loan-separator" />
							<div className="receipt-row">
								<h3>Interest Rate :</h3>
								<h4>{state.interestRate}</h4>
							</div>
							<div className="receipt-row">
								<h3>Expected Payment :</h3>
								<h4>{state.expected_payment}</h4>
							</div>
							<div className="loan-separator" />
						</div>
					) : null}
					<div className="loader-row">
						<button
							style={{
								background: emptyFieldsCheck ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
								color: emptyFieldsCheck ? '#fff' : 'rgba(0,0,0,0.4)'
							}}
							onClick={addLoan}
							disabled={emptyFieldsCheck ? false : true}
						>
							Add Loan
						</button>
						{loading ? <Spin tip="Loading..." /> : null}
					</div>
				</div>
				<div className="loan-overview">
					<h2>Loans Table</h2>
					<div className="loan-separator" />
					<Table
						style={{ width: '100%' }}
						columns={columns}
						dataSource={[
							...loans.map((r) => ({
								...r,
								key: r._id,
								startup: r.startup,
								amount: r.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
								date: r.date,
								outstanding: r.outstandingbalance.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
								balance: r.expected_payment.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}))
						]}
						onRow={(record, rowIndex) => {
							return {
								onClick: () => props.history.push('/pay-loan', { loan: record })
							};
						}}
						pagination={{
							defaultPageSize: 10,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Flatrate;
