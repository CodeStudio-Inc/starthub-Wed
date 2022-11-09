import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { ModalUI, actionCreators } from '../../Paths';
import { Spin } from 'antd';
import { Image } from 'antd';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RevenueShare = () => {
	const [ record, setRecord ] = React.useState({});
	const [ open, setOpen ] = React.useState(false);
	const [ error, setError ] = React.useState('');

	const { users, revShares, loading } = useSelector((state) => state.admin);
	const { username, userId } = useSelector((state) => state.auth);
	const adminUser = users.filter((user) => user.category === 'admin')[0].username;
	const filtereUsers = users.filter((el) => el.category === 'catalyzer' && el.mentor === userId);

	let users_revenue_share = [];

	filtereUsers.forEach((element) => {
		let user = revShares.filter((el) => el.creator === element._id).slice(-1).pop();
		users_revenue_share.push(user);
	});

	const data = users_revenue_share.filter(function(element) {
		return element !== undefined;
	});

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

	const dispatch = useDispatch();
	return (
		<div className="revenue-main">
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
										if (username !== adminUser)
											return setError('Sorry, only the Accountant approves payments');
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
			<Table
				style={{ width: '90%' }}
				columns={columns}
				dataSource={[
					...data.map((r) => ({
						...r,
						key: r._id,
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
	);
};

export default RevenueShare;
