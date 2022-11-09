import React from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router-dom';

import './Carlender.css';
const Calendar = (props) => {
	console.log(props);
	React.useEffect(() => {
		ReactGA.pageview(window.location.pathname);
	}, []);

	const handleMathiusNavigation = () => {
		props.history.push('/mathius');
	};

	const handleTimothyNavigation = () => {
		props.history.push('/Timmm');
	};

	const handleBonitaNavigation = () => {
		props.history.push('/bonita');
	};

	return (
		<div className="calendar-container ">
			<h2>Schedule Meetings with Mentors</h2>
			<h3>You can also schedule meetings with the entire Team</h3>
			<div className="schedule-card-row">
				<div className="schedule-card" onClick={handleMathiusNavigation}>
					<img
						src="https://res.cloudinary.com/starthub-africa/image/upload/v1655554365/tyyri9kgnnc6hjafgrfn.png"
						loading="lazy"
					/>
					<div className="schedule-card-column">
						<h3>Mathius Mobius</h3>
						<p>StartHub Africa Catalyzer Mentor</p>
						<button onClick={handleMathiusNavigation}>Schedule Meeting</button>
					</div>
				</div>
				<div className="schedule-card" onClick={handleTimothyNavigation}>
					<img
						src="https://res.cloudinary.com/starthub-africa/image/upload/v1655554391/iwvwqdymmkwia9opvbnx.png"
						loading="lazy"
					/>
					<div className="schedule-card-column">
						<h3>Timothy Maenda</h3>
						<p>StartHub Africa Catalyzer Mentor</p>
						<button onClick={handleTimothyNavigation}>Schedule Meeting</button>
					</div>
				</div>
				<div className="schedule-card" onClick={handleBonitaNavigation}>
					<img
						src="https://res.cloudinary.com/starthub-africa/image/upload/v1655135075/bonita_mpbhl2.png"
						loading="lazy"
					/>
					<div className="schedule-card-column">
						<h3>Nanziri Bonita</h3>
						<p>StartHub Africa Catalyzer Mentor</p>
						<button onClick={handleBonitaNavigation}>Schedule Meeting</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Calendar);
