import React from 'react';
import { useSelector } from 'react-redux';
import HomeRoutes from './HomeRoutes';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';

const Navigation = () => {
	const auth = useSelector((state) => state.auth.authenticated);
	// let auth;

	return (
		<div>
			{!auth && <AuthRoutes />}
			{auth && <DashboardRoutes />}
		</div>
	);
};

export default Navigation;
