import React from 'react';
import { InlineWidget } from 'react-calendly';
import { withRouter } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import './Carlender.css';
const TimothySchedule = (props) => {
	return (
		<div className="calendar-container">
			<div className="calendar-container-row" onClick={() => props.history.goBack()}>
				<KeyboardBackspaceIcon
					style={{ fontSize: '25px', color: '#37561b' }}
					onClick={() => props.history.goBack()}
				/>
				<h5 onClick={() => props.history.goBack()}>Back</h5>
			</div>
			<InlineWidget styles={{ width: '90%', height: '90vh' }} url="https://calendly.com/t-maenda" />
		</div>
	);
};

export default withRouter(TimothySchedule);
