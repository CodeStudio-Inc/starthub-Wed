import React from "react";
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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AddTeamMember from "./modals/AddTeamMember";
import "./TeamLead.css";
// import "../../Pages/Auth/AuthStyles.css";
const TeamLead = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ID, setID] = React.useState("");
  const [permission, setPermission] = React.useState("");
  const [editPermission, setEditPermission] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [editRole, setEditRole] = React.useState(false);

  const { users } = useSelector((state) => state.admin);
  const { userId, category, loading } = useSelector((state) => state.auth);

  const tableRef = React.useRef(null);

  const filterUsers = users.filter(
    (el) => el.teamCategory === category && el.creator === userId
  );
  const startups = users.filter(
    (el) => el.teamLeadId === userId && el.userRole === "startup"
  );
  // console.log(ID);

  const revenueTotal = users.filter(
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
  }, []);

  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const showPermissionInput = () => setEditPermission(true);
  const editUserPermission = () =>
    dispatch(
      actionCreators.editUserPermissions(ID, permission, (res) => {
        const { success } = res;
        if (success) {
          setEditPermission(false);
          setID("");
        }
      })
    );

  const showRoleInput = () => setEditRole(true);
  const editUserRole = () =>
    dispatch(
      actionCreators.editUserRole(ID, role, (res) => {
        const { success } = res;
        if (success) {
          setEditRole(false);
          setID("");
        }
      })
    );

  const columns = [
    {
      title: "Startup",
      dataIndex: "username",
      key: "username",
      align: "left",
      width: "100px",
      fixed: true,
      render: (r) => (
        <div className="table-column-row">
          <div className="table-avatar">
            <h3>{r.substring(0, 1)}</h3>
          </div>
          <h5>{r}</h5>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      width: "90px",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      align: "left",
      width: "90px",
      render: (r) => (
        <div className="table-cell-row ">
          {!editPermission ? <p>{r}</p> : null}
          {editPermission ? (
            <FormControl sx={{ m: 1, minWidth: 130, minHeight: 40 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                permission
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={permission}
                onChange={handlePermissionChange}
                autoWidth
                style={{
                  height: 50,
                }}
                label="permission"
              >
                <MenuItem value="owner">owner</MenuItem>
                <MenuItem value="member">member</MenuItem>
              </Select>
            </FormControl>
          ) : null}
          <button
            onClick={!editPermission ? showPermissionInput : editUserPermission}
          >
            {!editPermission ? "change permission" : "save"}
          </button>
          {loading ? (
            <img src={svg} style={{ height: "20px", width: "20px" }} />
          ) : null}
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
      align: "left",
      width: "90px",
      render: (r) => (
        <div className="table-cell-row ">
          {!editRole ? <p>{r}</p> : null}
          {editRole ? (
            <FormControl sx={{ m: 1, minWidth: 130, minHeight: 40 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                user role
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={role}
                onChange={handleRoleChange}
                autoWidth
                style={{
                  height: 50,
                }}
                label="user role"
              >
                <MenuItem value="team lead">team lead</MenuItem>
                <MenuItem value="team member">team member</MenuItem>
              </Select>
            </FormControl>
          ) : null}
          <button onClick={!editRole ? showRoleInput : editUserRole}>
            {!editRole ? "change role" : "save"}
          </button>
          {loading ? (
            <img src={svg} style={{ height: "20px", width: "20px" }} />
          ) : null}
        </div>
      ),
    },
    {
      title: "action",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      width: "90px",
      render: (r) => (
        <button className="table-cell-view-button">remove team member</button>
      ),
    },
  ];

  const getStartups = () => dispatch(actionCreators.getUsers());
  const getFeatures = () => dispatch(actionCreators.getFeatures());

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
            <div className="card-content-row-avatar">
              <GroupsIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {filterUsers.length}{" "}
              {filterUsers.length === 1 ? "team member" : "team member"}
            </h1>
            <h3 className="card-txt">view team members</h3>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <GroupsIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {startups.length} {startups.length === 1 ? "startup" : "startups"}
            </h1>
            <h3 className="card-txt">view startups</h3>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <TrendingUpIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              Shs
            </h1>
            <h3>Total Revenue</h3>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <TrendingUpIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {totalExpectedRevenuePaid
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              shs
            </h1>
            <h3>Total Revenue Share Payment</h3>
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
          ...filterUsers.map((r) => ({
            ...r,
            key: r._id,
          })),
        ]}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setID(record._id);
            },
          };
        }}
        style={{ width: "95%" }}
        bordered={true}
        scroll={{
          x: 2000,
        }}
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
