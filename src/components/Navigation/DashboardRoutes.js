import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
	HomepageTemplate,
	BonitaSchedule,
	TimothySchedule,
	MathiusSchedule,
	Startup,
	AdminLeanCanvas,
	ObjectivesTable
} from '../Paths';

const DashboardRoutes = () => {
	let url;
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={HomepageTemplate} />
				<Route path="/Bonita" component={BonitaSchedule} />
				<Route path="/Timmm" component={TimothySchedule} />
				<Route path="/Mathius" component={MathiusSchedule} />
				<Route path="/startup/:id" component={Startup} />
				<Route path="/lean-canvas/:id" component={AdminLeanCanvas} />
				<Route path="/okrs/:id" component={ObjectivesTable} />
			</Switch>
		</BrowserRouter>
	);
};

export default DashboardRoutes;
