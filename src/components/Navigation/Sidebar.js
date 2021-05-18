import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import * as actionCreators from '../store/actionCreators'
import { Menu } from 'antd';
import { CalendarOutlined, DashboardOutlined, BookOutlined, AccountBookOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import './Navigation.css'
const Sidebar = (props) => {

    const { SubMenu } = Menu;

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

    const handleAirtableNavigate = () => {
        props.history.push('/air-table')
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
            <Menu
                style={{ width: '100%', background: 'none' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<CalendarOutlined />} title="Schedule">
                    <Menu.ItemGroup key="g1" title="Schedule Meeting">
                        <Menu.Item onClick={handleCarlenderNavigation} key="1">Carlender</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="sub2" icon={<DashboardOutlined />} title="Milestones">
                    <Menu.ItemGroup key="g2" title="Company milestones"></Menu.ItemGroup>
                    <Menu.Item onClick={handleTodosNavigation} key="2">Todos</Menu.Item>
                    <Menu.Item onClick={handleMilestonesNavigation} key="3">Business Modal</Menu.Item>
                    <Menu.Item onClick={handleCanvasNavigation} key="4">Lean Canvas</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<AccountBookOutlined />} title="Learn">
                    <Menu.ItemGroup key="g3" title="Blogs"></Menu.ItemGroup>
                    <Menu.Item onClick={handleBlogsNavigation} key="5">Learn</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<DashboardOutlined />} title="Dashboard">
                    <Menu.ItemGroup key="g4" title="Data Visualization"></Menu.ItemGroup>
                    <Menu.Item onClick={handleAirtableNavigate} key="6">Overview</Menu.Item>
                    <Menu.Item onClick={handleDashboardNavigation} key="7">Graphs</Menu.Item>
                </SubMenu>
            </Menu>

            {/* <div className="sidebar-links">
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
            </div> */}
            <div className="logout-container" onClick={handleLogout}>
                <button>Logout</button>
                <ExitToAppIcon className="icon" style={{ fontSize: '14px' }} />
            </div>
        </div>
    )
}

export default withRouter(Sidebar)
