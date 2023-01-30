import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, svg } from '../../../Paths';
import CloseIcon from '@material-ui/icons/Close';
import { Table } from 'antd';
import moment from 'moment';

const MakePayment = ({ setOpen, startups }) => {
	const [ state, setState ] = React.useState({
		startup: '',
		amount: '',
		month: '',
		date: '',
		message: ''
	});

	const { loading, outstanding_revenue_payment } = useSelector((state) => state.admin);

	const dispatch = useDispatch();

	const addPayment = () => {
		if (!state.startup || !state.amount || !state.date)
			return setState({ ...state, message: 'All fields are required' });
		dispatch(actionCreators.addPayment(state.startup, state.amount, state.month, state.date));
		setState({
			startup: '',
			amount: '',
			month: '',
			date: '',
			message: ''
		});
	};

	const getOutstandingRevenueSharePayment = () => {
		if (!state.startup) return setState({ ...state, message: 'select a startup' });
		dispatch(actionCreators.getOutstandingRevenueSharePayment(state.startup));
	};

	const columns = [
		{
			title: 'Revenue',
			dataIndex: 'month_expense',
			key: 'month_expense',
			align: 'left'
		},
		{
			title: 'Expected Revenue Share Payment',
			dataIndex: 'expectedRevsharePayment',
			key: 'expectedRevsharePayment',
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
		<div className="payment-modal-container">
			<div className="payment-modal-header">
				<CloseIcon
					style={{ fontSize: '25px', color: 'rgba(0,0,0,0.4)' }}
					className="close-modal-icon"
					onClick={() => setOpen(false)}
				/>
			</div>
			<div className="payment-modal-row">
				<div className="payment-modal-table">
					<button onClick={getOutstandingRevenueSharePayment}>Outstanding Revenue Share Payment</button>
					<Table
						columns={columns}
						dataSource={[
							...(outstanding_revenue_payment &&
								outstanding_revenue_payment.map((r) => ({
									...r,
									key: r._id
								})))
						]}
						onRow={(record) => {
							return {
								onClick: () => {
									setState({
										...state,
										amount: record.expectedRevsharePayment,
										month: moment(record.date).format('MMM'),
										date: record.date
									});
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
				<div className="payment-modal-content">
					<h4>Startup</h4>
					<select value={state.startup} onChange={(e) => setState({ ...state, startup: e.target.value })}>
						<option value="" disabled selected>
							-select startup-
						</option>
						{startups && startups.map((s) => <option value={s.username}>{s.username}</option>)}
					</select>
					<h4>Amount</h4>
					<input value={state.amount} onChange={(e) => setState({ ...state, amount: e.target.value })} />
					<h4>Date</h4>
					<input
						type="date"
						value={state.date}
						onChange={(e) => setState({ ...state, date: e.target.value })}
					/>
				</div>
			</div>
			<button onClick={addPayment}>
				{loading ? <img src={svg} style={{ height: '30px', width: '30px' }} /> : 'Make Payment'}
			</button>
			<p>{state.message}</p>
		</div>
	);
};

export default MakePayment;
