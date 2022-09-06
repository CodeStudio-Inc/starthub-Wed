import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Table } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import ModalUI from '../../../../ModalUI';

import './revenues.css';
const Revenues = () => {
	const [ open, setOpen ] = useState(false);
	const [ record, setRecord ] = useState([]);
	const [ state, setState ] = useState({
		year: ''
	});
	const { revenue_tracking, loading } = useSelector((state) => state.admin);
	console.log(revenue_tracking);
	const rev_tracking = revenue_tracking && revenue_tracking;

	const year = rev_tracking.slice(-1).pop().year;

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
			title: 'Jan',
			dataIndex: 'jan',
			key: 'jan',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Feb',
			dataIndex: 'feb',
			key: 'feb',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Mar',
			dataIndex: 'mar',
			key: 'mar',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Apr',
			dataIndex: 'apr',
			key: 'apr',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
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
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Jun',
			dataIndex: 'jun',
			key: 'jun',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Jul',
			dataIndex: 'jul',
			key: 'jul',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Aug',
			dataIndex: 'aug',
			key: 'aug',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Sep',
			dataIndex: 'sep',
			key: 'sep',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Oct',
			dataIndex: 'oct',
			key: 'oct',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Nov',
			dataIndex: 'nov',
			key: 'nov',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#dc4638e4', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
				</span>
			)
		},
		{
			title: 'Dec',
			dataIndex: 'dec',
			key: 'dec',
			align: 'left',
			render: (r) => (
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{r.report === false ? (
						<CancelIcon style={{ color: '#DB4437', fontSize: '25px' }} />
					) : (
						<CheckCircleIcon style={{ color: '#039487', fontSize: '25px' }} />
					)}
					{r.pay === false ? (
						<AttachMoneyIcon style={{ color: '#DB4437', fontSize: '25px' }} />
					) : (
						<PaidIcon style={{ color: '#039487', fontSize: '25px' }} />
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
					<h2>Revenue Reporting & Payment Overview-{year}</h2>
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
							jan: r.jan,
							feb: r.feb,
							mar: r.mar,
							apr: r.apr,
							may: r.may,
							jun: r.jun,
							jul: r.jul,
							aug: r.aug,
							sep: r.sep,
							oct: r.oct,
							nov: r.nov,
							dec: r.dec
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
					style={{ width: '90%' }}
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
