import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import * as actionCreators from '../../../../store/actionCreators';
import CloseIcon from '@mui/icons-material/Close';
import ModalUI from '../../../../ModalUI';
import Overview from './Overview';
import RevenueShare from './RevenueShare';
import RevenueAccumulation from './RevenueAccumulation';

import './revenues.css';

const { TabPane } = Tabs;

const Revenues = () => {
	// const year = rev_tracking.slice(-1).pop().year;

	const dispatch = useDispatch();
	useEffect(() => {
		getRevenue();
		getRevShares();
		getRevenueAccumulation();
	}, []);
	const getRevenue = () => dispatch(actionCreators.getRevenueTracking());
	const getRevShares = () => dispatch(actionCreators.getRevenueShares());
	const getRevenueAccumulation = () => dispatch(actionCreators.getRevenueAccumulation());

	return (
		<div className="rev-main">
			<div className="rev">
				<Tabs
					style={{ marginTop: '3rem', width: '100%' }}
					defaultActiveKey="1"
					centered
					tabBarStyle={{ color: '#dfa126' }}
				>
					<TabPane tab="Overview" key="1">
						<Overview />
					</TabPane>
					<TabPane tab="Revenue Share" key="2">
						<RevenueShare />
					</TabPane>
					<TabPane tab="Revenue Accumulation" key="3">
						<RevenueAccumulation />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default Revenues;
