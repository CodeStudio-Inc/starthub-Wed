import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RateReviewIcon from '@material-ui/icons/RateReview';
import * as actionCreators from '../store/actionCreators'

import './Navigation.css'
const Sidebar = (props) => {

    const dispatch = useDispatch()

    const email = useSelector(state => state.auth.email)

    const handleLogout = () => {
        dispatch(actionCreators.removeUser())
        props.history.push('/')
    }


    const handleTodosNavigation = () => {
        props.history.push('/')
    }

    const handleCarlenderNavigation = () => {
        props.history.push('/carlender')
    }

    const handleDashboardNavigation = () => {
        props.history.push('/overview')
    }

    const handleCanvasNavigation = () => {
        props.history.push('/canvas')
    }

    const handleMilestonesNavigation = () => {
        props.history.push('/milestones')
    }

    const handleBlogsNavigation = () => {
        props.history.push('/blogs')
    }


    return (
        <div className="sidebar-container">
            <div className="profile-container">
                <div>
                    <h2>StartHub Africa</h2>
                    <div className="email-row">
                        <div className="online-icon" />
                        <h3>{email}</h3>
                    </div>
                </div>
                <div>
                    <NotificationsIcon className="icon" style={{ fontSize: '30px' }} />
                </div>
            </div>

            <div className="sidebar-links">
                <div className="links-row" onClick={handleCarlenderNavigation} >
                    <CalendarTodayIcon className="icon" style={{ fontSize: '30px' }} />
                    <h5>Schedule</h5>
                </div>
            </div>
            <div className="sidebar-links" onClick={handleTodosNavigation}>
                <div className="links-row">
                    <AssignmentTurnedInIcon className="icon" style={{ fontSize: '30px' }} />
                    <h5>ToDos</h5>
                </div>
            </div>
            <div className="sidebar-links">
                <div className="links-row" onClick={handleBlogsNavigation}>
                    <RateReviewIcon className="icon" style={{ fontSize: '30px' }} />
                    <h5>Learn</h5>
                </div>
            </div>
            <div className="sidebar-links">
                <div className="links-row" onClick={handleMilestonesNavigation} >
                    <AssignmentIcon className="icon" style={{ fontSize: '30px' }} />
                    <h5>Miletones</h5>
                </div>
            </div>
            <div className="sidebar-links">
                <div className="links-row" onClick={handleDashboardNavigation}>
                    <DashboardIcon className="icon" style={{ fontSize: '30px' }} />
                    <h5>Dashboard</h5>
                </div>
            </div>
            <div className="sidebar-links">
                <div className="links-row" onClick={handleCanvasNavigation}>
                    <DashboardIcon className="icon" style={{ fontSize: '30px' }} />
                    <h5>Business Modal</h5>
                </div>
            </div>
            <div className="logout-container" onClick={handleLogout}>
                <button>Logout</button>
                <ExitToAppIcon className="icon" style={{ fontSize: '14px' }} />
            </div>
        </div>
    )
}

export default withRouter(Sidebar)
