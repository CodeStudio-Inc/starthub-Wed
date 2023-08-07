import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Table, message, Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { actionCreators, ModalUI, svg } from "../../Paths";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddCardIcon from "@mui/icons-material/AddCard";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Helmet } from "react-helmet";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import AddStartup from "./modals/AddStartup";
import MakePayment from "./modals/MakePayment";
import "./StartupStyles.css";
import "../../Pages/Auth/AuthStyles.css";
const Startups = (props) => {
  const [openAddStartup, setOpenAddStartup] = React.useState(false);
  const [openPayment, setOpenPayment] = React.useState(false);
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [record, setRecord] = React.useState({});
  const [email, setEmail] = React.useState("");

  const handleAddStarupOpen = () => setOpenAddStartup(true);
  const handleAddStarupClose = () => setOpenAddStartup(false);

  const handleAddPaymentOpen = () => setOpenPayment(true);
  const handleAddPaymentClose = () => setOpenPayment(false);

  const editEmail = () => setEmailEdit(true);
  const cancelEdit = () => setEmailEdit(false);

  const { users, loader } = useSelector((state) => state.admin);
  const { userId, category, features } = useSelector((state) => state.auth);
  // console.log(category.includes("catalyzer"));

  const tableRef = React.useRef(null);

  const mentor = users.find((el) => el._id === userId);
  const mentorNumberOfTeams = mentor?.teams.length;
  const teams = mentor?.teams?.map((r) => r.startup);

  const revenueTotal = users.filter(
    (el) =>
      teams.includes(el.username) &&
      typeof el.totalRevenue !== "undefined" &&
      typeof el.totalExpense !== "undefined"
  );

  const totalRevenue = Array.from(
    revenueTotal,
    ({ totalRevenue }) => totalRevenue
  ).reduce((a, b) => a + b, 0);
  const totalExpense = Array.from(
    revenueTotal,
    ({ totalExpense }) => totalExpense
  ).reduce((a, b) => a + b, 0);
  const totalExpectedRevenuePaid = Array.from(
    revenueTotal,
    ({ totalRevSharePaid }) => totalRevSharePaid
  ).reduce((a, b) => a + b, 0);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getStartups();
    getFeatures();
    getCategories();
    getDiagnostics();
  }, []);

  const getStartups = () => dispatch(actionCreators.getUsers());
  const getFeatures = () => dispatch(actionCreators.getFeatures());
  const getCategories = () => dispatch(actionCreators.getCategories());
  const getDiagnostics = () => dispatch(actionCreators.getDiagnostics());

  return (
    <div className="startups-container">
      <Helmet>
        <title>Startups Overview</title>
      </Helmet>
      <Modal
        open={openAddStartup}
        onClose={handleAddStarupClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddStartup setOpen={handleAddStarupClose} />
      </Modal>
      <Modal
        open={openPayment}
        onClose={handleAddPaymentClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <MakePayment startups={filterUsers} setOpen={handleAddPaymentClose} /> */}
      </Modal>
      {category.includes("catalyzer") ? (
        <div className="card-row">
          <div className="card2">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card2-content-row-avatar">
                  <GroupsIcon style={{ fontSize: "18px", color: "#37561b" }} />
                </div>
                <h3>Startups</h3>
              </div>
              <h1>
                {mentorNumberOfTeams}{" "}
                {mentorNumberOfTeams === 1 ? "team" : "teams"}
              </h1>
            </div>
          </div>
          <div className="card2">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card2-content-row-avatar">
                  <TrendingUpIcon
                    style={{ fontSize: "18px", color: "#37561b" }}
                  />
                </div>
                <h3>Total Revenue(catalyzer)</h3>
              </div>

              <h1>
                Shs{" "}
                {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h1>
            </div>
          </div>
          <div className="card2">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card2-content-row-avatar">
                  <TrendingUpIcon
                    style={{ fontSize: "18px", color: "#37561b" }}
                  />
                </div>
                <h3>Total Expenses(catalyzer)</h3>
              </div>

              <h1>
                Shs{" "}
                {totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h1>
            </div>
          </div>
          <div className="card2">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card2-content-row-avatar">
                  <TrendingUpIcon
                    style={{ fontSize: "18px", color: "#37561b" }}
                  />
                </div>
                <h3>Total Revenue Share Payment(catalyzer)</h3>
              </div>

              <h1>
                Shs{" "}
                {Number.isNaN(totalExpectedRevenuePaid)
                  ? 0
                  : totalExpectedRevenuePaid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h1>
            </div>
          </div>
          {/* <div className="card2">
          <div className="card-content-column">
            <div className="card2-row">
              <div className="card2-content-row-avatar">
                <TrendingUpIcon
                  style={{ fontSize: "18px", color: "#37561b" }}
                />
              </div>
              <h3>Outstanding Revenue Share Payment</h3>
            </div>

            <h1>0 shs</h1>
          </div>
        </div> */}
        </div>
      ) : null}
      <div className="add-startup-row">
        {features.includes("add loans") ? (
          <div className="add-startup-button" onClick={setOpenPayment}>
            <AddCardIcon
              style={{
                fontSize: "20px",
                color: "#fff",
                marginRight: "0.5rem",
              }}
            />
            <p>Add Payment</p>
          </div>
        ) : null}
        {/* <div className="add-startup-button" onClick={setOpenAddStartup}>
          <ControlPointIcon
            style={{ fontSize: "20px", color: "#fff", marginRight: "0.5rem" }}
          />
          <p>Add new Startup</p>
        </div> */}
      </div>
      <h3>Recent Activity</h3>
      <Timeline mode="right" style={{ width: "60%" }}>
        <Timeline.Item
          label="Date 1"
          dot={
            <ClockCircleOutlined
              style={{ color: "#37561b", fontSize: "20px" }}
            />
          }
        >
          user added new startup
        </Timeline.Item>
        <Timeline.Item
          label="Date 2"
          dot={
            <ClockCircleOutlined
              style={{ color: "#37561b", fontSize: "20px" }}
            />
          }
        >
          user loggedin
        </Timeline.Item>
        <Timeline.Item
          label="Date 3"
          dot={
            <ClockCircleOutlined
              style={{ color: "#37561b", fontSize: "20px" }}
            />
          }
        >
          user added new okrs
        </Timeline.Item>
        <Timeline.Item
          label="Date 4"
          dot={
            <ClockCircleOutlined
              style={{ color: "#37561b", fontSize: "20px" }}
            />
          }
        >
          user updated profile
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
export default withRouter(Startups);
