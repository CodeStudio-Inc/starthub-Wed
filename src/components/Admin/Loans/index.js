import React from 'react';
import { Table, Tabs } from 'antd';
import SearchIcon from '@mui/icons-material/Search';

import './LoanStyles.css';
const Loans = () => {
	const { TabPane } = Tabs;

	const columns = [
		{
			title: 'Startup',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Loan Amount',
			dataIndex: 'amount',
			key: 'amount',
			align: 'left'
		},
		{
			title: 'Interest',
			dataIndex: 'interest',
			key: 'interest',
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
		<div className="loans-container">
			<div className="loans-header-row">
				<div className="search">
					<SearchIcon style={{ fontSize: '20px', color: 'rgba(0,0,0,0.2)' }} />
					<input placeholder="search loans" />
				</div>
			</div>
			<Tabs style={{ width: '100%' }} defaultActiveKey="1" centered tabBarStyle={{ color: '#37561b' }}>
				<TabPane tab="Applications" key="1" className="graph-tab-content">
					<Table
						columns={columns}
						style={{ width: '90%' }}
						pagination={{
							defaultPageSize: 9,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
					/>
				</TabPane>
				<TabPane tab="Paid" key="2" className="graph-tab-content">
					<Table
						columns={columns}
						style={{ width: '90%' }}
						pagination={{
							defaultPageSize: 9,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};
export default Loans;
