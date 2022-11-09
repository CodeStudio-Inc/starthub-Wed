import React from 'react';
import { Table } from 'antd';
import ModalUI from '../ModalUI';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';

const ApproveRequests = () => {
	const [ open, setOpen ] = React.useState(false);
	const data = [
		{
			refNo: 'CR0978695',
			date: '2022-10-19',
			expenseType: 'Consultancy Fees',
			amount: '500000',
			payee: 'John Doe',
			status: 'pending',
			acknowledgment: 'Not Received'
		},
		{
			refNo: 'CR0978696',
			date: '2022-10-18',
			expenseType: 'Airtime',
			amount: '50000',
			payee: 'John Doe',
			status: 'approved',
			acknowledgment: 'Received'
		}
	];
	const columns = [
		{
			title: 'Reference No.',
			dataIndex: 'reference',
			key: 'reference',
			align: 'left'
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		},
		{
			title: 'Expense Type',
			dataIndex: 'type',
			key: 'type',
			align: 'left'
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			align: 'left'
		},
		{
			title: 'Payee',
			dataIndex: 'payee',
			key: 'payee',
			align: 'left'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'left',
			render: (r) => (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: r === 'pending' ? '1px solid #fed701' : '1px solid #3ae038',
						borderRadius: '5px',
						padding: '5px'
					}}
				>
					<p style={{ margin: '0', color: r === 'pending' ? '#fed701' : '#3ae038' }}>{r}</p>
				</div>
			)
		},
		{
			title: 'Acknowledgment',
			dataIndex: 'acknowledgment',
			key: 'acknowledgment',
			align: 'left',
			render: (r) => (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: r === 'Not Received' ? '1px solid #f5365c' : '1px solid #3ae038',
						borderRadius: '5px',
						padding: '5px'
					}}
				>
					<p style={{ margin: '0', color: r === 'Not Received' ? '#f5365c' : '#3ae038' }}>{r}</p>
				</div>
			)
		}
	];
	return (
		<div className="cashrequest-main">
			{open ? (
				<ModalUI>
					<div className="receipt-modal-container">
						<div className="receipt-modal-header-row">
							<div className="receipt-button-row">
								<button>Request Approval</button>
								<DownloadIcon className="content-icon" style={{ fontSize: '25px' }} />
								<PrintIcon className="content-icon" style={{ fontSize: '25px' }} />
								<CloseIcon
									className="content-icon"
									style={{ fontSize: '25px' }}
									onClick={() => setOpen(false)}
								/>
							</div>
						</div>
						<div className="receipt-container">
							<div className="receipt-header">
								<h1>Cash Request Receipt</h1>
								<div className="modaltxt-row1">
									<h4>Date:</h4>
									<h3>2022-10-19</h3>
								</div>
								<div className="modaltxt-row1">
									<h4>Ref No. :</h4>
									<h3>CR0978695</h3>
								</div>
							</div>
							<div className="receipt-modal-row">
								<div className="modaltxt-row2">
									<h4>Received from: </h4>
									<h3>Kalema Stuart</h3>
								</div>
								<div className="modaltxt-row2">
									<h4>Amount: </h4>
									<h2>500000</h2>
								</div>
							</div>
							<div className="receipt-modal-row">
								<div className="modaltxt-row2">
									<h4>For Payment of: </h4>
									<h3>Consultancy fee</h3>
								</div>
								<div className="modaltxt-row2">
									<h4>Payment Method: </h4>
									<h3>Mobile money</h3>
								</div>
							</div>
							<div className="receipt-modal-row">
								<div className="modaltxt-row2">
									<h4>Received by: </h4>
									<h3>Kalema Stuart</h3>
								</div>
								<div className="modaltxt-row2">
									<h4>Paid by: </h4>
									<h3>John Doe</h3>
								</div>
							</div>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="cashrequest-content">
				<div className="content-header">
					<h2>CashRequest Request</h2>
					<div className="admin-header-buttons">
						<DownloadIcon className="content-icon" style={{ fontSize: '25px' }} />
						<PrintIcon className="content-icon" style={{ fontSize: '25px' }} />
					</div>
				</div>
				<div className="search-row">
					<input placeholder="search requests" />
				</div>
				<Table
					columns={columns}
					style={{ width: '100%' }}
					dataSource={[
						...data.map((r) => ({
							...r,
							key: r.refNo,
							reference: r.refNo,
							date: r.date,
							type: r.expenseType,
							amount: r.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
							payee: r.payee,
							status: r.status,
							acknowledgment: r.acknowledgment
						}))
					]}
					pagination={{
						defaultPageSize: 5,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
					onRow={(record, rowIndex) => {
						return {
							onClick: () => {
								setOpen(true);
							}
						};
					}}
				/>
			</div>
		</div>
	);
};
export default ApproveRequests;
