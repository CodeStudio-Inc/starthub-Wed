import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import { actionCreators } from '../../Paths';
import { Overview, RevenueShare, RevenueAccumulation } from '../../Paths';
import { Helmet } from 'react-helmet';

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
			<Helmet>
				<title>Revenue Reporting Overview</title>
			</Helmet>
			<Overview />
		</div>
	);
};
export default withRouter(Revenues);
