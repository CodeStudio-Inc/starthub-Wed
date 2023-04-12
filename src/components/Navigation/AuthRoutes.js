import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Auth/';
import CashRequest from '../CashRequest';
import { OverallAdmin } from '../Paths';

const AuthRoutes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/request-cash" component={CashRequest} />
			</Switch>
		</BrowserRouter>
	);
};

export default AuthRoutes;
