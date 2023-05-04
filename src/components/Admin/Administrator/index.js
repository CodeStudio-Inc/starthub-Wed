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

import AddTeamLead from "./modals/AddTeamLead";
import "./AdminPanel.css";
import "../../Pages/Auth/AuthStyles.css";
const AdminPanel = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { users } = useSelector((state) => state.admin);
  const { userId, category } = useSelector((state) => state.auth);

  const tableRef = React.useRef(null);

  const filterUsers = users.filter((el) => el.creator === userId);
  const teamMembers = users.filter(
    (el) => el.adminId === userId && el.userRole === "team member"
  );
  const startups = users.filter(
    (el) => el.adminId === userId && el.userRole === "startup"
  );
  //   const startups = users.filter(u => )
  // console.log(teamMembers);
  const revenueTotal = users.filter(
    (el) => el.creator === userId && typeof el.totalRevenue !== "undefined"
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
  }, []);

  const columns = [
    {
      title: "Startup",
      dataIndex: "username",
      key: "username",
      align: "left",
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
    },
    {
      title: "Category",
      dataIndex: "teamCategory",
      key: "teamCategory",
      align: "left",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
      align: "left",
    },
    {
      title: "action",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (r) => <button>edit permissions</button>,
    },
    {
      title: "action",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (r) => <button>edit user role</button>,
    },
    {
      title: "action",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (r) => <button>remove access</button>,
    },
    {
      title: "action",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (r) => <button>view teams</button>,
    },
    {
      title: "action",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      render: (r) => <button>remove user</button>,
    },
  ];

  const getStartups = () => dispatch(actionCreators.getUsers());

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
        <AddTeamLead setOpen={handleClose} />
      </Modal>
      <div className="card-row">
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <GroupsIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {users.length} {users.length === 1 ? "user" : "total users"}
            </h1>
            <h3 className="card-txt">view users</h3>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <GroupsIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {filterUsers.length}{" "}
              {filterUsers.length === 1 ? "team lead" : "team leads"}
            </h1>
            <h3 className="card-txt">view team leads</h3>
          </div>
        </div>
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <GroupsIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {teamMembers.length}{" "}
              {teamMembers.length === 1 ? "team member" : "team members"}
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
      </div>
      {/* <div className="add-startup-row">
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
          <p>Add new team leads</p>
        </div>
      </div> */}
      {/* <Table
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
              props.history.push(`/startup/${record.username}`, {
                data: record,
              });
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
      /> */}
    </div>
  );
};
export default withRouter(AdminPanel);
