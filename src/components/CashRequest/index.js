import React, { useState } from 'react';
import cr1 from '../../assets/images/cr2.png';
import CashRequest from './CashRequest';
import Requests from './Requests';
import Dashboard from './Dashboard';
import ApproveRequests from './ApproveRequests';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AssignmentIcon from '@mui/icons-material/Assignment';

import './CashRequest.css';
const CashRequestHome = () => {
	const [ index, setIndex ] = useState(0);
	const [ active, setActive ] = React.useState({
		actionObject: null,
		objects: [
			{
				title: 'Cash Request',
				icon: <PaymentIcon style={{ fontSize: '25px' }} className="link-icon" />
			},
			{
				title: 'Requests',
				icon: <HistoryIcon style={{ fontSize: '25px' }} className="link-icon" />
			}
		]
	});
	const [ admin, setAdmin ] = React.useState({
		actionObject: null,
		objects: [
			{
				title: 'Dashboard',
				icon: <ColorLensIcon style={{ fontSize: '25px' }} className="link-icon" />
			},
			{
				title: 'Requests',
				icon: <AssignmentIcon style={{ fontSize: '25px' }} className="link-icon" />
			}
		]
	});

	const toggleActive = (index) => {
		setActive({ ...active, actionObject: active.objects[index] });
	};

	const toggleActiveStyle = (index) => {
		if (active.objects[index] === active.actionObject) {
			return 'link active';
		} else {
			return 'link inactive';
		}
	};

	const toggleAdminActive = (index) => {
		setAdmin({ ...admin, actionObject: admin.objects[index] });
	};

	const toggleAdminActiveStyle = (index) => {
		if (admin.objects[index] === admin.actionObject) {
			return 'link active';
		} else {
			return 'link inactive';
		}
	};

	return (
		<div className="cashrequest-container">
			<div className="cashrequest-sidebar">
				<div className="avatar">
					<img src={cr1} alt="logo" />
				</div>
				<div className="separator" />
				{admin.objects.map((e, index) => (
					<div
						key={index}
						className={toggleActiveStyle(index)}
						onClick={() => {
							toggleActive(index);
							setIndex(index);
						}}
					>
						<div className="link-row">
							{e.icon}
							<h4>{e.title}</h4>
						</div>
					</div>
				))}
				{/* {active.objects.map((e, index) => (
					<div
						key={index}
						className={toggleActiveStyle(index)}
						onClick={() => {
							toggleActive(index);
							setIndex(index);
						}}
					>
						<div className="link-row">
							{e.icon}
							<h4>{e.title}</h4>
						</div>
					</div>
				))} */}
			</div>
			<div className="cashrequest-main">
				{index === 0 ? <Dashboard /> : null}
				{index === 1 ? <ApproveRequests /> : null}
			</div>
		</div>
	);
};
export default CashRequestHome;
