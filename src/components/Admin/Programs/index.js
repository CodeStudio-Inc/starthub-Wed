import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  LoadingOutlined,
  ReloadOutlined,
  LineChartOutlined,
  UserOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import moment, { duration } from "moment";
import { Line } from "react-chartjs-2";
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
  Dropdown,
} from "antd";
import { actionCreators, ModalUI, svg } from "../../Paths";
import {
  getFirstDateElement,
  getLastDateElement,
} from "../../utilities/helpers";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import Schedule from "../Calender/Schedule";
import AddProgramModal from "./components/AddProgramModal";
import ProgramCard from "./components/ProgramCard";
import "./Styles.css";
const Programs = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const { TabPane } = Tabs;
  const { Search } = Input;
  const dispatch = useDispatch();

  const { loading, users, programs } = useSelector((state) => state.requests);

  const mentors = users.filter(
    (u) => u.userRole === "team lead" || u.userRole === "team member"
  );

  const events = programs?.map((p) => ({
    id: p._id,
    startAt: getFirstDateElement(p.duration),
    endAt: getLastDateElement(p.duration),
    summary: p.name,
    color: "#36561b56",
    calendarID: "work",
  }));

  const onSearch = (value, _e, info) => {
    dispatch(
      actionCreators.searchItem(
        `catalyzer/search-programs?name=${value}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setPrograms(data.programs));
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const handleOpenModalToggle = () => setOpenModal(!openModal);

  const getPrograms = () => {
    dispatch(
      actionCreators.getItem(`catalyzer/programs`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setPrograms(data.programs));
        }
        if (!success) console.log(error);
      })
    );
  };

  React.useEffect(() => {
    getPrograms();
  }, []);

  return (
    <div className="startups-container">
      <Helmet>
        <title>Startup Portfolio</title>
      </Helmet>
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
          value={searchValue}
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: "1rem" }}
        />
        <h3 style={{ margin: "0", fontWeight: "300" }}>
          Total Programs :{" "}
          <strong style={{ fontWeight: "bold" }}>{programs?.length}</strong>
        </h3>
        <Avatar
          style={{
            backgroundColor: "#37561b",
            marginLeft: "1rem",
          }}
          className="refresh-avatar"
          onClick={getPrograms}
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
        <TabPane tab="Programs" key="1">
          <Row
            xs={12}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {programs?.map((p) => (
              <ProgramCard key={p._id} id={p._id} program={p} />
            ))}
            {[...new Array(3 - (programs?.length % 3)).fill()].map((r, i) => (
              <div
                style={{
                  margin: "0.5rem",
                  width: "30%",
                  visibility: "hidden",
                  height: "100px",
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
            <Schedule events={events} />
          </Row>
        </TabPane>
      </Tabs>

      <AddProgramModal
        toggle={handleOpenModalToggle}
        open={openModal}
        mentors={mentors}
      />
      <Fab
        aria-label="add"
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          background: "#37561b",
          color: "#fff",
        }}
        onClick={handleOpenModalToggle}
      >
        {openModal ? <CloseIcon /> : <AddIcon />}
      </Fab>
    </div>
  );
};

export default Programs;
