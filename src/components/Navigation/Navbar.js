import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Menu, Dropdown, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import * as actionCreators from '../store/ActionCreators';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';
import ListAltIcon from '@material-ui/icons/ListAlt';
import BarChartIcon from '@material-ui/icons/BarChart';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import BuildIcon from '@material-ui/icons/Build';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';

import './Navigation.css';
const Navbar = (props) => {
	const Boards = useSelector((state) => state.requests.boards);
	const { category } = useSelector((state) => state.auth);

	const [ visibleLogout, setVisisbleLogout ] = useState(false);
	const [ openSidebar, setopenSidebar ] = useState(false);

	const [ appState, setAppState ] = useState({
		actionObject: null,
		objects: [
			{
				id: 1,
				title: 'OKRs',
				route: '/',
				icon: <ListAltIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 2,
				title: 'Lean Canvas',
				route: '/canvas-board',
				icon: <DeveloperBoardIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 3,
				title: 'Metrics',
				route: '/overview',
				icon: <BarChartIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 4,
				title: 'Diagnostics',
				route: '/diagnostics',
				icon: <BuildIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 5,
				title: 'Schedule',
				route: '/carlender',
				icon: <CalendarMonthIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 6,
				title: 'Content',
				route: '/content',
				icon: <NewspaperIcon className="link-icon" style={{ fontSize: '25px' }} />
			}
		]
	});

	const [ adminAppState, setAdminAppState ] = useState({
		actionObject: null,
		objects: [
			{
				id: 1,
				title: 'Startups',
				route: '/',
				icon: <GroupsIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 2,
				title: 'OKR Overview',
				route: '/okr-overview',
				icon: <AnalyticsIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 3,
				title: 'Investments',
				route: '/loans',
				icon: <LocalAtmIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 4,
				title: 'User Activity',
				route: '/user-activity',
				icon: <EventNoteIcon className="link-icon" style={{ fontSize: '25px' }} />
			},
			{
				id: 2,
				title: 'Revenue',
				route: '/revenues',
				icon: <PaymentIcon className="link-icon" style={{ fontSize: '25px' }} />
			}
		]
	});

	const dispatch = useDispatch();

	const username = useSelector((state) => state.auth.username);
	const admin = useSelector((state) => state.auth.admin);
	const link = useSelector((state) => state.auth.link);
	const userId = useSelector((state) => state.auth.userId);
	// console.log(key,'hello')

	const lean_check = Boards && Boards.filter((el) => el.creator === userId && el.boardType === 'Lean Canvas');
	// console.log(lean_check)

	const handleLogoutClick = (e) => {
		if (e.key === '1') {
			dispatch(actionCreators.removeUser());
			props.history.push('/');
		}
	};

	const handleLogoutChange = (flag) => {
		setVisisbleLogout(flag);
	};

	const toggleActive = (index) => {
		setAppState({ ...appState, actionObject: appState.objects[index] });
	};

	const toggleActiveStyle = (index) => {
		if (appState.objects[index] === appState.actionObject) {
			return 'link-box active';
		} else {
			return 'link-box inactive';
		}
	};

	const toggleAdminActive = (index) => {
		setAdminAppState({ ...adminAppState, actionObject: adminAppState.objects[index] });
	};

	const toggleAdminActiveStyle = (index) => {
		if (adminAppState.objects[index] === adminAppState.actionObject) {
			return 'link-box active';
		} else {
			return 'link-box inactive';
		}
	};

	const closeSidebar = () => setopenSidebar(false);

	const logout = (
		<Menu onClick={handleLogoutClick}>
			<Menu.Item key="1" icon={<UserOutlined />}>
				logout
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="nav-container">
			{openSidebar ? <Sidebar closeSidebar={closeSidebar} /> : null}
			<div className="nav-row">
				<div className="profile-pic">
					<div className="avatar">
						<img src={logo} />
					</div>
					<div className="profile">
						<Dropdown.Button
							overlay={logout}
							onVisibleChange={handleLogoutChange}
							placement="bottom"
							icon={<UserOutlined />}
						>
							<p>{username}</p>
						</Dropdown.Button>
					</div>
				</div>
				{admin ? (
					<div className="links">
						{adminAppState.objects.map((element, index) => (
							<div
								key={index}
								className={toggleAdminActiveStyle(index)}
								onClick={() => {
									toggleAdminActive(index);
									props.history.push(element.route);
								}}
							>
								{element.icon}
								<h4>{element.title}</h4>
							</div>
						))}
					</div>
				) : (
					<div className="links">
						<h3>Menu</h3>
						{appState.objects.map((element, index) => (
							<div
								key={index}
								className={toggleActiveStyle(index)}
								onClick={() => {
									toggleActive(index);
									if (element.title === 'Lean Canvas' && category === 'internal')
										return message.info(`${username} has no Lean Canvas`);
									if (element.title === 'Metrics' && category === 'internal')
										return message.info(`${username} has no Metrics Data`);
									if (element.title === 'Metrics' && category === 'academy')
										return message.info(`${username} has no Metrics Data`);
									// if (element.title === 'Content' && category === 'internal')
									// 	return message.info('Still under Development, Cheers!!');
									// if (element.title === 'Content' && category === 'catalyzer')
									// 	return message.info('Still under Development, Cheers!!');
									if (element.title === 'Content' && category === 'academy')
										return message.info('Still under Development, Cheers!!');
									if (element.title === 'Content' && category === 'dskills')
										return message.info('Still under Development, Cheers!!');
									if (element.title === 'Metrics' && category === 'dskills')
										return message.info(`${username} has no Metrics Data`);
									if (element.title === 'Schedule' && category === 'dskills')
										return message.info('No Mentors available');
									props.history.push(element.route);
								}}
							>
								{element.icon}
								<h4>{element.title}</h4>
							</div>
						))}
					</div>
				)}
				<div className="link-separator" />
				<div className="menu-container">
					<MenuIcon onClick={() => setopenSidebar(true)} className="menu" style={{ fontSize: '40px' }} />
				</div>
			</div>
		</div>
	);
};

export default withRouter(Navbar);
