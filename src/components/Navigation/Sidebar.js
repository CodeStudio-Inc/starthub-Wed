import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RateReviewIcon from '@material-ui/icons/RateReview';
import * as actionCreators from '../store/ActionCreators'
import storage from 'redux-persist/lib/storage'

import './Styles.css'
const Sidebar = (props) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(actionCreators.removeUser())
        storage.removeItem('persist:root')
        props.history.push('/')
    }

    const [active, setActive] = useState({
        activeObject: null,
        objects: [
            { id: 1, name: 'Schedule', icon: <CalendarTodayIcon className="icon" style={{ fontSize: '20px' }} />, route: '/carlender' },
            { id: 2, name: 'ToDos', icon: <AssignmentTurnedInIcon className="icon" style={{ fontSize: '20px' }} />, route: '/trello' },
            { id: 3, name: 'Learn', icon: <RateReviewIcon className="icon" style={{ fontSize: '20px' }} />, route: '/blog' },
            { id: 4, name: 'Miletones', icon: <AssignmentIcon className="icon" style={{ fontSize: '20px' }} />, route: '/' },
            { id: 5, name: 'Dashboard', icon: <DashboardIcon className="icon" style={{ fontSize: '20px' }} />, route: '/air-table' },
            { id: 6, name: 'Business Modal', icon: <DashboardIcon className="icon" style={{ fontSize: '20px' }} />, route: '/trello' }
        ]
    })

    const email = useSelector(state => state.auth.email)

    const toggleAction = (index, route) => {
        setActive({ ...active, activeObject: active.objects[index] })
        props.history.push(route)
    }

    const toggleStyles = (index) => {
        if (active.objects && active.objects[index] === active.activeObject) {
            return "links-row active"
        } else {
            return "links-row"
        }
    }

    useEffect(() => {

    }, [setActive])

    const handleDashboardNavigation = () => {
        props.history.push('/')
    }

    const handleTrelloNavigation = () => {
        props.history.push('/trello')
    }

    const handleCarlenderNavigation = () => {
        props.history.push('/carlender')
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
            {active.objects.map((elements, index) => (
                <div className="sidebar-links">
                    <div
                        key={index}
                        onClick={() => toggleAction(index, elements.route)}
                        className={toggleStyles(index)} >
                        {elements.icon}
                        <h5>{elements.name}</h5>
                    </div>
                </div>
            ))

            }
            <div className="logout-container" onClick={handleLogout}>
                <button>Logout</button>
                <ExitToAppIcon className="icon" style={{ fontSize: '14px' }} />
            </div>
            {/* <div className="sidebar-links">
                <div onClick={handleCarlenderNavigation} className="links-row" >
                    <CalendarTodayIcon className="icon" style={{ fontSize: '30px' }} />
                    <h4>Schedule</h4>
                </div>
            </div>
            <div className="sidebar-links">
                <div onClick={handleTrelloNavigation} className="links-row">
                    <AssignmentTurnedInIcon className="icon" style={{ fontSize: '30px' }} />
                    <h4>ToDos</h4>
                </div>
            </div>
            <div className="sidebar-links">
                <div className="links-row">
                    <RateReviewIcon className="icon" style={{ fontSize: '30px' }} />
                    <h4>Learn</h4>
                </div>
            </div>
            <div className="sidebar-links">
                <div className="links-row" onClick={handleDashboardNavigation}>
                    <AssignmentIcon className="icon" style={{ fontSize: '30px' }} />
                    <h4>Miletones</h4>
                </div>
            </div>
            <div className="sidebar-links">
                <div onClick={handleDashboardNavigation} className="links-row">
                    <DashboardIcon className="icon" style={{ fontSize: '30px' }} />
                    <h4>Dashboard</h4>
                </div>
            </div>
            <div className="sidebar-links">
                <div onClick={handleTrelloNavigation} className="links-row">
                    <DashboardIcon className="icon" style={{ fontSize: '30px' }} />
                    <h4>Business Modal</h4>
                </div>
            </div> */}
        </div>
    )
}

export default withRouter(Sidebar)
