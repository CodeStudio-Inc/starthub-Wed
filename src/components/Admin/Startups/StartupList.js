import React from "react";
import { Table, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { svg, actionCreators } from "../../Paths";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import moment from "moment";

import "./StartupStyles.css";
const StartupList = ({ history, title }) => {
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [record, setRecord] = React.useState({});

  const { users, loader } = useSelector((state) => state.admin);
  const { userId, features } = useSelector((state) => state.auth);

  const tableRef = React.useRef(null);

  const dispatch = useDispatch();

  const mentor = users.find((r) => r._id === userId);
  const mentorTeamIds = mentor?.teams.map((r) => r.startupId);

  const filterUsers = users.filter(
    (el) => mentorTeamIds?.includes(el._id) && el.teamCategory === title
  );

  React.useEffect(() => {
    getStartups();
  }, []);

  const getStartups = () => dispatch(actionCreators.getUsers());

  const editEmail = () => setEmailEdit(true);
  const cancelEdit = () => setEmailEdit(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const updateStartup = () => {
    if (!email || !validateEmail(email))
      return message.info("Enter valid Email");
    dispatch(actionCreators.updateStartup(record._id, "", email, "", ""));
    getStartups();
    setEmailEdit(false);
  };

  const viewStartup = (r) => {
    const data = filterUsers.find((s) => s.username === r);
    if (title === "OIP") {
      history.push(`/diagnostics/${data.username}`, {
        data: data,
      });
    } else {
      history.push(`/startup/${data.username}`, {
        data: data,
      });
    }
  };

  const columns = [
    {
      title: "Startup",
      dataIndex: "username",
      key: "username",
      align: "left",
      width: "250px",
      fixed: true,
      render: (r) => (
        <div className="table-column-row" onClick={() => viewStartup(r)}>
          <div className="table-avatar">
            <h3>{r.substring(0, 1)}</h3>
          </div>
          <h5>{r.length > 10 ? r.substring(0, 10) + "..." : r}</h5>
          {loader && record.username === r ? (
            <img src={svg} style={{ height: "20px", width: "20px" }} />
          ) : (
            <div className="table-more-icon">
              <ArrowForwardIosRoundedIcon
                style={{ color: "#fff", fontSize: "14px" }}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      width: "250px",
      render: (r) => (
        <div className="table-email-cell">
          {emailEdit && record.email === r ? (
            <input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{r}</p>
          )}
          {emailEdit && record.email === r ? (
            <h4 onClick={updateStartup}>save</h4>
          ) : null}
          {emailEdit && record.email === r ? (
            <CancelRoundedIcon
              style={{ fontSize: "18px" }}
              className="email-icon"
              onClick={cancelEdit}
            />
          ) : (
            <EditIcon
              style={{ fontSize: "18px" }}
              className="email-icon"
              onClick={editEmail}
            />
          )}
        </div>
      ),
    },
    {
      title: "Last LoggedIn",
      dataIndex: "lastLoggedIn",
      key: "lastLoggedIn",
      align: "left",
      render: (r) => <p>{r ? moment(r).fromNow() : null}</p>,
    },
    {
      title: "Contract Date",
      dataIndex: "contractDate",
      key: "contractDate",
      align: "left",
    },
    // {
    //   title: "No. Months since last revenue submit",
    //   dataIndex: "daysSinceLastSubmit",
    //   key: "daysSinceLastSubmit",
    //   align: "center",
    //   render: (r) => <p>{r ? r : null}</p>,
    // },
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

  const columnz = [
    {
      title: "Startup",
      dataIndex: "username",
      key: "username",
      align: "left",
      width: "250px",
      render: (r) => (
        <div className="table-column-row" onClick={() => viewStartup(r)}>
          <div className="table-avatar">
            <h3>{r.substring(0, 1)}</h3>
          </div>
          <h5>{r.length > 10 ? r.substring(0, 10) + "..." : r}</h5>
          {loader && record.username === r ? (
            <img src={svg} style={{ height: "20px", width: "20px" }} />
          ) : (
            <div className="table-more-icon">
              <ArrowForwardIosRoundedIcon
                style={{ color: "#fff", fontSize: "14px" }}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      width: "250px",
      render: (r) => (
        <div className="table-email-cell">
          {emailEdit && record.email === r ? (
            <input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{r}</p>
          )}
          {emailEdit && record.email === r ? (
            <h4 onClick={updateStartup}>save</h4>
          ) : null}
          {emailEdit && record.email === r ? (
            <CancelRoundedIcon
              style={{ fontSize: "18px" }}
              className="email-icon"
              onClick={cancelEdit}
            />
          ) : (
            <EditIcon
              style={{ fontSize: "18px" }}
              className="email-icon"
              onClick={editEmail}
            />
          )}
        </div>
      ),
    },
    {
      title: "Last LoggedIn",
      dataIndex: "lastLoggedIn",
      key: "lastLoggedIn",
      align: "left",
      width: "250px",
      render: (r) => <p>{r ? moment(r).fromNow() : null}</p>,
    },
  ];

  return (
    <div className="startups-container">
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
        columns={typeof title === "undefined" ? columns : columnz}
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
              setRecord(record);
            },
          };
        }}
        style={{ width: "95%" }}
        bordered={true}
        scroll={{
          x: typeof title === "undefined" ? 2000 : 1000,
        }}
        title={() => <h3>{title} Startups</h3>}
        pagination={{
          defaultPageSize: 9,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default withRouter(StartupList);
