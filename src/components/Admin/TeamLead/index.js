import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadingOutlined,
  ReloadOutlined,
  LineChartOutlined,
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
  Col,
} from "antd";
import { actionCreators, ModalUI, svg } from "../../Paths";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddCardIcon from "@mui/icons-material/AddCard";
import GroupsIcon from "@mui/icons-material/Groups";
import { Helmet } from "react-helmet";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CancelIcon from "@mui/icons-material/Cancel";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { message } from "antd";

import AddTeamMember from "./modals/AddTeamMember";
import "./TeamLead.css";
// import "../../Pages/Auth/AuthStyles.css";
const TeamLead = (props) => {
  const [open, setOpen] = React.useState(false);
  const [ID, setID] = React.useState("");
  const [permission, setPermission] = React.useState("");
  const [activeRowIndex, setRowIndex] = React.useState(null);
  const [assignIndex, setAssignIndex] = React.useState(null);
  const [unAssignIndex, setUnAssignIndex] = React.useState(null);
  const [startup, setStartup] = React.useState("");
  const [role, setRole] = React.useState("");
  const [record, setRecord] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [payload, setPayload] = React.useState([]);

  const { userId, category } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.profile);
  const { loading, users } = useSelector((state) => state.requests);

  const { Search } = Input;

  const tableRef = React.useRef(null);

  const filterUsers =
    users &&
    users.filter(
      (el) => el.userRole === "team lead" || el.userRole === "team member"
    );

  const startups = users.filter(
    (r) => r.teamCategory === "catalyzer" && r.userRole === "startup"
  );

  const mentor = users?.find((r) => r._id === record?._id);

  const revenueTotal = users?.filter(
    (el) =>
      el.teamCategory === category &&
      el.creator === userId &&
      typeof el.totalRevenue !== "undefined"
  );

  const totalRevenue = Array.from(
    revenueTotal,
    ({ totalRevenue }) => totalRevenue
  ).reduce((a, b) => a + b, 0);
  const totalExpectedRevenuePaid = Array.from(
    revenueTotal,
    ({ totalRevSharePaid }) => totalRevSharePaid
  ).reduce((a, b) => a + b, 0);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getStartups();
    getFeatures();
    getProfiles();
    getCategories();
    updateStartupObject();
  }, []);

  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleStartupChange = (event) => {
    setStartup(event.target.value);
  };

  const assignStartup = () => {
    const mentor = users.find((r) => r._id === record._id);
    const teams = mentor?.teams.map((r) => r.startupId);
    if (teams.includes(ID))
      return message.info(`Startup already assigned to ${mentor.username}`);
    const data = {
      mentorId: record._id,
    };
    dispatch(
      actionCreators.updateItem(
        `auth/assign/${ID}`,
        data,
        (data) => {
          const { mentorId } = data;
          if (!mentorId) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            message.info("Successfully assigned startup");
            dispatch(actionCreators.setUsers(data.users));
            setAssignIndex(null);
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const unAssignStartup = () => {
    const data = {
      mentorId: record._id,
    };
    dispatch(
      actionCreators.updateItem(
        `auth/unassign/${ID}`,
        data,
        (data) => {
          const { mentorId } = data;
          if (!mentorId) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            message.info("Successfully unassigned startup");
            dispatch(actionCreators.setUsers(data.users));
            setUnAssignIndex(null);
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const updateStartup = () => {
    if (!role) return message.info("Please enter team member user role");
    if (!permission)
      return message.info("Please enter team member permissions");
    if (!email) return message.info("Please enter team member user email");
    const data = {
      role,
      permission,
      email,
    };
    dispatch(
      actionCreators.updateItem(
        `/auth/update-user/${record._id}`,
        data,
        (data) => {
          const { role, permission, email } = data;
          if (!role || !permission || !email) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            message.info("Successfully updated startup");
            dispatch(actionCreators.setUsers(data.users));
            setRowIndex(null);
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const updateStartupObject = () => {
    const newstartup = [
      ...startups.map((r) => {
        const {
          _id,
          totalExpense,
          totalRevenue,
          totalExpectedRevenueShare,
          ...rest
        } = r;
        const profile = profiles.find((r) => r.creator === _id);
        const data = profiles.find((r) => r.creator === _id)?.founder;

        return {
          ...rest,
          _id: _id,
          totalExpense: typeof totalExpense === "undefined" ? 0 : totalExpense,
          totalRevenue: typeof totalRevenue === "undefined" ? 0 : totalRevenue,
          totalExpectedRevenueShare:
            typeof totalExpectedRevenueShare === "undefined"
              ? 0
              : totalExpectedRevenueShare,
          profile: typeof data !== "undefined" ? profile : {},
        };
      }),
    ];
    return setPayload(newstartup);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "left",
      // width: 10,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      // width: 20,
      render: (text, record, rowIndex) => (
        <div className="table-cell-row">
          {activeRowIndex === rowIndex ? (
            <input onChange={(e) => setEmail(e.target.value)} value={email} />
          ) : (
            <p>{text}</p>
          )}
        </div>
      ),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      align: "left",
      // width: 20,
      render: (text, record, rowIndex) => (
        <div className="table-cell-row">
          {activeRowIndex === rowIndex ? (
            <select
              onChange={(e) => setPermission(e.target.value)}
              value={permission}
            >
              <option value="viewer">viewer</option>
              <option value="owner">owner</option>
            </select>
          ) : (
            <p>{text}</p>
          )}
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
      align: "left",
      // width: 20,
      render: (text, record, rowIndex) => (
        <div className="table-cell-row">
          {activeRowIndex === rowIndex ? (
            <select onChange={(e) => setRole(e.target.value)} value={role}>
              <option value="team member">team member</option>
              <option value="team lead">team lead</option>
            </select>
          ) : (
            <p>{text}</p>
          )}
        </div>
      ),
    },
    {
      // title: "edit",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (text, record, rowIndex) => (
        <div className="table-cell-row">
          {activeRowIndex !== rowIndex ? (
            <h4
              onClick={() => {
                setRecord(record);
                setRowIndex(rowIndex);
                setEmail(record.email);
                setRole(record.userRole);
                setPermission(record.permissions);
              }}
            >
              edit
            </h4>
          ) : null}
          {activeRowIndex === rowIndex ? (
            <h4 onClick={updateStartup}>save</h4>
          ) : null}
          {activeRowIndex === rowIndex ? (
            <CancelIcon
              style={{ fontSize: "20px", color: "#36561b56" }}
              className="icon"
              onClick={() => setRowIndex(null)}
            />
          ) : null}
        </div>
      ),
    },
    {
      // title: "edit",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (text, record, rowIndex) => (
        <div className="table-cell-row">
          {assignIndex === rowIndex ? (
            <select onChange={(e) => setID(e.target.value)} value={ID}>
              <option value=" ">-select startup-</option>
              {startups?.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.username}
                </option>
              ))}
            </select>
          ) : null}
          {assignIndex !== rowIndex ? (
            <h4
              onClick={() => {
                setAssignIndex(rowIndex);
                setRecord(record);
              }}
            >
              assign startup
            </h4>
          ) : null}
          {assignIndex === rowIndex ? (
            <h4 onClick={assignStartup}>save</h4>
          ) : null}
          {assignIndex === rowIndex ? (
            <CancelIcon
              style={{ fontSize: "20px", color: "#36561b56" }}
              className="icon"
              onClick={() => setAssignIndex(null)}
            />
          ) : null}
        </div>
      ),
    },
    {
      // title: "edit",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (text, record, rowIndex) => (
        <div className="table-cell-row">
          {unAssignIndex === rowIndex ? (
            <select onChange={(e) => setID(e.target.value)} value={ID}>
              <option value=" ">-select startup-</option>
              {mentor?.teams.map((r) => (
                <option key={r._id} value={r.startupId}>
                  {r.startup}
                </option>
              ))}
            </select>
          ) : null}
          {unAssignIndex !== rowIndex ? (
            <h4
              onClick={() => {
                setUnAssignIndex(rowIndex);
                setRecord(record);
              }}
            >
              unassign startup
            </h4>
          ) : null}
          {unAssignIndex === rowIndex ? (
            <h4 onClick={unAssignStartup}>save</h4>
          ) : null}
          {unAssignIndex === rowIndex ? (
            <CancelIcon
              style={{ fontSize: "20px", color: "#36561b56" }}
              className="icon"
              onClick={() => setUnAssignIndex(null)}
            />
          ) : null}
        </div>
      ),
    },
  ];

  const getStartups = () => {
    dispatch(
      actionCreators.getItem(`http://localhost:8080/auth/users`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setUsers(data.users));
        }
        if (!success) console.log(error);
      })
    );
  };
  const getFeatures = () => dispatch(actionCreators.getFeatures());
  const getCategories = () => dispatch(actionCreators.getCategories());
  const getProfiles = () => dispatch(actionCreators.getAllProfiles());

  const onSearch = (value) => {
    dispatch(
      actionCreators.getItem(`auth/search-users?username=${value}`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setUsers(data.users));
        }
        if (!success) console.log(error);
      })
    );
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchSelect = (value) => {
    console.log("search:", value);
  };

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
        <Button type="dashed" style={{ marginRight: "1rem" }}>
          Add Startup
        </Button>
        <Search
          placeholder="search startup"
          value={searchValue}
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: "1rem" }}
        />
        <h3 style={{ margin: "0" }}>Total Users :{users.length}</h3>
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
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "95%",
        }}
      >
        <Select
          showSearch
          placeholder="Category"
          optionFilterProp="children"
          onChange={onChange}
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
              label: "Tom",
            },
            {
              value: "OIP",
              label: "OIP",
            },
          ]}
        />
        <Select
          showSearch
          placeholder="Revenue Generated"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearchSelect}
          style={{ marginLeft: "1rem" }}
          options={[
            {
              value: 500000,
              label: "1,0000USD",
            },
            {
              value: 1000000,
              label: "20,000USD",
            },
            {
              value: 1000000,
              label: "40,OOOUSD",
            },
          ]}
        />
        <Button type="dashed" style={{ marginLeft: "1rem" }}>
          Filter
        </Button>
      </Row>
      <Divider style={{ margin: "0.5rem" }} />
      <Row
        xs={12}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {payload.map((r) => (
          <Card
            style={{
              width: "550px",
              margin: "1rem",
            }}
            key={r._id}
          >
            <div className="card-content-column" key={r._id}>
              <Row xs={12}>
                <div className="avatar-column">
                  <Avatar
                    style={{
                      backgroundColor: "#36561b56",
                      marginRight: "0.5rem",
                    }}
                    size={55}
                  >
                    {r.username.substring(0, 1)}
                  </Avatar>
                  <h3>{r.username}</h3>
                </div>
                <div className="avatar-column">
                  <h2>Pitch Deck</h2>
                  {/* <h3>{r?.profile?.pitch}</h3> */}
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </h3>
                </div>
              </Row>
              <Divider />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div className="radar-graph-column">
                  <h2>Founders</h2>
                  <Divider style={{ margin: "0" }} />
                  {r?.profile?.founder?.map((f) => (
                    <div style={{ width: "90%" }} key={r.id}>
                      <h3>{f.name}</h3>
                      <div className="progress-bar-column">
                        <p>Growth</p>
                        <Progress
                          percent={(parseInt(f.growth) / 10) * 100}
                          size="small"
                          strokeColor="#36561b56"
                        />
                      </div>
                      <div className="progress-bar-column">
                        <p>Finance</p>
                        <Progress
                          percent={(parseInt(f.finance) / 10) * 100}
                          size="small"
                          strokeColor="#36561b56"
                        />
                      </div>
                      <div className="progress-bar-column">
                        <p>communication</p>
                        <Progress
                          percent={(parseInt(f.communication) / 10) * 100}
                          size="small"
                          strokeColor="#36561b56"
                        />
                      </div>
                      <div className="progress-bar-column">
                        <p>Product</p>
                        <Progress
                          percent={(parseInt(f.product) / 10) * 100}
                          size="small"
                          strokeColor="#36561b56"
                        />
                      </div>
                      <div className="progress-bar-column">
                        <p>Operations</p>
                        <Progress
                          percent={(parseInt(f.operations) / 10) * 100}
                          size="small"
                          strokeColor="#36561b56"
                        />
                      </div>

                      <Divider />
                    </div>
                  ))}
                </div>
                <div className="radar-graph-column">
                  <h2>Revenue</h2>
                  <Divider style={{ margin: "0" }} />
                  <Card
                    bodyStyle={{ display: "flex", flexDirection: "row" }}
                    className="rev-card"
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#36561b56",
                        color: "#37561b",
                      }}
                      icon={<LineChartOutlined />}
                      size={40}
                    />
                    <div className="rev-card-column">
                      <h4>Total Revenue</h4>
                      <h2>
                        {r?.totalRevenue
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        Shs
                      </h2>
                    </div>
                  </Card>
                  <Card
                    bodyStyle={{ display: "flex", flexDirection: "row" }}
                    className="rev-card"
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#36561b56",
                        color: "#37561b",
                      }}
                      icon={<LineChartOutlined />}
                      size={40}
                    />
                    <div className="rev-card-column">
                      <h4>Total Expense</h4>
                      <h2>
                        {r?.totalExpense
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        Shs
                      </h2>
                    </div>
                  </Card>
                  <Card
                    bodyStyle={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className="rev-card"
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#36561b56",
                        color: "#37561b",
                      }}
                      icon={<LineChartOutlined />}
                      size={40}
                    />
                    <div className="rev-card-column">
                      <h4>Expected Revenue Share</h4>
                      <h2>
                        {r?.totalExpectedRevenueShare
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        Shs
                      </h2>
                    </div>
                  </Card>
                </div>
              </div>
              <Divider style={{ margin: "0.5rem" }} />
              <Row gutter={12}>
                <Col gutter={12}>
                  <Button
                    onClick={() =>
                      props.history.push(`/startup/${r.username}`, {
                        data: r,
                      })
                    }
                    style={{ color: "#37561b" }}
                    type="link"
                  >
                    view startup
                  </Button>
                </Col>
                <Col gutter={12}>
                  <Button style={{ color: "#37561b" }} type="link">
                    Export Excel
                  </Button>
                </Col>
                <Col gutter={12}>
                  <Button style={{ color: "#37561b" }} type="link">
                    send email
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        ))}
        {[...new Array(2 - (payload.length % 2)).fill()].map((r, i) => (
          <div
            key={i}
            style={{ width: 550, margin: "1rem", visibility: "hidden" }}
          />
        ))}
      </Row>
      {/* <div className="card-row">
        <div className="card2">
          <div className="card-content-column">
            <div className="card2-row">
              <div className="card-content-row-avatar">
                <GroupsIcon style={{ fontSize: "18px", color: "#36561b56" }} />
              </div>
              <h3>Team members</h3>
            </div>
            <h1>
              {filterUsers?.length}{" "}
              {filterUsers?.length === 1 ? "member" : "members"}
            </h1>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card2-row">
              <div className="card-content-row-avatar">
                <GroupsIcon style={{ fontSize: "18px", color: "#36561b56" }} />
              </div>
              <h3 className="card-txt">Startups</h3>
            </div>
            <h1>
              {startups?.length}{" "}
              {startups?.length === 1 ? "startup" : "startups"}
            </h1>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card2-row">
              <div className="card-content-row-avatar">
                <TrendingUpIcon
                  style={{ fontSize: "18px", color: "#36561b56" }}
                />
              </div>
              <h3>Total Revenue(catalyzer)</h3>
            </div>
            <h1>
              Shs{" "}
              {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            </h1>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card2-row">
              <div className="card-content-row-avatar">
                <TrendingUpIcon
                  style={{ fontSize: "18px", color: "#36561b56" }}
                />
              </div>
              <h3>Total Revenue Share Payment(catalyzer)</h3>
            </div>
            <h1>
              shs{" "}
              {Number.isNaN(totalExpectedRevenuePaid)
                ? 0
                : totalExpectedRevenuePaid
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="add-startup-row">
        <div className="export-container">
          <DownloadTableExcel
            filename="Catalyzer Startups"
            sheet="Startup Records"
            currentTableRef={tableRef.current}
          >
            <button> Generate excel sheet </button>
          </DownloadTableExcel>
        </div>
      </div>
      <Table
        ref={tableRef}
        columns={columns}
        dataSource={[
          ...filterUsers?.map((r) => ({
            ...r,
            key: r._id,
          })),
        ]}
        title={() => <h3>Mentors</h3>}
        style={{ width: "95%" }}
        bordered={true}
        loading={loading}
        pagination={{
          defaultPageSize: 9,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      /> */}
    </div>
  );
};
export default withRouter(TeamLead);
