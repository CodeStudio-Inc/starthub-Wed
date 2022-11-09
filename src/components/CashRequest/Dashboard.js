import React from 'react';
import { Line } from 'react-chartjs-2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Requests = () => {
	const data = [
		{
			type: 'Cash',
			amount: 230000,
			icon: <AssignmentIcon style={{ fontSize: '25px', color: '#fff' }} className="link-icon" />,
			total: 8,
			style: 'icon-avatar-total'
		},
		{
			type: 'Pending',
			amount: 100000,
			icon: <PendingActionsIcon style={{ fontSize: '25px', color: '#fff' }} className="link-icon" />,
			total: 2,
			style: 'icon-avatar-pending'
		},
		{
			type: 'Approved',
			amount: 130000,
			icon: <AssignmentTurnedInIcon style={{ fontSize: '25px', color: '#fff' }} className="link-icon" />,
			total: 6,
			style: 'icon-avatar-approved'
		}
	];

	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	const requestData = [
		'300000',
		'200000',
		'65000',
		'100000',
		'789000',
		'234000',
		'1005000',
		'2500000',
		'340000',
		'500000',
		'904000',
		'430000'
	];

	const requests = {
		labels: months,
		datasets: [
			{
				label: 'Monthly Cash Requests Total',
				backgroundColor: '#28282B',
				background: '#28282B',
				borderColor: '#28282B',
				borderWidth: 1,
				data: requestData
			}
		]
	};

	return (
		<div className="cashrequest-main">
			<div className="dashboard-row">
				{data.map((d) => (
					<div className="dashboard-stats">
						<div className="dashboard-stats-row">
							<div className="dashboard-stats-column">
								<h4>{d.type} Requests</h4>
								<h1>{d.amount}</h1>
							</div>
							<div className={d.style}>{d.icon}</div>
						</div>
						<h5>
							{d.total} Total {d.type} requests
						</h5>
					</div>
				))}
			</div>
			<Line data={requests} width={100} height={30} />
		</div>
	);
};
export default Requests;
