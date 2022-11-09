import React from 'react';
import { Table } from 'antd';
import ModalUI from '../ModalUI/index';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';

const CashRequest = () => {
	const [ open, setOpen ] = React.useState(false);
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
			align: 'left'
		},
		{
			title: 'Acknowledgment',
			dataIndex: 'acknowledgment',
			key: 'acknowledgment',
			align: 'left'
		}
	];

	const InputRow = ({
		placeholder1,
		placeholder2,
		label1,
		label2,
		type,
		inputType1,
		inputType2,
		options1,
		options2
	}) => {
		return (
			<div className="modal-content-row">
				<div className="input-column">
					<h4>{label1}</h4>
					{inputType1 === 'input' ? (
						<input placeholder={placeholder1} required />
					) : (
						<select required>
							<option value="" disabled selected>
								{placeholder1}
							</option>
							{options1.map((o) => <option>{o}</option>)}
						</select>
					)}
				</div>
				<div className="input-column">
					<h4>{label2}</h4>
					{inputType2 === 'input' ? (
						<input type={type} required />
					) : (
						<select required>
							<option value="" disabled selected>
								{placeholder2}
							</option>
							{options2.map((o) => <option>{o}</option>)}
						</select>
					)}
				</div>
			</div>
		);
	};
	return (
		<div className="cashrequest-main">
			{open ? (
				<ModalUI>
					<div className="cashrequest-modal">
						<div className="content-header">
							<h3>Make request</h3>
							<CloseIcon
								className="content-icon"
								style={{ fontSize: '25px' }}
								onClick={() => setOpen(false)}
							/>
						</div>
						<div className="modal-content ">
							<InputRow
								placeholder1="Enter Amount"
								label1="Amount"
								label2="Date"
								type="date"
								inputType1="input"
								inputType2="input"
							/>
							<InputRow
								type="date"
								placeholder1="Select Currency"
								placeholder2="Select Branch"
								label1="Currency"
								label2="Branch"
								options1={[ 'UGX', 'USD' ]}
								options2={[ 'Kampala', 'Tanzania' ]}
							/>
							<InputRow
								type="date"
								placeholder1="Select Expense Type"
								placeholder2="Select Department"
								label1="Expense Type"
								label2="Department"
								options1={[
									'Meals',
									'Training Fees',
									'Loans, Transport',
									'Airtime',
									' Consultancy Fees',
									'Internet',
									'Printing & Staionary',
									'Salary Advance',
									'Catalyzer Investment',
									'Ambassador Compensation'
								]}
								options2={[
									'Starthub-Catalyzer',
									'Starthub-Launch Pad',
									'Starthub-Consultancy',
									'Starthub-General'
								]}
							/>
							<textarea placeholder="Enter description" />
							<button>Make Request</button>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="cashrequest-content">
				<div className="content-header">
					<h2>CashRequest Request</h2>
					<div className="header-buttons">
						<button onClick={() => setOpen(true)}>New Request</button>
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
export default CashRequest;
