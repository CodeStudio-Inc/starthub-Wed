import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators, ModalUI } from "../../Paths";
import moment from "moment";
import { Line } from "react-chartjs-2";
import ReactGA, { set } from "react-ga";
import { Helmet } from "react-helmet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BalanceIcon from "@mui/icons-material/Balance";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { svg } from "../../Paths";
import { steps } from "../../utilities/json";

import ReportRevenue from "./modals/ReportRevenue";
import RevenueTable from "./modals/RevenueTable";
import LoanApplication from "./modals/LoanApplication";
import Diagnostics from "../../Admin/Startups/Diagnostics";
import DrawerModal from "../../ModalUI/DrawerModal";
import "./MetricsStyles.css";
import { message } from "antd";
const Metrics = ({ visible }) => {
  const [year, setYear] = React.useState("");
  const [openTableModal, setOpenTableModal] = React.useState(false);
  const [openReportModal, setOpenReportModal] = React.useState(false);
  const [revenueTable, setRevenueTable] = React.useState(false);
  const [loanApplication, setLoanApplication] = React.useState(false);

  const { payload } = useSelector((state) => state.diagnostics);
  const { revenue, loader } = useSelector((state) => state.admin);
  const {
    userId,
    token,
    username,
    category,
    userRole,
    totalExpectedRevenueShare,
    totalRevSharePaid,
    totalRevenue,
    totalExpense,
    loanEligibility,
    loanEligibilityMsg,
    loanApplicationDate,
    eligibilityCheck,
    diagnostics,
  } = useSelector((state) => state.auth);

  const tableRef = React.useRef(null);

  React.useEffect(() => {
    loanEligibilityCheck();
    getRevenue();
    getUser();
    ReactGA.pageview(window.location.pathname);
  }, []);

  const dispatch = useDispatch();
  const teams = ["OIP", "SheTechs", "UDSM", "LPUSP","Greenovation"];

  const getRevenue = () => dispatch(actionCreators.getStartupRevenue());
  const getUser = () => dispatch(actionCreators.getUser(userId, token));
  const getDiagnostics = () => dispatch(actionCreators.getDiagnostics());
  const loanEligibilityCheck = () =>
    dispatch(actionCreators.loanEligibilityCheck());
  const searchRevenueYear = () => {
    if (!year) return;
    dispatch(actionCreators.filterStartupRevenue(year));
    setYear("");
  };

  const openRevenueTable = () => setOpenTableModal(true);
  const closeRevenueTable = () => setOpenTableModal(false);

  const openRevenueReport = () => setOpenReportModal(true);
  const closeRevenueReport = () => setOpenReportModal(false);

  const sortRevenue = React.useMemo(() => {
    return revenue.sort(({ date: a }, { date: b }) =>
      a < b ? -1 : a > b ? 1 : 0
    );
  }, [revenue]);

  let reportingYear = revenue && revenue.at(-1);

  const revenueTotal = React.useMemo(() => {
    let totelMonthRevenue = Array.from(
      revenue,
      ({ month_revenue }) => month_revenue
    ).reduce((a, b) => a + b, 0);
    let totelMonthExpense = Array.from(
      revenue,
      ({ month_expense }) => month_expense
    ).reduce((a, b) => a + b, 0);
    let totelRevSharepayment = Array.from(
      revenue,
      ({ revSharepayment }) => revSharepayment
    ).reduce((a, b) => a + b, 0);

    return {
      revenue: totelMonthRevenue,
      expense: totelMonthExpense,
      payment: totelRevSharepayment,
      year: typeof reportingYear === "undefined" ? "" : reportingYear.year,
    };
  }, [revenue, reportingYear]);

  const rev = sortRevenue.map((el) => el.month_revenue);
  const expense = sortRevenue.map((el) => el.month_expense);
  const pay = sortRevenue.map((el) => el.revSharepayment);
  const months = Array.from(sortRevenue, ({ month }) => month);

  const Revenue = {
    labels: months,
    datasets: [
      {
        label: "Monthly Revenue (UGX)",
        backgroundColor: "#dfa126",
        borderColor: "#dfa126",
        borderWidth: 1,
        data: rev,
      },
      {
        label: "Monthly Expenses (UGX)",
        backgroundColor: "#37561b",
        borderColor: "#37561b",
        borderWidth: 1,
        data: expense,
      },
      {
        label: "Revenue Share Payment (UGX)",
        backgroundColor: "#7e2527",
        borderColor: "#7e2527",
        borderWidth: 1,
        data: pay,
      },
    ],
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "left",
    },
    {
      title: "Monthly Revenue(UGX)",
      dataIndex: "revenue",
      key: "revenue",
      align: "left",
    },
    {
      title: "Monthly Expense(UGX)",
      dataIndex: "expense",
      key: "expense",
      align: "left",
    },
    {
      title: "Expected Revenue Share Payment(UGX)",
      dataIndex: "expectedRevsharePayment",
      key: "expectedRevsharePayment",
      align: "left",
    },
  ];

  const card_content = [
    {
      id: 1,
      label: "Loan Eligibility",
      amount: loanEligibility,
      icon: <CreditScoreIcon style={{ fontSize: "25px", color: "#37561b" }} />,
    },
    {
      id: 2,
      label: "Total Revenue",
      amount:
        typeof totalRevenue === "undefined"
          ? 0
          : totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      icon: <TrendingUpIcon style={{ fontSize: "25px", color: "#37561b" }} />,
    },
    {
      id: 3,
      label: "Total Expense",
      amount:
        typeof totalExpense === "undefined"
          ? 0
          : totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      icon: <TrendingUpIcon style={{ fontSize: "25px", color: "#37561b" }} />,
    },
    {
      id: 4,
      label: "Total Revenue Share Payment",
      amount:
        typeof totalRevSharePaid === "undefined"
          ? 0
          : totalRevSharePaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      icon: <SavingsIcon style={{ fontSize: "25px", color: "#37561b" }} />,
    },
    {
      id: 5,
      label: "Expected Revenue Share Payment",
      amount:
        typeof totalExpectedRevenueShare === "undefined"
          ? 0
          : totalExpectedRevenueShare
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      icon: <BalanceIcon style={{ fontSize: "25px", color: "#37561b" }} />,
    },
    {
      id: 6,
      label: "Loan Balance(includes interest)",
      amount: 0,
      icon: <BalanceIcon style={{ fontSize: "25px", color: "#37561b" }} />,
    },
  ];

  // console.log(diagnostics);

  const diagnosticTool = [
    ...payload?.map((d) => ({ tool: d.title, score: Math.round(d.score) })),
  ];

  const Cards = () => (
    <div className="revenue-card-row">
      {card_content.map((c) => (
        <div
          className={visible ? "revenue-card revenue-width" : "revenue-card"}
          key={c.id}
        >
          <div className="revenue-card-content-column">
            {c.id === 1 ? null : (
              <div className="revenue-card-content-row-avatar">{c.icon}</div>
            )}
            {c.id !== 1 ? null : (
              <h2>{Number.isNaN(c.amount) ? 0 : c.amount}</h2>
            )}
            {c.id === 1 ? null : (
              <h1>{Number.isNaN(c.amount) ? 0 : c.amount} Shs</h1>
            )}
            <h3>{c.label}</h3>
            {c.id === 1 ? (
              <h4>
                {loanEligibilityMsg}{" "}
                {eligibilityCheck ? (
                  <strong style={{ color: "#dfa126" }}>
                    {loanApplicationDate.substring(0, 10)}
                  </strong>
                ) : null}
              </h4>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="metrics-container">
      <DrawerModal
        open={openReportModal}
        close={closeRevenueReport}
        title="Report Revenue"
      >
        <ReportRevenue close={closeRevenueReport} />
      </DrawerModal>
      <DrawerModal
        open={openTableModal}
        close={closeRevenueTable}
        title="Revenue Table"
      >
        <RevenueTable
          revenue={sortRevenue}
          columns={columns}
          svg={svg}
          dispatch={dispatch}
          username={username}
          actionCreators={actionCreators}
          revenueTotal={revenueTotal}
          tableRef={tableRef}
        />
      </DrawerModal>

      {loanApplication ? (
        <ModalUI setClose={setLoanApplication}>
          <LoanApplication setOpen={setLoanApplication} />
        </ModalUI>
      ) : null}
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {teams.includes(category) ? null : <Cards />}
      <div className="metric-btn-row" />
      {teams.includes(category) ? (
        <Diagnostics diagnosticTool={diagnosticTool} />
      ) : (
        <div className="revenue">
          <div className="graph-row">
            <button onClick={openRevenueReport}>Report Revenue</button>
            <button onClick={openRevenueTable}>View Reported Revenue</button>
          </div>
          <h3>{revenueTotal.year} Revenue Reporting Graph</h3>
          <div className="search-box-row">
            <input
              placeholder="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <button onClick={searchRevenueYear}>search</button>
          </div>
          <div className="rev-total">
            <h4>
              Total Revenue Reported{" "}
              <strong
                style={{
                  color: "#dfa126",
                  fontSize: "18px",
                  marginBottom: "1 rem",
                }}
              >
                {revenueTotal.revenue
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Shs
              </strong>
            </h4>
            <h4>
              Total Expenses Reported{" "}
              <strong
                style={{
                  color: "#37561b",
                  fontSize: "18px",
                  marginBottom: "1 rem",
                }}
              >
                {revenueTotal.expense
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Shs
              </strong>
            </h4>
            <h4>
              Total Revenue Share Payment{" "}
              <strong
                style={{
                  color: "#7e2527",
                  fontSize: "18px",
                  marginBottom: "1 rem",
                }}
              >
                {revenueTotal.payment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Shs
              </strong>
            </h4>
          </div>
          <Line data={Revenue} width={100} height={30} />
          <Diagnostics diagnosticTool={diagnosticTool} />
        </div>
      )}
    </div>
  );
};

export default withRouter(Metrics);
