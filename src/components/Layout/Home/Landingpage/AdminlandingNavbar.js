import React from 'react';
import { withRouter } from 'react-router-dom';

const AdminlandingNavbar = (props) => {
	return (
		<div className="admin-landing-navbar-container">
			<div className="admin-landing-navbar-main">
				<div className="admin-landing-navbar-links">
					<button onClick={() => props.history.push('./overview')}>Startups</button>
					<button onClick={() => props.history.push('/okr-overview')}>Overview</button>
					{/* <button onClick={() => props.history.push('/loans')}>Investments</button> */}
					<button onClick={() => props.history.push('/user-activity')}>User Activity</button>
					<button onClick={() => props.setVisible(true)}>Post Blog</button>
				</div>
			</div>
		</div>
	);
};

export default withRouter(AdminlandingNavbar);
