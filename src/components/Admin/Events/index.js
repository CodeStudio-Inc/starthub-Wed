import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  LoadingOutlined,
  ReloadOutlined,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Table,
  Button,
  Input,
  Avatar,
  Row,
  Divider,
  Select,
  Card,
  Progress,
  Space,
  message,
  Tabs,
  Col,
} from "antd";
import { actionCreators, ModalUI, svg } from "../../Paths";
import {
  getFirstDateElement,
  getLastDateElement,
} from "../../utilities/helpers";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

import AddEventModal from "./components/AddEventModal";
import Schedule from "../Calender/Schedule";
import Event from "./components/Event";
import "./Styles.css";
const Evaluation = () => {
  const [open, setOpen] = React.useState(false);

  const { loading, users, programs, events } = useSelector(
    (state) => state.requests
  );

  console.log(events);

  const startups = users.filter((u) => u.userRole === "startup");

  const { TabPane } = Tabs;
  const { Search } = Input;
  const dispatch = useDispatch();

  const handleModalToggle = () => setOpen(!open);

  const onSearch = (value, _e, info) => {
    dispatch(
      actionCreators.searchItem(
        `catalyzer/search-events?name=${value}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setEvents(data.events));
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const eventsCalender = events?.map((e) => ({
    id: e._id,
    startAt: getFirstDateElement(e.duration),
    endAt: getLastDateElement(e.duration),
    summary: e.name,
    color: "#36561b56",
    calendarID: "work",
  }));

  const getEvents = () => {
    dispatch(
      actionCreators.getItem(`catalyzer/events`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setEvents(data.events));
        }
        if (!success) console.log(error);
      })
    );
  };

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="main-container">
      <Helmet>
        <title>Startup Portfolio</title>
      </Helmet>
      <AddEventModal
        open={open}
        toggle={handleModalToggle}
        startups={startups}
      />
      <Row
        xs={12}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "95%",
          margin: "0.5rem",
        }}
      >
        <Search
          placeholder="search"
          onSearch={onSearch}
          style={{ width: 200, marginRight: "1rem" }}
        />
        <h3 style={{ margin: "0", fontWeight: "300" }}>
          Total Events :
          <strong style={{ fontWeight: "bold" }}>{events?.length}</strong>
        </h3>
        <Avatar
          style={{
            backgroundColor: "#37561b",
            marginLeft: "1rem",
          }}
          className="refresh-avatar"
          onClick={getEvents}
          size={30}
          icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
        />
      </Row>
      <Divider style={{ margin: "0.5rem" }} />
      <Tabs
        style={{ width: "100%" }}
        // centered
        tabBarStyle={{ color: "#37561b" }}
        size="small"
        type="card"
        defaultActiveKey="1"
      >
        <TabPane tab="Events" key="1">
          <Row
            xs={12}
            gutter={4}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {events?.map((e) => (
              <Event event={e} />
            ))}
            {[...new Array(2 - (events?.length % 2)).fill()].map((r, i) => (
              <div
                style={{
                  margin: "0.5rem",
                  width: "45%",
                  visibility: "hidden",
                }}
                key={i}
              />
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Calendar" key="2">
          <Row
            xs={12}
            gutter={4}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Schedule events={eventsCalender} />
          </Row>
        </TabPane>
      </Tabs>
      <Fab
        aria-label="add"
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          background: "#37561b",
          color: "#fff",
        }}
        onClick={handleModalToggle}
      >
        {open ? <CloseIcon /> : <AddIcon />}
      </Fab>
    </div>
  );
};

export default Evaluation;
