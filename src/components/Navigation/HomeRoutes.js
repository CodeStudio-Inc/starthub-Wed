import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Layout/Home/Home'
import Carlender from '../Layout/Carlender'
import AndrewSchedule from '../Layout/Carlender/AndrewSchedule'
import MathiusSchedule from '../Layout/Carlender/MathiusSchedule'
import TimothySchedule from '../Layout/Carlender/TimothySchedule'
import Dashboard from '../Layout/Dashboard'
import CanvasHome from '../Layout/Canvas'
import Diagnostics from '../Layout/Diagnostics'
import Register from '../Layout/Admin/Register'
import Navbar from './Navbar'
import LandingPage from '../Layout/Home/Landingpage'
import AdminPanel from '../Layout/Home/AdminPanel'
import AdminCanvas from '../Layout/Home/AdminPanel/AdminCanvas'
import AdminMetrics from '../Layout/Home/AdminPanel/AdminMetrics'
import Loans from '../Layout/Home/AdminPanel/Loans'
import RevenueShare from '../Layout/Home/AdminPanel/RevenueShare'

const HomeRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/admin" component={AdminPanel} />
                <Route path="/admin-canvas" component={AdminCanvas} />
                <Route path="/admin-metrics" component={AdminMetrics} />
                <Route path="/home" component={Home} />
                <Route path="/andrew-schedule" component={AndrewSchedule} />
                <Route path="/mathius-schedule" component={MathiusSchedule} />
                <Route path="/timothy-schedule" component={TimothySchedule} />
                <Route path="/overview" component={Dashboard} />
                <Route path="/carlender" component={Carlender} />
                <Route path="/canvas-board" component={CanvasHome} />
                <Route path="/diagnostics" component={Diagnostics} />
                <Route path="/register" component={Register} />
                <Route path="/loans" component={Loans} />
                <Route path="/revenue-share" component={RevenueShare} />
            </Switch>
        </BrowserRouter>
    )
}

export default HomeRoutes
