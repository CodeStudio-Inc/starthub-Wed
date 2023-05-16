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

import AddStartup from "./modals/AddStartup";
import MakePayment from "./modals/MakePayment";
import "./StartupStyles.css";
import "../../Pages/Auth/AuthStyles.css";
const Startups = (props) => {
  const [openAddStartup, setOpenAddStartup] = React.useState(false);
  const [openPayment, setOpenPayment] = React.useState(false);

  const handleAddStarupOpen = () => setOpenAddStartup(true);
  const handleAddStarupClose = () => setOpenAddStartup(false);

  const handleAddPaymentOpen = () => setOpenPayment(true);
  const handleAddPaymentClose = () => setOpenPayment(false);

  const { users } = useSelector((state) => state.admin);
  const { userId, category, features } = useSelector((state) => state.auth);

  const tableRef = React.useRef(null);

  const filterUsers = users.filter(
    (el) => el.teamCategory === category && el.creator === userId
  );
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
    getCategories();
    getDiagnostics();
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
      title: "Contract Date",
      dataIndex: "contractDate",
      key: "contractDate",
      align: "left",
    },
    {
      title: "No. Months since last revenue submit",
      dataIndex: "daysSinceLastSubmit",
      key: "daysSinceLastSubmit",
      align: "center",
      render: (r) => <p>{r ? r : null}</p>,
    },
    {
      title: "Last LoggedIn",
      dataIndex: "lastLoggedIn",
      key: "lastLoggedIn",
      align: "left",
      render: (r) => <p>{r ? moment(r).fromNow() : null}</p>,
    },
    {
      title: "Revenue Share %",
      dataIndex: "percentageRevShare",
      key: "percentageRevShare",
      align: "left",
      render: (r) => <p>{r}%</p>,
    },
    {
      title: "Additional Metrics",
      dataIndex: "additionalMetrics",
      key: "additionalMetrics",
      align: "center",
      render: (r) => <p>{r ? r : "-"}</p>,
    },
    {
      title: "RevenueSharePaid",
      dataIndex: "totalRevSharePaid",
      key: "totalRevSharePaid",
      align: "center",
    },
    {
      title: "ExpectedRevenueShare",
      dataIndex: "totalExpectedRevenueShare",
      key: "totalExpectedRevenueShare",
      align: "center",
    },
    {
      title: "LoanBalance",
      dataIndex: "totalLoanBalance",
      key: "totalLoanBalance",
      align: "center",
    },
  ];

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
        <MakePayment startups={filterUsers} setOpen={handleAddPaymentClose} />
      </Modal>
      <div className="card-row">
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <GroupsIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {filterUsers.length} {filterUsers.length === 1 ? "team" : "teams"}
            </h1>
            <h3>Startups</h3>
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
        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <TrendingUpIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>0 shs</h1>
            <h3>Outstanding Revenue Share Payment</h3>
          </div>
        </div>
      </div>
      <div className="add-startup-row">
        {features.includes("add loans") ? (
          <div className="add-startup-button" onClick={setOpenPayment}>
            <AddCardIcon
              style={{ fontSize: "20px", color: "#fff", marginRight: "0.5rem" }}
            />
            <p>Add Payment</p>
          </div>
        ) : null}
        <div className="export-container">
          <DownloadTableExcel
            filename="Catalyzer Startups"
            sheet="Startup Records"
            currentTableRef={tableRef.current}
          >
            <button> Generate excel sheet </button>
          </DownloadTableExcel>
        </div>
        {features.includes("add startups") ? (
          <div className="add-startup-button" onClick={setOpenAddStartup}>
            <ControlPointIcon
              style={{ fontSize: "20px", color: "#fff", marginRight: "0.5rem" }}
            />
            <p>Add new Startup</p>
          </div>
        ) : null}
      </div>
      <Table
        ref={tableRef}
        columns={columns}
        dataSource={[
          ...filterUsers.map((r) => ({
            ...r,
            key: r._id,
            username: r.username,
            dateCreated: moment(r.dateCreated).format("LL"),
            totalExpectedRevenueShare: Math.round(r.totalExpectedRevenueShare)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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
      />
    </div>
  );
};
export default withRouter(Startups);
