import React from "react";
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
import { Tabs } from "antd";
import axios from "axios";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BarChartIcon from "@material-ui/icons/BarChart";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
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

import "./HomepageStyles.css";
const HomepageTemplate = (props) => {
  const [index, setIndex] = React.useState(0);
  const [navbar, setNavbar] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState({
    actionObject: null,
    objects: [
      {
        title: "Dashboard",
        icon: (
          <BarChartIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        title: "OKRs",
        icon: (
          <ListAltIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        title: "Lean Canvas",
        icon: (
          <DeveloperBoardIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
      {
        title: "Diagnostics",
        icon: (
          <BuildIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      // {
      // 	title: 'Schedule',
      // 	icon: <CalendarMonthIcon style={{ fontSize: '25px' }} className="home-link-icon" />
      // }
    ],
  });
  const [adminLink, setAdmin] = React.useState({
    actionObject: null,
    objects: [
      {
        title: "Startups",
        icon: (
          <GroupsIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      {
        title: "Resource Files",
        icon: (
          <FolderIcon style={{ fontSize: "25px" }} className="home-link-icon" />
        ),
      },
      // {
      // 	title: 'Revenue',
      // 	icon: <PaymentIcon style={{ fontSize: '25px' }} className="home-link-icon" />
      // },
      {
        title: "Loans",
        icon: (
          <LocalAtmIcon
            style={{ fontSize: "25px" }}
            className="home-link-icon"
          />
        ),
      },
    ],
  });
  const [emailState, setEmailState] = React.useState({
    email: "",
    startup: "",
    months: [],
  });

  const [emailMessage, setEmailMessage] = React.useState("");
  const [emailModal, setEmailModal] = React.useState(false);

  const { username, admin, tokenExpiration, category } = useSelector(
    (state) => state.auth
  );

  const current_date = Date.now();

  React.useEffect(() => {
    setActive({ ...active, actionObject: active.objects[0] });
    if (active.objects[index] === active.actionObject) {
      return "home-link home-active";
    } else {
      return "home-link home-inactive";
    }
  }, []);

  React.useEffect(() => {
    if (current_date >= tokenExpiration) {
      dispatch(actionCreators.removeUser());
      props.history.push("/");
    }
  }, []);

  const dispatch = useDispatch();

  const handleMultipleSelectChange = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setEmailState({ ...emailState, months: value });
  };

  const toggleActive = (index) => {
    setActive({ ...active, actionObject: active.objects[index] });
  };

  const toggleActiveStyle = (index) => {
    if (active.objects[index] === active.actionObject) {
      return "home-link home-active";
    } else {
      return "home-link home-inactive";
    }
  };

  const handleLogoutClick = (e) => {
    dispatch(actionCreators.removeUser());
    props.history.push("/");
  };

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
      {emailModal ? (
        <ModalUI>
          <div className="nav-modal-container">
            <div className="nav-container-header">
              <CloseIcon
                onClick={() => setEmailModal(false)}
                className="nav-icon"
                style={{ color: "rgba(0,0,0,0.3)" }}
              />
            </div>
            <div className="nav-container-content">
              <h3>Revenue Submission Reminder Email</h3>
              <input
                placeholder="Email"
                type="email"
                value={emailState.email}
                onChange={(e) =>
                  setEmailState({ ...emailState, email: e.target.value })
                }
              />
              <select
                onChange={(e) =>
                  setEmailState({ ...emailState, startup: e.target.value })
                }
                className="nav-container-select1"
              >
                <option value="" disabled selected>
                  -select startup-
                </option>
                <option value="OnScore Africa">OnScore Africa</option>
                <option value="Solfix">Solfix</option>
                <option value="Rada Safaris">Rada Safaris</option>
                <option value="Zetu Africa">Zetu Africa</option>
                <option value="Social Clark">Social Clark</option>
                <option value="Inove Labs">Inove Labs</option>
                <option value="OMNI Gym">OMNI Gym</option>
                <option value="Isharc">Isharc</option>
                <option value="Qiribu">Qiribu</option>
                <option value="Figurines">Figurines</option>
                <option value="Grab Gas">Grab Gas</option>
                <option value="Onestope">Onestope</option>
                <option value="ShareCARD">ShareCARD</option>
              </select>
              <select
                multiple={true}
                onChange={handleMultipleSelectChange}
                className="nav-container-select2"
              >
                <option value="" disabled selected>
                  -select months-
                </option>
                <option>January</option>
                <option>Febuary</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <button
                onClick={() =>
                  dispatch(
                    actionCreators.sendEmail(
                      emailState.email,
                      emailState.startup,
                      emailState.months,
                      (res) => {
                        if (res.success) {
                          setEmailMessage(res.res);
                          setEmailState({
                            email: "",
                            startup: "",
                            months: [],
                          });
                        }
                      }
                    )
                  )
                }
              >
                Send Email
              </button>
              <p>{emailMessage ? emailMessage : null}</p>
            </div>
          </div>
        </ModalUI>
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
        {admin &&
          adminLink.objects.map((e, index) => (
            <div
              key={index}
              className={toggleActiveStyle(index)}
              onClick={() => {
                toggleActive(index);
                setIndex(index);
              }}
            >
              <div className="home-link-row">
                {e.icon}
                <h4>{e.title}</h4>
              </div>
            </div>
          ))}
        {!admin && category !== "internal"
          ? active.objects.map((e, index) => (
              <div
                key={index}
                className={toggleActiveStyle(index)}
                onClick={() => {
                  toggleActive(index);
                  setIndex(index);
                }}
              >
                <div className="home-link-row">
                  {e.icon}
                  <h4>{e.title}</h4>
                </div>
              </div>
            ))
          : null}
        {!admin && category === "internal" ? (
          <p style={{ visibility: "hidden" }}>Hello</p>
        ) : null}
        <div className="logout" onClick={handleLogoutClick}>
          <LogoutIcon style={{ fontSize: "20px" }} className="logout-icon" />
          <h5>Logout</h5>
        </div>
      </div>
      {!admin && category !== "internal" ? (
        <div
          className={visible ? "homepage-main increase-width" : "homepage-main"}
        >
          {index === 0 ? <Metrics visible={visible} /> : null}
          {index === 1 ? <OKRs /> : null}
          {index === 2 ? <LeanCanvas /> : null}
          {index === 3 ? <DiagnosticsTest /> : null}
          {/* {index === 4 ? <Calendar /> : null} */}
        </div>
      ) : null}
      {!admin && category === "internal" ? (
        <div
          className={visible ? "homepage-main increase-width" : "homepage-main"}
        >
          <InternalOKRs />
        </div>
      ) : null}
      {admin ? (
        <div
          className={visible ? "homepage-main increase-width" : "homepage-main"}
        >
          {index === 0 ? <Startups /> : null}
          {/* {index === 1 ? <ResourceFiles /> : null} */}
          {/* {index === 1 ? <Revenues /> : null} */}
          {index === 1 ? <Loans /> : null}
        </div>
      ) : null}
    </div>
  );
};
export default HomepageTemplate;
