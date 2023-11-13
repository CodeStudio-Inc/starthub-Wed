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
import moment from "moment";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import AddProgramDrawer from "./components/AddProgramDrawer";
import ProgramCard from "./components/ProgramCard";
import "./Styles.css";
const Programs = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const { Search } = Input;
  const dispatch = useDispatch();

  const { loading, users, programs } = useSelector((state) => state.requests);

  const mentors = users.filter(
    (u) => u.userRole === "team lead" || u.userRole === "team member"
  );

  const onSearch = (value, _e, info) => console.log(info?.source, value);

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
        <Button
          type="dashed"
          style={{ marginRight: "1rem" }}
          onClick={handleOpenModalToggle}
        >
          Add Program
        </Button>
        <Search
          placeholder="search"
          value={searchValue}
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: "1rem" }}
        />
        <h3 style={{ margin: "0" }}>Total Programs : 4</h3>
        <Avatar
          style={{
            backgroundColor: "#37561b",
            marginLeft: "1rem",
          }}
          size={30}
          icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
        />
      </Row>
      <Divider style={{ margin: "0.5rem" }} />
      <Row
        xs={12}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {programs.map((p) => (
          <ProgramCard key={p._id} id={p._id} program={p} />
        ))}
        {[...new Array(3 - (programs.length % 3)).fill()].map((r, i) => (
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
      <AddProgramDrawer
        toggle={handleOpenModalToggle}
        open={openModal}
        mentors={mentors}
      />
    </div>
  );
};

export default Programs;
