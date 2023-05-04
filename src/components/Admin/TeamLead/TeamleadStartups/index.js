import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Table } from "antd";
import { actionCreators, ModalUI, svg } from "../../../Paths";
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

import AddTeamMember from "../modals/AddTeamMember";
import "../TeamLead.css";
// import "../../Pages/Auth/AuthStyles.css";
const TeamLeadStartups = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { users } = useSelector((state) => state.admin);
  const { userId, category, loading } = useSelector((state) => state.auth);

  const tableRef = React.useRef(null);

  const filterUsers = users.filter(
    (el) => el.teamCategory === category && el.creator === userId
  );
  const startups = users.filter(
    (el) => el.teamLeadId === userId && el.userRole === "startup"
  );
  //   console.log(startups);

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

  return (
    <div className="startups-container">
      <Helmet>
        <title>TeamleadStartups Overview</title>
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
              {startups.length} {startups.length === 1 ? "startup" : "startups"}
            </h1>
            <h3>Total startups</h3>
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
            <h3>Total revenue</h3>
          </div>
        </div>

        <div className="card2">
          <div className="card-content-column">
            <div className="card-content-row-avatar">
              <TrendingUpIcon style={{ fontSize: "30px", color: "#37561b" }} />
            </div>
            <h1>
              {totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              Shs
            </h1>
            <h3>Total Expense</h3>
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
        {/* <div className="add-startup-button" onClick={handleOpen}>
          <ControlPointIcon
            style={{ fontSize: "20px", color: "#fff", marginRight: "0.5rem" }}
          />
          <p>Add new team member</p>
        </div> */}
      </div>
      <Table
        ref={tableRef}
        columns={columns}
        dataSource={[
          ...startups.map((r) => ({
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
      />
    </div>
  );
};
export default withRouter(TeamLeadStartups);
