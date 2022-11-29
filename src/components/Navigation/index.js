import React from 'react';
import { useSelector } from 'react-redux';
import HomeRoutes from './HomeRoutes';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';
import { Error } from '../Paths';

import './Navigation.css';
const Navigation = () => {
	const [ error, setError ] = React.useState(false);
	const auth = useSelector((state) => state.auth.authenticated);

	React.useEffect(() => {
		if (!window.navigator.onLine) {
			setError(true);
		}
		window.addEventListener('click', () => {
			setError(false);
		});
	}, []);
	return (
		<div className="navigation-main">
			{error ? <Error /> : null}
			{!auth && <AuthRoutes />}
			{auth && <DashboardRoutes />}
		</div>
	);
};

export default Navigation;
