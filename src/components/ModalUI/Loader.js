import React from 'react';

import './Styles.css';
const Loader = (props) => {
	return (
		<div className="loader-container">
			<div className="loader-inner-container">{props.children}</div>
		</div>
	);
};

export default Loader;
