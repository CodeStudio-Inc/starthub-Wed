import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import NotificationsIcon from '@material-ui/icons/Notifications'
import * as actionCreators from '../store/actionCreators'
import { Menu } from 'antd';
import 'antd/dist/antd.css'

import './Navigation.css'
const Sidebar = ({history, closeSidebar}) => {

    const { SubMenu } = Menu;

    const dispatch = useDispatch()

    const username = useSelector(state => state.auth.username)
    const admin = useSelector(state => state.auth.admin)
    const link = useSelector(state => state.auth.link)


    const handleTodosNavigation = () => {
        closeSidebar()
        history.push('/')
    }

    const handleCarlenderNavigation = () => {
        closeSidebar()
        history.push('/carlender')
    }

    const handleDashboardNavigation = () => {
        closeSidebar()
        history.push('/overview')
    }

    const handleCanvasNavigation = () => {
        closeSidebar()
        history.push('/canvas-board')
    }

    const handleMilestonesNavigation = () => {
        closeSidebar()
        history.push('/milestone-board')
    }

    const handleStartupNavigation = () => {
        closeSidebar()
        history.push('/')
    }

    const handleRegisterNavigation = () => {
        closeSidebar()
        history.push('/register')
    }

    const handleLogout = () => {
        dispatch(actionCreators.removeUser())
        history.push('/')
    }



    return (
        <div className="sidebar-overlay">
            <div className="sidebar-container">
                <div className="profile-container">
                <div>
                    <div className="email-row">
                        <div className="online-icon"><h1>{username.slice(0,1)}</h1></div>
                        <div>
                            <p>Welcome,</p>
                            <h3>{username}</h3>
                        </div>
                    </div>
                </div>
            </div>
            {admin ?
                <Menu
                style={{ width: '100%', background: 'none', marginTop:'1rem' }}
            >
                <div className="links-row"><h5 onClick={handleStartupNavigation}>Startups</h5></div>
                <div className="links-row" onClick={handleRegisterNavigation}><h5>Register Startups</h5></div>
            </Menu> :
            <Menu
                style={{ width: '100%', background: 'none', marginTop:'1rem' }}
            >
                <div className="links-row"><h5 onClick={handleCarlenderNavigation}>Schedule Meeting</h5></div>
                <div className="links-row" onClick={handleDashboardNavigation}><h5>Dashboard</h5></div>
                <div className="links-row"><h5 onClick={handleTodosNavigation}>Todos</h5></div>
                <div className="links-row"><h5 onClick={handleCanvasNavigation}>Lean Canvas</h5></div>
                <div className="links-row"><h5 onClick={handleMilestonesNavigation}>Milestones</h5></div>
            </Menu>
            }
            {admin ? null : <a href={link} target="blank"><button className="report-sidebar">Report</button></a>}
            <div className="logout-container" onClick={handleLogout}>
                <button onClick={handleLogout}>Logout</button>
                <ExitToAppIcon className="icon" style={{ fontSize: '14px' }} />
            </div>
            </div>
            <div className="close-sidebar" onClick={closeSidebar}/>
        </div>
    )
}

export default withRouter(Sidebar)
