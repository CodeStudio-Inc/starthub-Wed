import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { isInteger } from 'formik';
import * as actionCreators from '../../../../store/actionCreators';
import moment from 'moment';

import './Loans.css';
const ReducingBalance = ({ props, loans }) => {
	const [ state, setState ] = useState({
		amount: '',
		loanType: 'Long Term',
		date: '',
		startup: '',
		comment: '',
		interest: '',
		interestRate: '1.5%',
		duration: '',
		grace_period: '',
		search_table: ''
	});

	const [ installAmount, setInstallAmount ] = useState('');
	const [ record, setRecord ] = useState('');
	const [ loanReceipt, setloanReceipt ] = useState(false);
	const [ addloanmoadal, setAddloanmoadal ] = useState(false);
	const [ showReceipt, setShowReceipt ] = useState(false);
	const [ pay, setPay ] = useState(false);
	const [ error, setError ] = useState('');

	const users = useSelector((state) => state.admin.users);
	const loading = useSelector((state) => state.admin.loader);

	const catalyzer = users.filter((user) => user.category === 'catalyzer');
	const username = Array.from(catalyzer, ({ username }) => username);

	const loan = loans && loans[0];
	// console.log(loan, 'loan');

	const dispatch = useDispatch();

	useEffect(() => {}, []);

	const emptyFieldsCheck =
		state.amount !== '' &&
		state.duration !== '' &&
		state.grace_period !== '' &&
		state.startup !== '' &&
		state.date !== '';

	const addLoan = () => {
		dispatch(
			actionCreators.addReducingBalance(
				state.amount,
				state.date,
				state.duration,
				state.startup,
				state.comment,
				state.interestRate,
				state.grace_period,
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
			interest: ''
		});
		setAddloanmoadal(false);
		setShowReceipt(false);
	};

	const columns = [
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		},
		{
			title: 'Startup',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Outstanding Princple',
			dataIndex: 'outstandingPrincple',
			key: 'outstandingPrincple',
			align: 'left'
		},
		{
			title: 'Accrued Interest',
			dataIndex: 'accruedInterest',
			key: 'accruedInterest',
			align: 'left'
		},
		{
			title: 'Interest',
			dataIndex: 'interest',
			key: 'interest',
			align: 'left'
		},
		{
			title: 'Payment',
			dataIndex: 'payment',
			key: 'payment',
			align: 'left'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'left'
		},
		{
			title: 'Action',
			dataIndex: 'id',
			key: 'id',
			render: (r) => (
				<div className="pay-modal">
					{pay && record === r ? (
						<input
							value={installAmount}
							placeholder="Enter Amount"
							onChange={(e) => setInstallAmount(e.target.value)}
						/>
					) : null}
					{!pay ? <button onClick={() => setPay(true)}>pay loan</button> : null}
					{pay && record === r ? (
						<button
							onClick={() =>
								dispatch(
									actionCreators.addRBPayment(r, installAmount, (res) => {
										if (res.success) {
											setPay(false);
											setInstallAmount('');
											setloanReceipt(false);
										}
									})
								)}
						>
							save
						</button>
					) : null}
					{pay && record === r ? <button onClick={() => setPay(false)}>cancel</button> : null}
				</div>
			)
		}
	];

	return (
		<div className="loans-main">
			<div className="loans-form">
				{addloanmoadal ? (
					<div className="loan-form">
						<h2>LongTerm Loan</h2>
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
										onChange={(e) => {
											setState({
												...state,
												date: e.target.value,
												interest: state.amount * 0.015
											});
											setShowReceipt(true);
										}}
									/>
								</div>
								<div className="amount-row">
									<input
										type="number"
										min="13"
										max="25"
										required="required"
										placeholder="Duration"
										value={state.duration}
										onChange={(e) => setState({ ...state, duration: e.target.value })}
									/>
									<h4>Months</h4>
								</div>
								<div className="amount-row">
									<input
										type="number"
										min="5"
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
									{/* <option value={username[8]}>Economic Misfit</option> */}
									<option value={username[9]}>Solfix</option>
									<option value={username[10]}>Grab Gas</option>
									<option value={username[11]}>OnScore Africa</option>
									<option value={username[12]}>WAGE Spices</option>
									{/* <option value={username[13]}>Divine Renewable Energy</option> */}
									<option value={username[14]}>Onestope</option>
									<option value={username[16]}>Kawu</option>
									<option value={username[17]}>Agri-Logistics</option>
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
								<h3>Interest of the month</h3>
								<div className="loan-separator" />
								<div className="receipt-row">
									<h3>Shs </h3>
									<h4>{state.interest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>
								</div>
								<div className="loan-separator" />
							</div>
						) : null}
						<div className="loader-row">
							<button
								style={{
									background: emptyFieldsCheck ? '#dfa126' : 'rgba(0,0,0,0.2)',
									color: emptyFieldsCheck ? '#fff' : 'rgba(0,0,0,0.4)'
								}}
								disabled={emptyFieldsCheck ? false : true}
								onClick={addLoan}
							>
								Add Loan
							</button>
						</div>
					</div>
				) : null}
				<div className="loan-overview">
					<div className="loan-overview-row">
						{addloanmoadal ? (
							<button onClick={() => setAddloanmoadal(false)}>Cancel New Loan</button>
						) : (
							<button
								onClick={() => {
									setAddloanmoadal(true);
									setloanReceipt(false);
								}}
							>
								Add New Loan
							</button>
						)}
						<div className="loan-receipt-row">
							<h4>search startup:</h4>
							<input
								value={state.search_table}
								onChange={(e) => setState({ ...state, search_table: e.target.value })}
								onKeyUp={() => {
									if (!state.search_table) {
										dispatch(actionCreators.getReducingBalance());
										setloanReceipt(false);
									} else {
										setTimeout(() => {
											dispatch(
												actionCreators.searchReducingBalance(state.search_table, (res) => {
													if (res.success) setloanReceipt(true);
												})
											);
										}, 3000);
									}
								}}
							/>
						</div>
					</div>
					{loanReceipt ? (
						<div className="loan-receipt">
							<div className="loan-receipt-row">
								<h3>Loan Amount: </h3>
								<h2>{loan.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Shs</h2>
							</div>
							<div className="loan-receipt-row">
								<h3>Interest: </h3>
								<h2>{loan.interest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Shs</h2>
							</div>
							<div className="loan-receipt-row">
								<h3>Interest Rate: </h3>
								<h2>{loan.interestRate}</h2>
							</div>
							<div className="loan-receipt-row">
								<h3>Duration(months): </h3>
								<h2>{loan.duration}</h2>
							</div>
							<div className="loan-receipt-row">
								<h3>Grace Period(months): </h3>
								<h2>{loan.grace_period}</h2>
							</div>
						</div>
					) : null}
					<div className="loan-separator" />
					<Table
						style={{ width: '100%' }}
						columns={columns}
						dataSource={[
							...loans.map((r) => ({
								...r,
								key: r._id,
								date: moment(r.date).format('YYYY-MM-DD'),
								startup: r.startup,
								outstandingPrincple: r.outstandingPrincple.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
								accruedInterest: r.accruedInterest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
								status: r.status,
								payment: r.payment,
								id: r._id
							}))
						]}
						onRow={(record, rowIndex) => {
							return {
								onClick: () => {
									if (record.status === 'paid off') return;
									setRecord(record._id);
								}
							};
						}}
						pagination={{
							defaultPageSize: 8,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
						loading={loading ? true : false}
					/>
				</div>
			</div>
		</div>
	);
};

export default ReducingBalance;
