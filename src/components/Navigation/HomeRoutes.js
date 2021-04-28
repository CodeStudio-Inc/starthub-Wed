import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Layout/Home/Home'
import Cards from '../Layout/Home/Card'
import Canvas from '../Layout/Canvas/Canvas'
import Milestones from '../Layout/Milestones/Milestones'
import Blogs from '../Layout/Blog'
import BlogDetails from '../Layout/Blog/BlogDetails'
import Carlender from '../Layout/Carlender'
import AndrewSchedule from '../Layout/Carlender/AndrewSchedule'
import MathiusSchedule from '../Layout/Carlender/MathiusSchedule'
import YusufuSchedule from '../Layout/Carlender/YusufuSchedule'
import Dashboard from '../Layout/Dashboard'
import Airtable from '../Layout/Dashboard/Airtable'

const HomeRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cards" component={Cards} />
                <Route path="/canvas" component={Canvas} />
                <Route path="/milestones" component={Milestones} />
                <Route path="/blogs" component={Blogs} />
                <Route path="/blog-details" component={BlogDetails} />
                <Route path="/andrew-schedule" component={AndrewSchedule} />
                <Route path="/mathius-schedule" component={MathiusSchedule} />
                <Route path="/yusufu-schedule" component={YusufuSchedule} />
                <Route path="/overview" component={Dashboard} />
                <Route path="/air-table" component={Airtable} />
                <Route path="/carlender" component={Carlender} />
                {/* 
                <Route path="/trello" component={Trello} />
                <Route path="/lists" component={Lists} />
                
    */}
            </Switch>
        </BrowserRouter>
    )
}

export default HomeRoutes
