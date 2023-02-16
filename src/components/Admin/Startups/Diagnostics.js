import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const Diagnostics = ({ teams, vision, proposition, product, market, business, investment }) => {
	const diagnostics = [
		{
			label: 'Teams',
			progress: teams
		},
		{
			label: 'Vision',
			progress: vision
		},
		{
			label: 'Proposition',
			progress: proposition
		},
		{
			label: 'product',
			progress: product
		},
		{
			label: 'Market',
			progress: market
		},
		{
			label: 'Business',
			progress: business
		},
		{
			label: 'Investment',
			progress: investment
		}
	];
	return (
		<div className="diagonistics">
			<h2>Diagnostics</h2>
			{diagnostics.map((d) => (
				<div className="diagonistics-row">
					<div className="progress-bar-label">
						<h4>{d.label}</h4>
					</div>
					<div className="progress-bar">
						<Box sx={{ width: '80%' }}>
							<LinearProgress variant="determinate" value={d.progress} color="success" />
						</Box>
					</div>
					<div className="progress-bar-percentage">
						<h5>{d.progress}%</h5>
					</div>
				</div>
			))}
		</div>
	);
};
export default Diagnostics;
