import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import { Spin } from 'antd';
import { Image } from 'antd';
import ModalUI from '../../../../ModalUI/Loader';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './Loans.css';
const RevenueShare = () => {
	const [ record, setRecord ] = useState({});
	const [ open, setOpen ] = useState(false);
	const [ error, setError ] = useState('');
	const [ addloanmoadal, setAddloanmoadal ] = useState(false);
	const [ state, setState ] = useState({
		search_table: ''
	});

	const { users, revShares, loading } = useSelector((state) => state.admin);
	const { username } = useSelector((state) => state.auth);
	const adminUser = users.filter((user) => user.category === 'admin')[0].username;
	// console.log(record);

	const _revShares = revShares && revShares;

	// console.log(_revShares);

	const dispatch = useDispatch();

	const getRevShares = () => dispatch(actionCreators.getRevenueShares());

	useEffect(() => {
		getRevShares();
	}, []);

	const columns = [
		{
			title: 'Startup Name',
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
			title: 'Month',
			dataIndex: 'month',
			key: 'month',
			align: 'left'
		},
		{
			title: 'Mode of payment',
			dataIndex: 'payment',
			key: 'payment',
			align: 'left'
		},
		{
			title: 'Proof of payment',
			dataIndex: 'proof',
			key: 'proof',
			align: 'left',
			render: (r) => <Image src={r} style={{ height: '30px', width: '30px' }} />
		},
		{
			title: 'Approval Status',
			dataIndex: 'status',
			key: 'status',
			align: 'left',
			render: (r) => {
				if (r === false)
					return (
						<div className="approve-column" onClick={() => setOpen(true)}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									border: '1px solid #dfa126',
									width: '60%'
								}}
							>
								<div
									style={{
										height: '10px',
										width: '10px',
										borderRadius: '20px',
										background: '#dfa126',
										marginRight: '0.3rem'
									}}
								/>
								<p style={{ margin: '0' }}>pending</p>
							</div>
						</div>
					);
				if (r === true)
					return (
						<div className="approve-column" onClick={() => setOpen(true)}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									border: '1px solid rgb(51, 185, 38)',
									width: '60%'
								}}
							>
								<div
									style={{
										height: '10px',
										width: '10px',
										borderRadius: '20px',
										background: 'rgb(51, 185, 38)',
										marginRight: '0.3rem'
									}}
								/>
								<p style={{ margin: '0' }}>Approved</p>
							</div>
						</div>
					);
			}
		}
	];

	return (
		<div className="loans-main">
			{open ? (
				<ModalUI>
					<div className="approve-modal">
						<div className={record.approve === false ? 'approve-header' : 'approved-header'}>
							{record.approve === false ? <h2>Approval Required</h2> : <h2>Approved</h2>}
						</div>
						<div className="approve-main">
							{loading ? (
								<Spin />
							) : (
								<div>
									{record.approve === false ? (
										<PendingIcon
											style={{ fontSize: '30px', color: '#dfa126', marginBottom: '1rem' }}
										/>
									) : null}
									{record.approve === true ? (
										<CheckCircleIcon
											style={{
												fontSize: '30px',
												color: 'rgb(51, 185, 38)',
												marginBottom: '1rem'
											}}
										/>
									) : null}
								</div>
							)}
							{record.approve === false ? <h3>Payment pending</h3> : <h3>Payment approved</h3>}
							<div className="approve-modal-receipt">
								<div className="approve-column">
									<h4>Startup :</h4>
									<p>{record.startup}</p>
								</div>
								<div className="approve-column">
									<h4>Payment for :</h4>
									<p>{record.pay_for}</p>
								</div>
								<div className="approve-column">
									<h4>Amount :</h4>
									<p>{record.amount}</p>
								</div>
								<div className="approve-column">
									<h4>Month of :</h4>
									<p>{record.month_of}</p>
								</div>
							</div>
							{loading || record.approve === true ? null : (
								<CheckCircleOutlineIcon
									className="approve-icon"
									style={{ fontSize: '40px', color: 'rgb(51, 185, 38)', marginBottom: '1rem' }}
									onClick={() => {
										if (username !== adminUser) return setError('The Accountant approves payments');
										dispatch(
											actionCreators.approvePayment(record._id, (res) => {
												if (res.success) setOpen(false);
											})
										);
									}}
								/>
							)}
							{loading ? null : (
								<HighlightOffIcon
									className="approve-icon"
									style={{ fontSize: '40px', color: 'red' }}
									onClick={() => {
										setOpen(false);
										setError('');
									}}
								/>
							)}
							{error ? <p>{error}</p> : null}
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="loans-form">
				<div className="loan-form" />
				<div className="loan-overview">
					<div className="loan-overview-row">
						{addloanmoadal ? (
							<button onClick={() => setAddloanmoadal(false)}>Cancel New Loan</button>
						) : (
							<button
								onClick={() => {
									setAddloanmoadal(true);
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
									} else {
										setTimeout(() => {
											dispatch(actionCreators.searchRevShare(state.search_table));
										}, 3000);
									}
								}}
							/>
						</div>
					</div>
					<div className="loan-separator" />
					<Table
						style={{ width: '100%' }}
						columns={columns}
						dataSource={[
							..._revShares.map((r) => ({
								...r,
								key: r._id,
								startup: r.startup,
								amount: r.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
								month: r.month_of,
								payment: r.mode_of_pay,
								proof: r.proof_of_pay,
								status: r.approve
							}))
						]}
						onRow={(record, rowIndex) => {
							return {
								onClick: () => setRecord(record)
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

export default RevenueShare;
