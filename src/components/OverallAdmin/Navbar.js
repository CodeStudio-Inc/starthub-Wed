import React from 'react';
import { logo } from '../Paths';

import './Styles.css';
const Navbar = () => {
	return (
		<div className="Navbar-container">
			<div className="Navbar-content">
				<img src={logo} className="logo" />
				<div className="Navbar-links">
					<h4>Dashboard</h4>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
