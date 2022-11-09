import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import { actionCreators } from '../../Paths';
import { Overview, RevenueShare, RevenueAccumulation } from '../../Paths';

import './RevenueStyles.css';
const { TabPane } = Tabs;
const Revenues = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		getRevenue();
		getRevShares();
		getRevenueAccumulation();
	}, []);

	const getRevenue = () => dispatch(actionCreators.getRevenueTracking());
	const getRevShares = () => dispatch(actionCreators.getRevenueShares());
	const getRevenueAccumulation = () => dispatch(actionCreators.getRevenueAccumulation());

	return (
		<div className="revenue-container">
			<Tabs
				style={{ marginTop: '3rem', width: '90%' }}
				defaultActiveKey="1"
				centered
				tabBarStyle={{ color: '#37561b' }}
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
	);
};
export default withRouter(Revenues);
