import React from 'react';

const Card = ({ icon, label, amount }) => {
	return (
		<div className="Admin-card">
			<div className="Admin-content-row-avatar">{icon}</div>
			<div className="Admin-content-column">
				<h1>
					{amount} {typeof amount === 'number' ? 'Startups' : 'Shs'}
				</h1>
				<h3>{label}</h3>
			</div>
		</div>
	);
};

export default Card;
