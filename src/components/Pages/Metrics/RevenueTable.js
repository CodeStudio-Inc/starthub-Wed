import React from 'react';
import { Table } from 'antd';
import CloseIcon from '@mui/icons-material/Close';

const RevenueTable = ({ revenue, columns, setOpen }) => {
	return (
		<div className="report-modal-container">
			<div className="report-container-header">
				<CloseIcon
					onClick={() => setOpen(false)}
					className="report-icon"
					style={{ color: 'rgba(0,0,0,0.3)' }}
				/>
			</div>
			<div className="report-container-content">
				<Table
					columns={columns}
					dataSource={[
						...revenue.map((r) => ({
							...r,
							key: r._id,
							revenue: r.month_revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
							expense: r.month_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
							date: r.date
						}))
					]}
					style={{ width: '100%' }}
					pagination={{
						defaultPageSize: 8,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
				/>
			</div>
		</div>
	);
};
export default RevenueTable;
