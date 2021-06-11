import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../Layout/Auth/Login'
import Signup from '../Layout/Auth/SignUp'
import AdminLogin from '../Layout/Admin/Auth/Login'
import Admin from '../Layout/Admin/Home/Home'

const AuthRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/admin/login" component={AdminLogin} />
                <Route path="/signup" component={Signup} />
                <Route path="/admin/home" component={Admin} />
            </Switch>
        </BrowserRouter>
    )
}

export default AuthRoutes
