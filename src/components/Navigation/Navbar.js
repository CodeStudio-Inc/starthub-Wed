import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import * as actionCreators from '../store/actionCreators'
import MenuIcon from '@material-ui/icons/Menu'
import Sidebar from './Sidebar'
import ListAltIcon from '@material-ui/icons/ListAlt'
import BarChartIcon from '@material-ui/icons/BarChart'
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard'
import BuildIcon from '@material-ui/icons/Build'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import EventNoteIcon from '@mui/icons-material/EventNote'

import './Navigation.css'
const Navbar = (props) => {

    const Boards = useSelector(state => state.requests.boards)
    const startup = useSelector(state => state.auth.username)
    const users = useSelector(state => state.admin.users)

    const category = useSelector(state => state.auth.category)

    const [visibleLogout, setVisisbleLogout] = useState(false)
    const [openSidebar, setopenSidebar] = useState(false)

    const page = 'Todo'

    const filtereBoards = Boards.filter(el => el.boardType === page  && el.startup === startup && el.archive === false)
    const filtereUsers = users.filter(el => el.admin === false)
    // console.log(filtereBoards,'ghj')

    const [appState, setAppState] = useState({
        actionObject: null,
        objects: [
            // { id: 1, title: "Schedule", route: "/carlender", icon:<ScheduleIcon className="link-icon" style={{ fontSize: '25px' }}/> },
            { id: 2, title: "Metrics", route: "/overview", icon:<BarChartIcon className="link-icon" style={{ fontSize: '25px' }}/> },
            { id: 3, title: "Lean Canvas", route: "/canvas-board", icon:<DeveloperBoardIcon className="link-icon" style={{ fontSize: '25px' }}/> },
            { id: 4, title: "OKRs", route: "/", icon:<ListAltIcon className="link-icon" style={{ fontSize: '25px' }}/> },
            { id: 5, title: "Diagnostics", route: "/diagnostics", icon:<BuildIcon className="link-icon" style={{ fontSize: '25px' }}/> },
            { id: 6, title: "Content", route: "/content", icon: <NewspaperIcon className="link-icon" style={{ fontSize: '25px' }}/> }
        ]
    })

    const [adminAppState, setAdminAppState] = useState({
        actionObject: null,
        objects: [
            { id: 1, title: "Dashboard", route: "/", icon:<BarChartIcon className="link-icon" style={{ fontSize: '25px' }}/> },
            { id: 2, title: "Loans", route: "/loans", icon: <LocalAtmIcon className="link-icon" style={{ fontSize: '25px' }} /> },
            { id: 2, title: "User Activity", route: "/user-activity", icon: <EventNoteIcon className="link-icon" style={{ fontSize: '25px' }} /> }
        ]
    })

    const dispatch = useDispatch()

    const username = useSelector(state => state.auth.username)
    const admin = useSelector(state => state.auth.admin)
    const link = useSelector(state => state.auth.link)
    const userId = useSelector(state => state.auth.userId)
    // console.log(key,'hello')

    const lean_check = Boards && Boards.filter(el => el.creator === userId && el.boardType === 'Lean Canvas')
    // console.log(lean_check)


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
                <div className="profile-pic">
                    <div className="avatar">
                        <img src={logo} />
                    </div>
                    <div className="profile">
                    <Dropdown.Button overlay={logout} onVisibleChange={handleLogoutChange} placement="bottomCenter" icon={<UserOutlined />}>
                        <p>{username}</p>
                    </Dropdown.Button>
                    </div>
                </div>
                {admin ? 
                <div className="links">
                {adminAppState.objects.map((element, index) => (
                    <div
                        key={index}
                        className={toggleAdminActiveStyle(index)}
                        onClick={() => {
                            toggleAdminActive(index)
                            props.history.push(element.route)
                        }}
                    >
                        {element.icon}
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
                <h3>Menu</h3>
                    {appState.objects.map((element, index) => (
                        <div
                        key={index}
                        className={toggleActiveStyle(index)}
                        onClick={() => {
                            toggleActive(index)
                            props.history.push(element.route)
                        }}
                        >
                            {element.title === 'Lean Canvas' && lean_check.length === 0  ?  null : element.icon}
                            <h4>{element.title === 'Lean Canvas' && lean_check.length === 0 ? null : element.title}</h4>
                        </div>
                    ))
                    }
                    {/* <h4>Lean Canvas</h4>
                    <h4>Dashboard</h4>
                    <h4>Learn</h4> */}
                </div>    
            }
            <div className="link-separator"/>
            {admin ? null : <a href={link} target="blank"><button className="report">Report Metrics</button></a>}
            {/* {admin ? 
            <div className="nav-boards">
                <h3>Boards</h3>
                <div className="nav-board-row">
                    {filtereUsers.map(u => (
                        <div className="nav-board">
                            <p>{u.username}</p>
                        </div>
                    )
                    )}
                </div>
            </div> 
            :
            <div className="nav-boards">
                <h3>Boards</h3>
                <div className="nav-board-row">
                    {filtereBoards.map(b => (
                        <div className="nav-board">
                            <p>{b.name}</p>
                        </div>
                    )
                    )}
                </div>
            </div>
            } */}
                {/* <div className="profile">
                    <Dropdown.Button overlay={logout} onVisibleChange={handleLogoutChange} placement="bottomCenter" icon={<UserOutlined />}>
                        <p>{username}</p>
                    </Dropdown.Button>
                </div> */}
                <div className="menu-container">
                    <MenuIcon onClick={() => setopenSidebar(true)}  className="menu" style={{ fontSize: '40px' }} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
