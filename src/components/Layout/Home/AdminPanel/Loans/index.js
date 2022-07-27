import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import Flatrate from './Flatrate';
import RevenueShare from './RevenueShare';
import ReducingBalance from './ReducingBalance';
import ModalUI from '../../../../ModalUI';
import * as actionCreators from '../../../../store/actionCreators';

const { TabPane } = Tabs;

const Loans = (props) => {
	const [ expireTime, setexpireTime ] = useState(false);

	const expire = useSelector((state) => state.auth.tokenExpiration);
	const loans = useSelector((state) => state.admin.loans);
	const rb_loans = useSelector((state) => state.admin.rb_loans);

	const _loans = loans && loans;
	const __loans = rb_loans && rb_loans;

	const dispatch = useDispatch();

	const current_date = Date.now();

	const getLoans = () => dispatch(actionCreators.getFlate());
	const getRBLoans = () => dispatch(actionCreators.getReducingBalance());
	const getRevShares = () => dispatch(actionCreators.getRevenueShares());

	const handleLogoutClick = () => {
		dispatch(actionCreators.removeUser());
		props.history.push('/');
	};

	useEffect(() => {
		if (current_date >= expire) {
			return setexpireTime(true);
		}
		getLoans();
		getRBLoans();
		getRevShares();
	}, []);

	return (
		<div className="loan-tab-container">
			{expireTime ? (
				<ModalUI>
					<div className="edit-card">
						<h5>Session timeout please login again</h5>
						<button className="session-timeout" onClick={handleLogoutClick}>
							Login
						</button>
					</div>
				</ModalUI>
			) : null}
			<div className="loan-tab-menu">
				<Tabs
					style={{ width: '100%', overflowY: 'scroll', height: '100vh' }}
					defaultActiveKey="1"
					centered
					tabBarStyle={{ color: '#dfa126' }}
				>
					<TabPane tab="Flate Rate" key="1">
						<Flatrate props={props} loans={_loans} />
					</TabPane>
					<TabPane tab="Reducing Balance" key="2">
						<ReducingBalance props={props} loans={__loans} />
					</TabPane>
					<TabPane tab="Revenue Payments" key="3">
						<RevenueShare />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default Loans;
