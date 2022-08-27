import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Table } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import './revenues.css';
const Revenues = () => {
	const { revenue_tracking } = useSelector((state) => state.admin);

	const dispatch = useDispatch();
	useEffect(() => {
		getRevenue();
	}, []);
	const getRevenue = () => dispatch(actionCreators.getRevenueTracking());

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
			<div className="rev">
				<Table
					columns={columns}
					dataSource={[
						...revenue_tracking.map((r) => ({
							...r,
							key: r.id,
							startup: r.startup,
							jan: r.jan
						}))
					]}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}
					pagination={{
						defaultPageSize: 10,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
				/>
			</div>
		</div>
	);
};

export default Revenues;
