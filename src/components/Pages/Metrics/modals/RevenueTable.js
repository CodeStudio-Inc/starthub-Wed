import React from 'react';
import { Table } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const RevenueTable = ({
	revenue,
	columns,
	setOpen,
	svg,
	tableRef,
	username,
	actionCreators,
	dispatch,
	userId,
	revenueTotal
}) => {
	const [ year, setYear ] = React.useState('');

	const searchRevenue = () => {
		if (!year) return;
		if (userId) return dispatch(actionCreators.searchRevenueTracking(userId, year));
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
			<div className="report-container-filter-row">
				<div className="export-container">
					<DownloadTableExcel
						filename={username + ' ' + revenueTotal.year + ' ' + 'Revenue Records'}
						sheet={username + ' ' + revenueTotal.year + ' ' + 'Revenue Records'}
						currentTableRef={tableRef.current}
					>
						<button> Generate excel sheet </button>
					</DownloadTableExcel>
				</div>
				<div className="search-box-row">
					<input placeholder="year" value={year} onChange={(e) => setYear(e.target.value)} />
					<button style={{ color: '#fff' }} onClick={searchRevenue}>
						search
					</button>
				</div>
			</div>
			<div className="report-container-content">
				<div className="rev-total">
					<h4>
						Year{' '}
						<strong style={{ color: '#dfa126', fontSize: '18px', marginBottom: '1 rem' }}>
							{revenueTotal.year}
						</strong>
					</h4>
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
					ref={tableRef}
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
						defaultPageSize: 6,
						showSizeChanger: true,
						pageSizeOptions: [ '3', '6', '9', '12' ]
					}}
				/>
			</div>
		</div>
	);
};
export default RevenueTable;
