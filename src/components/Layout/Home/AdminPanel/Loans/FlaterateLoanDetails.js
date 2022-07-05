import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import { Spin } from 'antd';
import { isInteger } from 'formik';
import moment from 'moment';

import './Loans.css';

const FlatrateLoanDetails = (props) => {
	const [ state, setState ] = useState({
		p_amount: '',
		p_date: '',
		p_startup: '',
		p_comment: ''
	});

	const [ error, setError ] = useState('');

	const { users, loading, loans } = useSelector((state) => state.admin);
	const loanId = props.location.state.loan._id;
	const startup = props.location.state.loan.startup;

	const _loans = loans.filter((l) => l.startup === startup)[0].payments;
	const balance = loans.filter((l) => l.startup === startup)[0].outstandingbalance;
	const balance_check = loans.filter((l) => l.outstandingbalance === '0' && l.startup === startup);

	// console.log(balance_check, startup);

	const dispatch = useDispatch();

	useEffect(() => {
		getLoans();
	}, []);

	const getLoans = () => dispatch(actionCreators.getFlate());

	const emptyFieldsCheck = state.p_amount !== '';

	const addLoanPayment = () => {
		dispatch(
			actionCreators.addFlateratePayment(state.p_amount, state.p_date, state.p_startup, state.p_comment, loanId)
		);
		setState({
			p_amount: '',
			p_date: '',
			p_startup: '',
			p_comment: ''
		});
	};

	const columns = [
		{
			title: 'Amount(UGX)',
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
			title: 'Comment',
			dataIndex: 'comment',
			key: 'comment',
			align: 'left'
		}
	];

	return (
		<div className="flatrate-menu">
			<div className="flatrate-content">
				<div className="loans-form">
					{balance_check.length === 1 ? (
						<div className="loan-header-hidden">
							<h4 onClick={() => props.history.goBack()}>Back</h4>
						</div>
					) : null}
					<div className={balance_check.length === 1 ? 'loan-form-hidden' : 'loan-form'}>
						<div className="loan-header">
							<h2>
								Outstanding Balance <strong>{balance.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>Shs
							</h2>
							<h4 onClick={() => props.history.goBack()}>Back</h4>
						</div>
						<div className="loan-separator" />
						<div className="loans-row">
							<div className="row-child">
								<div className="amount-row">
									<input
										type="text"
										required="required"
										placeholder="Amount"
										value={state.p_amount}
										onChange={(e) => {
											if (!isInteger(state.p_amount)) setError('Enter amount in UGX shillings');
											if (isInteger(state.p_amount)) setError('');
											setState({ ...state, p_amount: e.target.value });
										}}
									/>
									<h4>Shs</h4>
								</div>
								<div className="amount-row">
									<input
										type="date"
										value={state.p_date}
										onChange={(e) => setState({ ...state, p_date: e.target.value })}
									/>
								</div>
							</div>
							<div className="row-child">
								<select
									value={state.p_startup}
									onChange={(e) => setState({ ...state, p_startup: e.target.value })}
								>
									<option value="" disabled selected>
										Select Startup
									</option>
									<option value={startup}>{startup}</option>
								</select>
								<textarea
									placeholder="Comment"
									value={state.p_comment}
									onChange={(e) => setState({ ...state, p_comment: e.target.value })}
								/>
							</div>
						</div>
						{error ? <p>{error}</p> : null}
						<div className="loader-row">
							<button
								style={{
									background: emptyFieldsCheck ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
									color: emptyFieldsCheck ? '#fff' : 'rgba(0,0,0,0.4)'
								}}
								onClick={addLoanPayment}
								disabled={emptyFieldsCheck ? false : true}
							>
								Pay Loan
							</button>
							{loading ? <Spin tip="Loading..." /> : null}
						</div>
					</div>
					<div className="loan-overview">
						<h2>{startup} Payments</h2>
						<div className="loan-separator" />
						<Table
							style={{ width: '100%' }}
							columns={columns}
							dataSource={[
								..._loans.map((r) => ({
									...r,
									key: r._id,
									amount: r.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
									date: r.date,
									comment: r.comment
								}))
							]}
							pagination={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlatrateLoanDetails;
