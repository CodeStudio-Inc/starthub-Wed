import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../Layout/Auth/Login'
import Signup from '../Layout/Auth/SignUp'


const AuthRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}

export default AuthRoutes
