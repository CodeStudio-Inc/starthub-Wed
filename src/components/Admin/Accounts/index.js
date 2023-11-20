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
} from "antd";
import { actionCreators, ModalUI, svg } from "../../Paths";

import AssignStartupDrawer from "./components/AssignStartupDrawer";
import AccountsCard from "./components/AccountsCard";
import AddStartupDrawer from "./components/AddStartupDrawer";
import AddMentorDrawer from "./components/AddMentorDrawer";
import "../TeamLead/TeamLead.css";
const Accounts = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [program, setProgram] = React.useState("");
  const [openAddStartupModal, setOpenStartupModal] = React.useState(false);
  const [openAddMentorModal, setOpenMentorModal] = React.useState(false);
  const [openAssignModal, setOpenAssignModal] = React.useState(false);

  const { loading, users, programs } = useSelector((state) => state.requests);
  const { userRole } = useSelector((state) => state.auth);
  const { Search } = Input;
  const { TabPane } = Tabs;
  const dispatch = useDispatch();

  const handleStartupModalToggle = () =>
    setOpenStartupModal(!openAddStartupModal);
  const handleMentorModalToggle = () => setOpenMentorModal(!openAddMentorModal);
  const handleAssignModalToggle = () => setOpenAssignModal(!openAssignModal);

  const onSearch = (value) => {
    dispatch(
      actionCreators.searchItem(
        `auth/search-users?username=${value}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setUsers(data.users));
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const handleFilterUsers = () => {
    dispatch(
      actionCreators.searchItem(
        `auth/filter-users?program=${program}&totalRevenue=${0}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setUsers(data.users));
            console.log(data.users);
            setProgram("");
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const getStartups = () => {
    dispatch(
      actionCreators.getItem(`auth/users`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setUsers(data.users));
        }
        if (!success) console.log(error);
      })
    );
  };

  const mentors = users.filter(
    (u) => u.userRole === "team member" || u.userRole === "team lead"
  );
  const startups = users.filter((u) => u.userRole === "startup");

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchSelect = (value) => {
    setProgram(value);
  };

  const options = programs?.map((m) => ({
    label: m.name,
    value: m.name,
  }));

  const startupNames = startups?.map((m) => ({
    label: m.username,
    value: m._id,
  }));

  // console.log(users);

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
          onClick={handleStartupModalToggle}
        >
          Add Startup
        </Button>
        {userRole === "team member" ? null : (
          <Button
            type="dashed"
            style={{ marginRight: "1rem" }}
            onClick={handleMentorModalToggle}
          >
            Add Mentor
          </Button>
        )}
        <Search
          placeholder="search"
          value={searchValue}
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: "1rem" }}
        />
        <h3 style={{ margin: "0", fontWeight: "300" }}>
          Total Users :{" "}
          <strong style={{ fontWeight: "bold" }}>{users?.length}</strong>
        </h3>
        <Avatar
          onClick={getStartups}
          style={{
            backgroundColor: "#37561b",
            marginLeft: "1rem",
          }}
          className="refresh-avatar"
          size={30}
          icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
        />
      </Row>
      <Divider style={{ margin: "0.5rem" }} />
      <Row
        xs={12}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          width: "95%",
        }}
      >
        <Select
          showSearch
          placeholder="Category"
          optionFilterProp="children"
          onChange={onSearchSelect}
          onSearch={onSearchSelect}
          options={[
            {
              value: "catalyzer",
              label: "Catalyzer",
            },
            {
              value: "SheTechs",
              label: "SheTechs",
            },
            {
              value: "Greenovation",
              label: "Greenovation",
            },
            {
              value: "OIP",
              label: "OIP",
            },
          ]}
        />
        <Button
          disabled={loading}
          type="dashed"
          style={{ marginLeft: "1rem" }}
          onClick={handleFilterUsers}
        >
          Filter
        </Button>
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
        <TabPane tab="Startups" key="1">
          <Row
            xs={12}
            gutter={4}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {startups?.map((s) => (
              <AccountsCard m={s} key={s._id} />
            ))}
            {[...new Array(3 - (startups.length % 3)).fill()].map((r, i) => (
              <div
                style={{
                  margin: "0.5rem",
                  width: "25rem",
                  visibility: "hidden",
                }}
                key={i}
              />
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Mentors" key="2">
          <Row
            xs={12}
            // gutter={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {mentors?.map((m) => (
              <AccountsCard
                key={m._id}
                m={m}
                toggle={handleAssignModalToggle}
              />
            ))}
            {[...new Array(3 - (mentors.length % 3)).fill()].map((r, i) => (
              <div
                style={{
                  margin: "0.5rem",
                  width: "25rem",
                  visibility: "hidden",
                }}
                key={i}
              />
            ))}
          </Row>
        </TabPane>
      </Tabs>
      <AddStartupDrawer
        toggle={handleStartupModalToggle}
        open={openAddStartupModal}
        options={options}
      />
      <AddMentorDrawer
        toggle={handleMentorModalToggle}
        open={openAddMentorModal}
      />
      <AssignStartupDrawer
        toggle={handleAssignModalToggle}
        open={openAssignModal}
        startupNames={startupNames}
      />
    </div>
  );
};

export default Accounts;
