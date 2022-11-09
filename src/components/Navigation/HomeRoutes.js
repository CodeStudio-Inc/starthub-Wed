import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../Layout/Home/Home';
import Carlender from '../Pages/Carlender';
import AndrewSchedule from '../Pages/Carlender/BonitaSchedule';
import MathiusSchedule from '../Pages/Carlender/MathiusSchedule';
import TimothySchedule from '../Pages/Carlender/TimothySchedule';
import Dashboard from '../Layout/Dashboard';
import CanvasHome from '../Layout/Canvas';
import Diagnostics from '../Pages/Diagnostics';
import Navbar from './Navbar';
import Topnavbar from './Top-navbar';
import LandingPage from '../Layout/Home/Landingpage';
import AdminPanel from '../Layout/Home/AdminPanel';
import AdminCanvas from '../Layout/Home/AdminPanel/AdminCanvas';
import AdminMetrics from '../Layout/Home/AdminPanel/AdminMetrics';
import Loans from '../Layout/Home/AdminPanel/Loans';
import FlatrateLoanDetails from '../Layout/Home/AdminPanel/Loans/FlaterateLoanDetails';
import RBLoanDetails from '../Layout/Home/AdminPanel/Loans/RBLoanDetails';
import Content from '../Layout/Content';
import UserActivity from '../Layout/Home/AdminPanel/UserActivity';
import Revenues from '../Layout/Home/AdminPanel/Revenues';
import Overview from '../Layout/Home/AdminPanel/Overview';

const HomeRoutes = () => {
	return (
		<BrowserRouter>
			{/* <Topnavbar /> */}
			{/* <Navbar /> */}
			<Switch />
		</BrowserRouter>
	);
};

export default HomeRoutes;
