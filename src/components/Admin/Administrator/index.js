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
import AssignmentIcon from "@mui/icons-material/Assignment";

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
  const [payload, setPayload] = React.useState([]);
  const [paylod, setPaylod] = React.useState([]);
  const [diagnostic, setDiagnostic] = React.useState([]);

  const { users } = useSelector((state) => state.admin);
  const { profiles } = useSelector((state) => state.profile);
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
    // getProfiles();
    // updateProfileObject();
    // updateStartupObject();
  }, []);

  const getStartups = () => dispatch(actionCreators.getUsers());

  // const getProfiles = () => dispatch(actionCreators.getAllProfiles());

  // const kawu = startups.find((s) => s.username === "postman")?.diagnostics;

  // const updateStartupObject = () => {
  //   let newPayload = [];
  //   newPayload = [
  //     ...kawu.map((k) => {
  //       const { title, score, steps } = k;
  //       let newSteps = [...steps.filter((j) => j.checked)];
  //       return {
  //         startup: "postman",
  //         category: title,
  //         score: score,
  //         steps: newSteps,
  //       };
  //     }),
  //   ];
  //   return setPaylod(newPayload);
  // };

  // console.log(paylod);

  // const updateProfileObject = () => {
  //   let newPayload = [];
  //   newPayload = [
  //     ...profiles.map((p) => {
  //       const { creator, finance, customer, journey, businessModal, ...rest } =
  //         p;
  //       let newCustomer = [...customer.filter((c) => c.checked)];
  //       let newJourney = [...journey.filter((j) => j.checked)];
  //       let newModel = [...businessModal.filter((b) => b.checked)];
  //       let startup = startups.find((s) => s._id === creator);
  //       let products = finance?.products.map((p) => ({
  //         name: p.name,
  //         price: p.price,
  //         unitPrice: p.unitPrice,
  //       }));
  //       return {
  //         ...rest,
  //         startup: startup.username,
  //         fullMonthRevenue: finance?.fullMonthRevenue,
  //         lifeTimeRevenue: finance?.lifeTimeRevenue,
  //         monthYear: finance?.monthYear,
  //         products: !finance?.products ? [] : products,
  //         customer: !customer.length ? [] : newCustomer,
  //         journey: !journey.length ? [] : newJourney,
  //         businessModal: !businessModal.length ? [] : newModel,
  //       };
  //     }),
  //   ];
  //   return setPayload(newPayload);
  // };

  // const columz = [
  //   {
  //     title: "Startup",
  //     dataIndex: "startup",
  //     key: "startup",
  //     align: "left",
  //   },
  //   {
  //     title: "Category",
  //     dataIndex: "category",
  //     key: "category",
  //     align: "left",
  //   },
  //   {
  //     title: "Score",
  //     dataIndex: "score",
  //     key: "score",
  //     align: "left",
  //     render: (r) => <p>{Math.round(r)}%</p>,
  //   },
  //   {
  //     title: "Steps",
  //     dataIndex: "steps",
  //     key: "steps",
  //     align: "left",
  //     render: (r) => (
  //       <div>
  //         {r.map((s) => (
  //           <p>{s.step}</p>
  //         ))}
  //       </div>
  //     ),
  //   },
  // ];

  // const columns = [
  //   {
  //     title: "Startup",
  //     dataIndex: "startup",
  //     key: "startup",
  //     align: "left",
  //   },
  //   {
  //     title: "Founder",
  //     dataIndex: "founder",
  //     key: "founder",
  //     align: "left",
  //     render: (r) => (
  //       <div className="admin-table-cells">
  //         {r.map((f) => (
  //           <div className="admin-table-cells">
  //             <div className="admin-table-cells-row">
  //               <p>Name: </p>
  //               <p>{f.name}</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Time: </p>
  //               <p>{f.time}%</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Focus: </p>
  //               <p>{f.focus}</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Finance: </p>
  //               <p>{f.finance}</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Growth: </p>
  //               <p>{f.growth}</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Operations: </p>
  //               <p>{f.operations}</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Communication: </p>
  //               <p>{f.communication}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Customer",
  //     dataIndex: "customer",
  //     key: "customer",
  //     align: "left",
  //     render: (r) => (
  //       <div className="admin-table-cells">
  //         {r.map((c) => (
  //           <p>{c.name}</p>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Business Modal",
  //     dataIndex: "businessModal",
  //     key: "businessModal",
  //     align: "left",
  //     render: (r) => (
  //       <div className="admin-table-cells">
  //         {r.map((b) => (
  //           <p>{b.name}</p>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "LifeTime Revenue",
  //     dataIndex: "lifeTimeRevenue",
  //     key: "lifeTimeRevenue",
  //     align: "left",
  //     render: (r) => <p>{r?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$</p>,
  //   },
  //   {
  //     title: "Full Month Revenue",
  //     dataIndex: "fullMonthRevenue",
  //     key: "fullMonthRevenue",
  //     align: "left",
  //     render: (r) => <p>{r?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$</p>,
  //   },
  //   {
  //     title: "Full Month, Month & Year",
  //     dataIndex: "monthYear",
  //     key: "monthYear",
  //     align: "left",
  //     render: (r) => <p>{r?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>,
  //   },
  //   {
  //     title: "Products",
  //     dataIndex: "products",
  //     key: "products",
  //     align: "left",
  //     render: (r) => (
  //       <div className="admin-table-cells">
  //         {r.map((p) => (
  //           <div className="admin-table-cells">
  //             <div className="admin-table-cells-row">
  //               <p>Name: </p>
  //               <p>{p.name}</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Price: </p>
  //               <p>{p.price}$</p>
  //             </div>
  //             <div className="admin-table-cells-row">
  //               <p>Unit Cost: </p>
  //               <p>{p.unitCost}$</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Goal",
  //     dataIndex: "goal",
  //     key: "goal",
  //     align: "left",
  //   },
  //   {
  //     title: "Pitch",
  //     dataIndex: "pitch",
  //     key: "pitch",
  //     align: "left",
  //   },
  //   {
  //     title: "Journey",
  //     dataIndex: "journey",
  //     key: "journey",
  //     align: "left",
  //     render: (r) => (
  //       <div className="admin-table-cells">
  //         {r.map((j) => (
  //           <p>{j.name}</p>
  //         ))}
  //       </div>
  //     ),
  //   },
  // ];

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
        <div className="admin-card-row">
          <div className="admin-card">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <GroupsIcon style={{ fontSize: "18px", color: "#37561b" }} />
                </div>
                <h3>view users</h3>
              </div>
              <h1>
                {users.length} {users.length === 1 ? "user" : "total users"}
              </h1>
            </div>
          </div>
          <div className="admin-card">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <GroupsIcon style={{ fontSize: "18px", color: "#37561b" }} />
                </div>
                <h3 className="card-txt">Team leads</h3>
              </div>
              <h1>
                {filterUsers.length}{" "}
                {filterUsers.length === 1 ? "lead" : "leads"}
              </h1>
            </div>
          </div>
          <div className="admin-card">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <GroupsIcon style={{ fontSize: "18px", color: "#37561b" }} />
                </div>
                <h3 className="card-txt">Team members</h3>
              </div>
              <h1>
                {teamMembers.length}{" "}
                {teamMembers.length === 1 ? "member" : "members"}
              </h1>
            </div>
          </div>
          <div className="admin-card">
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <GroupsIcon style={{ fontSize: "18px", color: "#37561b" }} />
                </div>
                <h3 className="card-txt">Startups</h3>
              </div>
              <h1>
                {startups.length}{" "}
                {startups.length === 1 ? "startup" : "startups"}
              </h1>
            </div>
          </div>
        </div>
        {/* <div className="admin-navigation">
          <div className="navigation-cards">
            <div>
              <h3>Generate reports</h3>
              <p>Startup profiles and diagnostic reports</p>
            </div>
            <AssignmentIcon style={{ color: "#37561b", fontSize: "40PX" }} />
          </div>
          <DownloadTableExcel
            filename="postman Diagnostics Report"
            sheet="Diagnostics"
            currentTableRef={tableRef.current}
          >
            <button> Generate excel sheet </button>
          </DownloadTableExcel>
        </div> */}
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
        {/* <Table
          style={{ width: "100%", marginTop: "1rem" }}
          ref={tableRef}
          columns={columz}
          dataSource={[
            ...paylod.map((r) => ({
              ...r,
              key: r._id,
            })),
          ]}
          pagination={{
            defaultPageSize: 30,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        /> */}
        {/* <div className="admin-left-container"></div> */}
        {/* <div className="admin-right-container"></div> */}
      </div>
    </div>
  );
};
export default withRouter(AdminPanel);
