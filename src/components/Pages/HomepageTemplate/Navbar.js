import React from 'react';

const Navbar = ({
	ListAltIcon,
	DeveloperBoardIcon,
	BarChartIcon,
	BuildIcon,
	CalendarMonthIcon,
	GroupsIcon,
	AnalyticsIcon,
	EventNoteIcon,
	PaymentIcon,
	LogoutIcon,
	setIndex,
	handleLogoutClick,
	username,
	admin,
	setNavbar
}) => {
	const [ active, setActive ] = React.useState({
		actionObject: null,
		objects: [
			{
				title: 'OKRs',
				icon: <ListAltIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			},
			{
				title: 'Lean Canvas',
				icon: <DeveloperBoardIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			},
			{
				title: 'Metrics',
				icon: <BarChartIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			},
			{
				title: 'Diagnostics',
				icon: <BuildIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			},
			{
				title: 'Schedule',
				icon: <CalendarMonthIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			}
		]
	});
	const [ adminLink, setAdmin ] = React.useState({
		actionObject: null,
		objects: [
			{
				title: 'Startups',
				icon: <GroupsIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			},
			{
				title: 'OKR Overview',
				icon: <AnalyticsIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			},
			// {
			// 	title: 'Investments',
			// 	icon: <LocalAtmIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			// },
			{
				title: 'User Activity',
				icon: <EventNoteIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			},
			{
				title: 'Revenue',
				icon: <PaymentIcon style={{ fontSize: '30px' }} className="navbar-link-icon" />
			}
		]
	});

	const toggleActive = (index) => {
		setActive({ ...active, actionObject: active.objects[index] });
	};

	const toggleActiveStyle = (index) => {
		if (active.objects[index] === active.actionObject) {
			return 'nav-link home-active';
		} else {
			return 'nav-link home-inactive';
		}
	};

	return (
		<div className="homepage-navbar-backdrop">
			<div className="homepage-navbar">
				<div className="homepage-navbar-avatar">
					<h1>{username.substring(0, 1)}</h1>
				</div>
				{admin &&
					adminLink.objects.map((e, index) => (
						<div
							key={index}
							className={toggleActiveStyle(index)}
							onClick={() => {
								toggleActive(index);
								setIndex(index);
								setNavbar(false);
							}}
						>
							<div className="nav-link">{e.icon}</div>
						</div>
					))}
				{!admin &&
					active.objects.map((e, index) => (
						<div
							key={index}
							className={toggleActiveStyle(index)}
							onClick={() => {
								toggleActive(index);
								setIndex(index);
								setNavbar(false);
							}}
						>
							<div className="nav-link">{e.icon}</div>
						</div>
					))}
				<div className="logout">
					<LogoutIcon style={{ fontSize: '20px' }} className="logout-icon" onClick={handleLogoutClick} />
				</div>
			</div>
		</div>
	);
};
export default Navbar;
