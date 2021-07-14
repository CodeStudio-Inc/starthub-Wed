import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Layout/Home/Home'
import Cards from '../Layout/Home/Card'
import Canvas from '../Layout/Canvas/Canvas'
import Milestones from '../Layout/Milestones/Milestones'
import Strategies from '../Layout/Strategies/Strategies'
import Blogs from '../Layout/Blog'
import BlogDetails from '../Layout/Blog/BlogDetails'
import Carlender from '../Layout/Carlender'
import AndrewSchedule from '../Layout/Carlender/AndrewSchedule'
import MathiusSchedule from '../Layout/Carlender/MathiusSchedule'
import Dashboard from '../Layout/Dashboard'
import CanvasHome from '../Layout/Canvas'
import MilestoneHome from '../Layout/Milestones'
import StrategiesHome from '../Layout/Strategies'
import AdminHome from '../Layout/Admin/Home/Home'
import Navbar from './Navbar'

const HomeRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cards" component={Cards} />
                <Route path="/canvas" component={Canvas} />
                <Route path="/milestones" component={Milestones} />
                <Route path="/strategies" component={Strategies} />
                <Route path="/blogs" component={Blogs} />
                <Route path="/blog-details" component={BlogDetails} />
                <Route path="/andrew-schedule" component={AndrewSchedule} />
                <Route path="/mathius-schedule" component={MathiusSchedule} />
                <Route path="/overview" component={Dashboard} />
                <Route path="/carlender" component={Carlender} />
                <Route path="/canvas-board" component={CanvasHome} />
                <Route path="/milestone-board" component={MilestoneHome} />
                <Route path="/strategies-board" component={StrategiesHome} />
                <Route path="/" component={AdminHome} />
            </Switch>
        </BrowserRouter>
    )
}

export default HomeRoutes
