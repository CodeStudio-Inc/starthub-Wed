import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import ModalUI from '../../../../ModalUI';
import Repayments from './RBRepayments';
import { Spin } from 'antd';
import { isInteger } from 'formik';
import moment from 'moment';

import './Loans.css';

const RBLoanDetails = (props) => {
	const [ state, setState ] = useState({
		p_amount: '',
		p_date: '',
		p_startup: '',
		p_comment: ''
	});

	const [ enableInput, setEnableInput ] = useState(false);
	const [ error, setError ] = useState('');

	const { users, rb_loans, loading } = useSelector((state) => state.admin);
	const loanId = props.location.state.loan._id;
	const startup = props.location.state.loan.startup;

	const catalyzer = users.filter((user) => user.category === 'catalyzer');
	const username = Array.from(catalyzer, ({ username }) => username);

	// const startupLoans = loans && loans.filter((el) => el._id === loanId)[0].loans;
	const payments = rb_loans && rb_loans.filter((el) => el._id === loanId)[0].payments;
	const balance = rb_loans && rb_loans.filter((el) => el._id === loanId)[0].outstandingPrincple;
	const accrued = rb_loans && rb_loans.filter((el) => el._id === loanId)[0].accruedInterest;
	const interest = rb_loans && rb_loans.filter((el) => el._id === loanId)[0].interest;
	console.log(props.location.state.loan);

	const dispatch = useDispatch();

	useEffect(() => {
		getLoans();
	}, []);

	const getLoans = () => dispatch(actionCreators.getFlate());

	const emptyFieldsCheck = state.p_amount !== '';

	const addLoanPayment = () => {
		dispatch(actionCreators.addRBPayment(state.p_amount, state.p_date, state.p_comment, loanId));
		setState({
			p_amount: '',
			p_date: '',
			p_comment: ''
		});
	};

	const columns = [
		{
			title: 'Startup',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Amount(UGX)',
			dataIndex: 'amount',
			key: 'amount',
			align: 'left'
		},
		{
			title: 'Comment',
			dataIndex: 'comment',
			key: 'comment',
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
		<div className="flatrate-menu">
			<div className="flatrate-content">
				<div className="loans-form">
					<div className="loan-form">
						<div className="loan-header">
							<h2>
								Outstanding Princple of {''}
								<strong>Shs {balance.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>, accrued interest{' '}
								<strong>{accrued}</strong> with interest of the month{' '}
								<strong>Shs {interest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
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
						<h2>{startup} Loans</h2>
						<div className="loan-separator" />
						<Table
							style={{ width: '100%' }}
							columns={columns}
							dataSource={[
								...payments.map((r) => ({
									...r,
									key: r._id,
									startup: r.startup,
									amount: r.installAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
									comment: r.comment,
									date: moment(r.dateCreated).format('DD-MM-YYYY')
								}))
							]}
							pagination={{
								defaultPageSize: 10,
								showSizeChanger: true,
								pageSizeOptions: [ '10', '20', '30' ]
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RBLoanDetails;
