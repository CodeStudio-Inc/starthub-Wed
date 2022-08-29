import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Table } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import ModalUI from '../../../../ModalUI';

import './revenues.css';
const Revenues = () => {
	const [ open, setOpen ] = useState(false);
	const [ record, setRecord ] = useState([]);
	const [ state, setState ] = useState({
		year: ''
	});
	const { revenue_tracking, loading } = useSelector((state) => state.admin);

	const rev_tracking = revenue_tracking && revenue_tracking;

	const dispatch = useDispatch();
	useEffect(() => {
		getRevenue();
	}, []);
	const getRevenue = () => dispatch(actionCreators.getRevenueTracking());

	const columnz = [
		{
			title: 'Monthly Revenue(UGX)',
			dataIndex: 'revenue',
			key: 'revenue',
			align: 'left'
		},
		{
			title: 'Monthly Expense(UGX)',
			dataIndex: 'expense',
			key: 'expense',
			align: 'left'
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		}
	];
	const columns = [
		{
			title: 'Startup',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'January',
			dataIndex: 'jan',
			key: 'jan',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Feburary',
			dataIndex: 'feb',
			key: 'feb',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'March',
			dataIndex: 'mar',
			key: 'mar',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'April',
			dataIndex: 'apr',
			key: 'apr',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'May',
			dataIndex: 'may',
			key: 'may',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'June',
			dataIndex: 'jun',
			key: 'jun',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'July',
			dataIndex: 'jul',
			key: 'jul',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'August',
			dataIndex: 'aug',
			key: 'aug',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'September',
			dataIndex: 'sep',
			key: 'sep',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'October',
			dataIndex: 'oct',
			key: 'oct',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'November',
			dataIndex: 'nov',
			key: 'nov',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		},
		{
			title: 'December',
			dataIndex: 'dec',
			key: 'dec',
			align: 'left',
			render: (r) => (
				<span>
					{r === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '30px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '30px' }} />
					)}
				</span>
			)
		}
	];

	return (
		<div className="rev-main">
			{open ? (
				<ModalUI>
					<div className="rev-modal-container">
						<div className="rev-modal-header">
							<CloseIcon
								className="rev-modal-icon"
								onClick={() => setOpen(false)}
								style={{ fontSize: '20px', color: 'rgba(0,0,0, 0.3)' }}
							/>
						</div>
						<div className="rev-modal-content">
							<Table
								columns={columnz}
								dataSource={[
									...record.map((r) => ({
										...r,
										key: r.id,
										revenue: r.month_revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
										expense: r.month_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
										date: r.date
									}))
								]}
								style={{ width: '100%' }}
								pagination={{
									defaultPageSize: 5,
									showSizeChanger: true,
									pageSizeOptions: [ '10', '20', '30' ]
								}}
							/>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="rev">
				<div className="rev-table-header">
					<h2>Revenue Submission Tracking</h2>
					<input
						value={state.year}
						onChange={(e) => setState({ ...state, year: e.target.value })}
						placeholder="search year"
						onKeyUp={(e) => {
							if (e.key === 'Enter' && state.year) {
								dispatch(actionCreators.searchRevenueTracking(state.year));
							}
						}}
					/>
				</div>
				<Table
					columns={columns}
					dataSource={[
						...rev_tracking.map((r) => ({
							...r,
							key: r.id,
							startup: r.startup,
							jan: r.jan
						}))
					]}
					onRow={(record, rowIndex) => {
						return {
							onClick: () => {
								dispatch(
									actionCreators.getStartupRevenueTracking(record.creator, record.year, (res) => {
										if (res.success) {
											setRecord(res.res.data.revenue);
											setOpen(true);
										}
									})
								);
							}
						};
					}}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}
					pagination={{
						defaultPageSize: 8,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
					loading={loading ? true : false}
				/>
			</div>
		</div>
	);
};

export default Revenues;
