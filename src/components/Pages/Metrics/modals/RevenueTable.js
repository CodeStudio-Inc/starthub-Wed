import React from 'react';
import { Table } from 'antd';
import CloseIcon from '@mui/icons-material/Close';

const RevenueTable = ({ revenue, columns, setOpen, svg, loader, actionCreators, dispatch, userId, revenueTotal }) => {
	const [ year, setYear ] = React.useState('');

	const searchRevenue = () => {
		if (userId) return dispatch(actionCreators.filterAminRevenue(userId, year));
		dispatch(actionCreators.filterStartupRevenue(year));
	};
	return (
		<div className="report-modal-container">
			<div className="report-container-header">
				<CloseIcon
					onClick={() => setOpen(false)}
					className="report-icon"
					style={{ color: 'rgba(0,0,0,0.3)' }}
				/>
			</div>
			<div className="search-box-row">
				<input placeholder="year" value={year} onChange={(e) => setYear(e.target.value)} />
				<button style={{ color: '#fff' }} onClick={searchRevenue}>
					search
				</button>
				{loader ? <img src={svg} style={{ height: '30px', width: '30px' }} /> : null}
			</div>
			<div className="report-container-content">
				<div className="rev-total">
					<h4>
						Total Revenue Reported{' '}
						<strong style={{ color: '#dfa126', fontSize: '18px', marginBottom: '1 rem' }}>
							{revenueTotal.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Shs
						</strong>
					</h4>
					<h4>
						Total Expenses Reported{' '}
						<strong style={{ color: '#dfa126', fontSize: '18px', marginBottom: '1 rem' }}>
							{revenueTotal.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Shs
						</strong>
					</h4>
				</div>
				<Table
					columns={columns}
					dataSource={[
						...revenue.map((r) => ({
							...r,
							key: r._id,
							date: r.date,
							revenue: r.month_revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
							expense: r.month_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
							expectedRevsharePayment: Math.round(r.expectedRevsharePayment)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
