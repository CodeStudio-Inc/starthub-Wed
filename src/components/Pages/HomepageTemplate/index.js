import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OKRs,
  InternalOKRs,
  LeanCanvas,
  logo,
  Metrics,
  DiagnosticsTest,
  Calendar,
  Navbar,
  actionCreators,
  ModalUI,
  Startups,
  Loans,
  Revenues,
  ResourceFiles,
} from "../../Paths";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  ProfileOutlined,
  GroupOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Tabs, Menu } from "antd";
import axios from "axios";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BarChartIcon from "@material-ui/icons/BarChart";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@material-ui/icons/Build";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

import { Admin, TeamLead, TeamMember, Startup } from "../LandingPages";
import "./HomepageStyles.css";
const HomepageTemplate = (props) => {
  const [index, setIndex] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [navbar, setNavbar] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  // console.log(startupLinks);

  const { username, admin, tokenExpiration, category, userRole, features } =
    useSelector((state) => state.auth);

  // console.log(category);

  const auth = useSelector((state) => state.auth);

  const current_date = Date.now();

  React.useEffect(() => {
    setIndex(1);
  }, []);

  React.useEffect(() => {
    getProfile();
    if (current_date >= tokenExpiration) {
      dispatch(actionCreators.removeUser());
      props.history.push("/");
    }
  }, []);
  const getProfile = () => dispatch(actionCreators.getProfile());

  const dispatch = useDispatch();

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const getSubItem = (label, title, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      title,
      type,
    };
  };

  const items = [
    getItem("Metrics", "1", <BarChartOutlined />),
    getItem("OKRs", "2", <ContainerOutlined />),
    getItem("Lean Canvas", "3", <ContainerOutlined />),
    getItem("Diagnostics", "4", <ContainerOutlined />),
    getItem("Company Profile", "5", <ProfileOutlined />),
  ];

  const teamLeadItems = [
    getItem("Dashboard", "1", <AppstoreOutlined />),
    getItem("Startups", "2", <ContainerOutlined />),
    getItem("OKRs", "3", <ContainerOutlined />),
  ];

  const teamMembersItems = [
    getItem("Dashboard", "1", <AppstoreOutlined />),
    getItem("Startups", "sub1", <GroupOutlined />, [
      getSubItem("Add Startup", "add startup", "3"),
      getSubItem("Catalyzer", "catalyzer", "4"),
      getSubItem("OIP", "OIP", "5"),
      getSubItem("SheTechs", "SheTechs", "6"),
    ]),
    getItem("OKRs", "7", <ContainerOutlined />),
  ];

  const adminItems = [
    getItem("Dashboard", "1", <AppstoreOutlined />),
    getItem("Teams", "sub1", <GroupOutlined />, [
      getItem("Team Leads", "3"),
      getItem("Team Members", "4"),
      getItem("Startups", "5"),
    ]),
  ];

  const onClick = ({ key, item, selectedKeys }) => {
    setTitle(item.props.title);
    setIndex(parseInt(key));
  };

  const handleLogoutClick = (e) => {
    dispatch(actionCreators.removeUser());
    props.history.push("/");
  };

  const SwitchComponent = useCallback(
    ({ index, visible, title }) => {
      switch (userRole) {
        case "admin":
          return <Admin index={index} />;
          break;
        case "team lead":
          return <TeamLead index={index} />;
          break;
        case "team member":
          return <TeamMember index={index} title={title} />;
          break;
        case "startup":
          return <Startup index={index} visible={visible} />;
          break;
        default:
          return (
            <div className="homepage-main">
              <h3>Error while loading page</h3>
            </div>
          );
          break;
      }
    },
    [index, visible]
  );

  const SwitchNavLinks = useCallback(({ features }) => {
    switch (userRole) {
      case "admin":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={adminItems}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      case "team lead":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={teamLeadItems}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      case "team member":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={teamMembersItems}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      case "startup":
        return (
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{ background: "none", color: "#37561b" }}
          />
        );
        break;
      default:
        return (
          <div className="homepage-main">
            <h3>Error while loading page</h3>
          </div>
        );
        break;
    }
  }, []);

  return (
    <div className="homepage-container">
      {navbar ? null : (
        <div className="homepage-navbar-menu">
          <MenuIcon
            style={{ fontSize: "30px", color: "#fff" }}
            onClick={() => setNavbar(true)}
          />
        </div>
      )}
      {visible ? (
        <div className="homepage-open-navbar">
          <ArrowCircleRightIcon
            className="sidebar-icon"
            style={{ fontSize: "35px" }}
            onClick={() => setVisible(false)}
          />
        </div>
      ) : null}
      {navbar ? (
        <Navbar
          ListAltIcon={ListAltIcon}
          DeveloperBoardIcon={DeveloperBoardIcon}
          BarChartIcon={BarChartIcon}
          BuildIcon={BuildIcon}
          CalendarMonthIcon={CalendarMonthIcon}
          LogoutIcon={LogoutIcon}
          GroupsIcon={GroupsIcon}
          AnalyticsIcon={AnalyticsIcon}
          EventNoteIcon={EventNoteIcon}
          PaymentIcon={PaymentIcon}
          setIndex={setIndex}
          handleLogoutClick={handleLogoutClick}
          username={username}
          admin={admin}
          setNavbar={setNavbar}
        />
      ) : null}
      <div
        className={visible ? "homepage-sidebar hide-menu" : "homepage-sidebar"}
      >
        <div className="sidebar-icon-row">
          <ArrowCircleLeftIcon
            className="sidebar-icon"
            style={{ fontSize: "35px" }}
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="homepage-avatar">
          <img src={logo} alt="logo" />
        </div>
        <div className="username-logo">
          <AccountBoxIcon style={{ fontSize: "25px", color: "#37561b" }} />
          <h2>{username}</h2>
        </div>
        <SwitchNavLinks features={features} />
        <div className="logout" onClick={handleLogoutClick}>
          <LogoutIcon style={{ fontSize: "20px" }} className="logout-icon" />
          <h5>Logout</h5>
        </div>
      </div>
      <div
        className={visible ? "homepage-main increase-width" : "homepage-main"}
      >
        <SwitchComponent index={index} visible={visible} title={title} />
      </div>
    </div>
  );
};
export default HomepageTemplate;
