import React from 'react';
import { Table } from 'antd';

const Requests = () => {
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
			<div className="cashrequest-content">
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
				/>
			</div>
		</div>
	);
};
export default Requests;
