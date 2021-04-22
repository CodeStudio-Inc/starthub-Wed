import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Blogs from '../Layout/Blogs'
import Trello from '../Layout/Trello'
import Lists from '../Layout/Trello/Lists'
import Dashboard from '../Layout/Dashboard'
import AirTable from '../Layout/Dashboard/AirTable'
import Carlender from '../Layout/Carlender'
import AndrewSchedule from '../Layout/Carlender/AndrewSchedule'
import MathiusSchedule from '../Layout/Carlender/MathiusSchedule'
import YusufuSchedule from '../Layout/Carlender/YusufuCarlender'
import Cards from '../Layout/Trello/Cards'
import BlogDetails from '../Layout/Blogs/BlogDetails'


const HomeRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/air-table" component={AirTable} />
                <Route path="/trello" component={Trello} />
                <Route path="/lists" component={Lists} />
                <Route path="/carlender" component={Carlender} />
                <Route path="/andrew-schedule" component={AndrewSchedule} />
                <Route path="/mathius-schedule" component={MathiusSchedule} />
                <Route path="/yusufu-schedule" component={YusufuSchedule} />
                <Route path="/cards" component={Cards} />
                <Route path="/blog" component={Blogs} />
                <Route path="/blog-details" component={BlogDetails} />
            </Switch>
        </BrowserRouter>
    )
}

export default HomeRoutes
