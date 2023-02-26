import React from 'react';

import './Styles.css';
const index = (props) => {
	return (
		<div className="modal-container">
			<div className="modal-inner-container">{props.children}</div>
			<div className="modal-overlay" onClick={() => props.setClose(false)} />
		</div>
	);
};

export default index;
