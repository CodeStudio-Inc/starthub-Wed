import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { OverallAdmin } from '../Paths';

const AdminRoutes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/admin-dashboard" component={OverallAdmin} />
			</Switch>
		</BrowserRouter>
	);
};

export default AdminRoutes;
