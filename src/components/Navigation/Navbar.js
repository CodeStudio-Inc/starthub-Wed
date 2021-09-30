import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import * as actionCreators from '../store/actionCreators'
import MenuIcon from '@material-ui/icons/Menu'
import Sidebar from './Sidebar'

import './Navigation.css'
const Navbar = (props) => {

    const [visibleLogout, setVisisbleLogout] = useState(false)
    const [openSidebar, setopenSidebar] = useState(false)

    const [appState, setAppState] = useState({
        actionObject: null,
        objects: [
            { id: 1, title: "Schedule Meeting", route: "/carlender" },
            { id: 2, title: "Dashboard", route: "/overview" },
            { id: 3, title: "Lean Canvas", route: "/canvas-board" },
            { id: 4, title: "Todos", route: "/" },
            { id: 5, title: "Milestones", route: "/milestone-board" },
            { id: 6, title: "Diagnostics", route: "/diagnostics" }
        ]
    })

    const [adminAppState, setAdminAppState] = useState({
        actionObject: null,
        objects: [
            { id: 1, title: "Startups", route: "/" },
            { id: 2, title: "Register Startup", route: "/register" }
        ]
    })

    const dispatch = useDispatch()

    const username = useSelector(state => state.auth.username)
    const admin = useSelector(state => state.auth.admin)
    const link = useSelector(state => state.auth.link)
    // console.log(key,'hello')


    const handleLogoutClick = e => {
        if (e.key === '1') {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
        }
    };


    const handleLogoutChange = flag => {
        setVisisbleLogout(flag)
    };

    const toggleActive = (index) => {
        setAppState({ ...appState, actionObject: appState.objects[index] })
    }

    const toggleActiveStyle = (index) => {
        if (appState.objects[index] === appState.actionObject) {
            return "link-box active"
        } else {
            return "link-box inactive"
        }
    }

    const toggleAdminActive = (index) => {
        setAdminAppState({ ...adminAppState, actionObject: adminAppState.objects[index] })
    }

    const toggleAdminActiveStyle = (index) => {
        if (adminAppState.objects[index] === adminAppState.actionObject) {
            return "link-box active"
        } else {
            return "link-box inactive"
        }
    }

    const closeSidebar = () => setopenSidebar(false)


    const logout = (
        <Menu onClick={handleLogoutClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                logout
          </Menu.Item>
        </Menu>
    );

    return (
        <div className="nav-container">
            {openSidebar ? <Sidebar closeSidebar={closeSidebar}/> : null}
            <div className="nav-row">
                <img src={logo} />
                {admin ? 
                <div className="admin-links">
                {adminAppState.objects.map((element, index) => (
                    <div
                        key={index}
                        className={toggleAdminActiveStyle(index)}
                        onClick={() => {
                            toggleAdminActive(index)
                            props.history.push(element.route)
                        }}
                    >
                        <h4>{element.title}</h4>
                    </div>
                ))
                }
                {/* <h4>Lean Canvas</h4>
                <h4>Dashboard</h4>
                <h4>Learn</h4> */}
            </div>
            :
            <div className="links">
                    {appState.objects.map((element, index) => (
                        <div
                            key={index}
                            className={toggleActiveStyle(index)}
                            onClick={() => {
                                toggleActive(index)
                                props.history.push(element.route)
                            }}
                        >
                            <h4>{element.title}</h4>
                        </div>
                    ))
                    }
                    {/* <h4>Lean Canvas</h4>
                    <h4>Dashboard</h4>
                    <h4>Learn</h4> */}
                </div>    
            }
                {admin ? null : <a href={link} target="blank"><button className="report">Report</button></a>}
                <div className="profile">
                    <Dropdown.Button overlay={logout} onVisibleChange={handleLogoutChange} placement="bottomCenter" icon={<UserOutlined />}>
                        <p>{username}</p>
                    </Dropdown.Button>
                </div>
                <div className="menu-container">
                    <MenuIcon onClick={() => setopenSidebar(true)}  className="menu" style={{ fontSize: '40px' }} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
