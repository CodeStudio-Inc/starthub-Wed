import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Table } from "antd";
import { actionCreators, ModalUI, svg } from "../../Paths";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddCardIcon from "@mui/icons-material/AddCard";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Helmet } from "react-helmet";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CancelIcon from "@mui/icons-material/Cancel";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { message } from "antd";

import AddTeamMember from "./modals/AddTeamMember";
import "./TeamLead.css";
// import "../../Pages/Auth/AuthStyles.css";
const TeamLead = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ID, setID] = React.useState("");
  const [permission, setPermission] = React.useState("");
  const [activeRowIndex, setRowIndex] = React.useState(null);
  const [assignIndex, setAssignIndex] = React.useState(null);
  const [startup, setStartup] = React.useState("");
  const [editstartup, setEditStartup] = React.useState(false);
  const [editPermission, setEditPermission] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [editRole, setEditRole] = React.useState(false);
  const [payload, setPayload] = React.useState([]);
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [record, setRecord] = React.useState({});
  const [email, setEmail] = React.useState("");

  const { userId, category } = useSelector((state) => state.auth);
  const { loading, users } = useSelector((state) => state.requests);

  const tableRef = React.useRef(null);

  const filterUsers =
    users &&
    users.filter(
      (el) => el.teamCategory === category && el.userRole === "team member"
    );
  const startups =
    users &&
    users?.filter(
      (el) => el.teamCategory === category && el.userRole === "startup"
    );

  // console.log(filterUsers);
  // console.log(users);

  const updateUsers = () => {
    const newPayload = [
      ...filterUsers?.map((el) => {
        const { _id, userRole, permissions, ...rest } = el;
        return {
          ...rest,
          id: _id,
          permission: { id: _id, value: permissions },
          role: { id: _id, value: userRole },
          permissions: permissions,
          uaerRole: userRole,
        };
      }),
    ];
    return setPayload(newPayload);
  };

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
    updateUsers();
    getCategories();
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

  const editUserPermission = () =>
    dispatch(
      actionCreators.editUserPermissions(ID, permission, (res) => {
        const { success } = res;
        if (success) {
          setEditPermission(false);
          setID("");
          message.info("Permission will be updated shortly");
        }
      })
    );

  const editUserRole = () =>
    dispatch(
      actionCreators.editUserRole(ID, role, (res) => {
        const { success } = res;
        if (success) {
          setEditRole(false);
          setID("");
          message.info("Role will be updated shortly");
        }
      })
    );

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
                console.log(record);
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
              style={{ fontSize: "20px", color: "#37561b" }}
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
              {startups.map((r) => (
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
              assign team
            </h4>
          ) : null}
          {assignIndex === rowIndex ? (
            <h4 onClick={assignStartup}>save</h4>
          ) : null}
          {assignIndex === rowIndex ? (
            <CancelIcon
              style={{ fontSize: "20px", color: "#37561b" }}
              className="icon"
              onClick={() => setAssignIndex(null)}
            />
          ) : null}
        </div>
      ),
    },
  ];

  const getStartups = () => {
    dispatch(
      actionCreators.getItem(`/auth/users`, (res) => {
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

  return (
    <div className="startups-container">
      <Helmet>
        <title>Startups Overview</title>
      </Helmet>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddTeamMember setOpen={handleClose} />
      </Modal>
      <div className="card-row">
        <div className="card2">
          <div className="card-content-column">
            <div className="card2-row">
              <div className="card-content-row-avatar">
                <GroupsIcon style={{ fontSize: "18px", color: "#37561b" }} />
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
                <GroupsIcon style={{ fontSize: "18px", color: "#37561b" }} />
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
                  style={{ fontSize: "18px", color: "#37561b" }}
                />
              </div>
              <h3>Total Revenue</h3>
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
                  style={{ fontSize: "18px", color: "#37561b" }}
                />
              </div>
              <h3>Total Revenue Share Payment</h3>
            </div>
            <h1>
              shs{" "}
              {totalExpectedRevenuePaid
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
        <div className="add-startup-button" onClick={handleOpen}>
          <ControlPointIcon
            style={{ fontSize: "20px", color: "#fff", marginRight: "0.5rem" }}
          />
          <p>Add new team member</p>
        </div>
      </div>
      <Table
        ref={tableRef}
        columns={columns}
        dataSource={[
          ...filterUsers?.map((r) => ({
            ...r,
            key: r.id,
          })),
        ]}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => {
        //       setID(record.id);
        //       setRecord(record);
        //     },
        //   };
        // }}
        style={{ width: "95%" }}
        bordered={true}
        // scroll={{
        //   x: 2000,
        // }}
        loading={loading}
        pagination={{
          defaultPageSize: 9,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};
export default withRouter(TeamLead);
