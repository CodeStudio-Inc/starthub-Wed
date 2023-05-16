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

import AddFeatures from "./components/AddFeatures";
import AddCategories from "./components/AddCategories";
import AddDiagnostics from "./components/AddDiagnostics";
import AddTeamLead from "./modals/AddTeamLead";
import "./AdminPanel.css";
import "../../Pages/Auth/AuthStyles.css";
const AdminPanel = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { users } = useSelector((state) => state.admin);
  const { userId, category, loading } = useSelector((state) => state.auth);

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
      <div className="admin-row">
        <div className="admin-left-container">
          <div className="admin-card-row">
            <div className="admin-card">
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
            <div className="admin-card">
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
            <div className="admin-card">
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
            <div className="admin-card">
              <div className="card-content-column">
                <div className="card-content-row-avatar">
                  <GroupsIcon style={{ fontSize: "30px", color: "#37561b" }} />
                </div>
                <h1>
                  {startups.length}{" "}
                  {startups.length === 1 ? "startup" : "startups"}
                </h1>
                <h3 className="card-txt">view startups</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-right-container">
          <AddFeatures
            actionCreators={actionCreators}
            dispatch={dispatch}
            loading={loading}
            svg={svg}
          />
          <AddCategories
            actionCreators={actionCreators}
            dispatch={dispatch}
            loading={loading}
            svg={svg}
          />
          <AddDiagnostics
            actionCreators={actionCreators}
            dispatch={dispatch}
            loading={loading}
            svg={svg}
          />
        </div>
      </div>
    </div>
  );
};
export default withRouter(AdminPanel);
