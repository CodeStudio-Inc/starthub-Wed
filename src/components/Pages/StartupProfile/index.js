import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CampaignIcon from "@mui/icons-material/Campaign";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CancelIcon from "@mui/icons-material/Cancel";

import Journey from "./components/Journey";
import Pitch from "./components/ElevatorPitch";
import Goal from "./components/Goal&Motivation";
import Finance from "./components/Product&Finance";
import BusinessModal from "./components/BusinessModal";
import Customer from "./components/Customer";
import Founders from "./components/Founders";
import "./Styles.css";
import { actionCreators, svg } from "../../Paths";
import { message } from "antd";
const StartupProfile = () => {
  const { profile, loading } = useSelector((state) => state.profile);

  const [founderInput, setFounderInput] = React.useState([
    {
      id: "",
      name: "",
      time: 0,
      focus: "",
      growth: 0,
      product: 0,
      operations: 0,
      finance: 0,
      communication: 0,
    },
  ]);
  const [customers, setCustomers] = React.useState(
    profile?.customer?.length > 0
      ? profile?.customer
      : [
          { id: 1, name: "B2B", checked: false },
          { id: 2, name: "B2C", checked: false },
          { id: 3, name: "B2B2C", checked: false },
          { id: 4, name: "B2G", checked: false },
        ]
  );
  const [businessModals, setBusinessModals] = React.useState(
    profile?.businessModal?.length > 0
      ? profile?.businessModal
      : [
          { id: 1, name: "Transactional", checked: false },
          { id: 2, name: "Saas", checked: false },
          { id: 3, name: "E-commerce", checked: false },
          { id: 4, name: "Hardware", checked: false },
          { id: 5, name: "Marketplace", checked: false },
          { id: 6, name: "Usage-Based", checked: false },
          { id: 7, name: "Subscription", checked: false },
          { id: 8, name: "Advertising", checked: false },
          { id: 9, name: "Service", checked: false },
        ]
  );
  const [journeySteps, setJourneySteps] = React.useState(
    profile?.journey?.length > 0
      ? profile?.journey
      : [
          {
            id: 1,
            name: "Find a great founding team and find founder/market fit",
            checked: false,
          },
          {
            id: 2,
            name: "Urgent, frequent, mandatory, popular, a/o expensive ",
            checked: false,
          },
          {
            id: 3,
            name: "Interviewed 10+ customers about the problem",
            checked: false,
          },
          {
            id: 4,
            name: "Have a spec document & timeline for your MVP",
            checked: false,
          },
          { id: 5, name: "MVP has been sold 1+ customers", checked: false },
          {
            id: 6,
            name: "10 people LOVE your product, find PSF",
            checked: false,
          },
          { id: 7, name: "100 people LOVE your product", checked: false },
          {
            id: 8,
            name: "Find great retention and continuous fast growth",
            checked: false,
          },
        ]
  );
  const [revenue, setRevenue] = React.useState({
    lifetime: "",
    fullMonth: "",
    monthYear: "",
  });
  const [elevatorPitch, setElevetorPitch] = React.useState("");
  const [productInput, setProductInput] = React.useState([
    {
      name: "",
      price: "",
      unitCost: "",
      id: "",
    },
  ]);
  const [goal, setGoal] = React.useState("");
  const { username, email, totalExpense, totalRevenue } = useSelector(
    (state) => state.auth
  );
  const [editPitch, setEditPitch] = React.useState(false);
  const [editGoal, setEditGoal] = React.useState(false);
  const [editRevenue, setEditRevenue] = React.useState(false);
  const [editFinance, setEditFinance] = React.useState(false);
  const [editFounder, setEditFounder] = React.useState(false);
  const [editFounderTableColumn, setEditFounderColumn] = React.useState(false);
  const [selectedFounderId, setSelectedFounderId] = React.useState("");
  const [selectedProductId, setSelectedProductId] = React.useState("");
  const [founderState, setFounderState] = React.useState({
    name: "",
    time: "",
    focus: "",
    growth: "",
    product: "",
    finance: "",
    operations: "",
    communication: "",
  });
  const [productState, setProductState] = React.useState({
    name: "",
    price: "",
    unitCost: "",
  });
  const [payload, setPayload] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getProfile();
    founderScaleSetter();
    updateFounderObject();
  }, []);

  const getProfile = () => dispatch(actionCreators.getProfile());

  const handleFounderAdd = () => {
    const inputs = [...founderInput, []];
    setFounderInput(inputs);
  };

  const handleFounderDelete = (i) => {
    const deleteData = [...founderInput];
    deleteData.splice(i);
    setFounderInput(deleteData);
  };

  const handleFounderNameInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].name = e.target.value;
    inputData[i].id = "SHA" + Math.random().toString().slice(2);
    setFounderInput(inputData);
  };

  const handleFounderTimeInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].time = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderFocusChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].focus = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderGrowthInputChange = (e, i) => {
    const inputData = [...founderInput];
    if (e.target.value > 10) inputData[i].growth = "10";
    else inputData[i].growth = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderProductInputChange = (e, i) => {
    const inputData = [...founderInput];
    if (e.target.value > 10) inputData[i].product = "10";
    else inputData[i].product = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderOperationsInputChange = (e, i) => {
    const inputData = [...founderInput];
    if (e.target.value > 10) inputData[i].operations = "10";
    else inputData[i].operations = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderFinanceInputChange = (e, i) => {
    const inputData = [...founderInput];
    if (e.target.value > 10) inputData[i].finance = "10";
    else inputData[i].finance = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderCommunicationInputChange = (e, i) => {
    const inputData = [...founderInput];
    if (e.target.value > 10) inputData[i].communication = "10";
    else inputData[i].communication = e.target.value;
    setFounderInput(inputData);
  };

  const founderScaleSetter = () => {
    if (typeof profile.founder === "undefined") {
      dispatch(
        actionCreators.addProfile(
          [
            {
              id: "SHA" + Math.random().toString().slice(2),
              name: "default",
              time: "default",
              focus: "default",
              growth: 1,
              product: 4,
              operations: 6,
              finance: 8,
              communication: 10,
            },
          ],
          [],
          [],
          {},
          "",
          "",
          [],
          (res) => {
            const { success } = res;
            if (success) getProfile();
          }
        )
      );
    }
  };

  const founders = React.useMemo(() => {
    let founderData = [];
    founderData = Array.from(
      profile?.founder,
      ({ name, growth, product, finance, operations, communication }) => ({
        name,
        growth,
        product,
        finance,
        operations,
        communication,
      })
    );
    return founderData;
  }, [profile?.founder]);

  const updateFounderObject = () => {
    if (typeof founders === "undefined") return;
    const newFounders = [
      {
        name: "default",
        growth: 1,
        product: 2,
        finance: 5,
        operations: 8,
        communication: 10,
      },
      ...founders,
    ];
    const newPayload = [
      ...newFounders.map((f) => {
        const { name } = f;
        return {
          name: name,
          data: Object.values(newFounders.find((e) => e.name === name)).slice(
            1
          ),
          label: Object.keys(newFounders.find((e) => e.name === name)).slice(1),
        };
      }),
    ];
    return setPayload(newPayload);
  };

  const datasets = [
    ...payload?.map((f) => ({
      label: f.name === "default" ? " " : f.name,
      data: f.data,
      fill: true,
      backgroundColor:
        f.name === "default" ? "rgba(0,0,0,0)" : ["#36561b56", "#dfa12685"],
      borderColor:
        f.name === "default" ? "rgba(0,0,0,0)" : ["#37561b", "#dfa126"],
      pointBackgroundColor: f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
      pointBorderColor: f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
      pointHoverBackgroundColor:
        f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
      pointHoverBorderColor: f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
      pointStyle: "circle",
    })),
  ];

  const data = {
    labels: [...payload.map((f) => f.label)][0],
    datasets: datasets,
    maintainAspectRatio: true,
  };

  const openPitchEdit = () => setEditPitch(true);
  const cancelPitchEdit = () => setEditPitch(false);

  const openGoalEdit = () => setEditGoal(true);
  const cancelGoalEdit = () => setEditGoal(false);

  const openRevenueEdit = () => setEditRevenue(true);
  const cancelRevenueEdit = () => setEditRevenue(false);

  const openFinanceEdit = (id) => {
    setEditFinance(true);
    setSelectedProductId(id);
  };
  const cancelFinanceEdit = () => setEditFinance(false);

  const openFounderEdit = () => setEditFounder(true);
  const cancelFounderEdit = () => setEditFounder(false);

  const openFounderColumnEdit = (id) => {
    setEditFounderColumn(true);
    setSelectedFounderId(id);
  };
  const cancelFounderColumnEdit = () => setEditFounderColumn(false);

  const handleProductAdd = () => {
    const inputs = [...productInput, []];
    setProductInput(inputs);
  };

  const handleProductDelete = (i) => {
    const deleteData = [...productInput];
    deleteData.splice(i);
    setProductInput(deleteData);
  };

  const handleProductNameChange = (e, i) => {
    const inputData = [...productInput];
    inputData[i].name = e.target.value;
    inputData[i].id = "SHA" + Math.random().toString().slice(2);
    setProductInput(inputData);
  };

  const handleProductPriceChange = (e, i) => {
    const inputData = [...productInput];
    inputData[i].price = e.target.value;
    setProductInput(inputData);
  };

  const handleProductUnitCostChange = (e, i) => {
    const inputData = [...productInput];
    inputData[i].unitCost = e.target.value;
    setProductInput(inputData);
  };

  const handleCustomerChange = (id, i) => {
    const payload = [...customers];
    const exists = payload.find((c) => c.id === id);
    if (exists.checked === true) {
      payload[i] = { ...payload[i], checked: false };
    }
    if (exists.checked === false) {
      payload[i] = { ...payload[i], checked: true };
    }
    setCustomers(payload);
  };

  const handleBusinessModalChange = (id, i) => {
    const payload = [...businessModals];
    const exists = payload.find((c) => c.id === id);
    if (exists.checked === true) {
      payload[i] = { ...payload[i], checked: false };
    }
    if (exists.checked === false) {
      payload[i] = { ...payload[i], checked: true };
    }
    setBusinessModals(payload);
  };

  const handleJourneyStepsChange = (id, i) => {
    const payload = [...journeySteps];
    const exists = payload.find((c) => c.id === id);
    if (exists.checked === true) {
      payload[i] = { ...payload[i], checked: false };
    }
    if (exists.checked === false) {
      payload[i] = { ...payload[i], checked: true };
    }
    setJourneySteps(payload);
  };

  const handleElecatorPitchChange = (e) => {
    if (e.target.value.length > 300) return;
    setElevetorPitch(e.target.value);
  };

  const addFounder = () => {
    const noAnswer = founderInput.find(
      (f) =>
        f.name === " " ||
        f.growth === 0 ||
        f.time === 0 ||
        f.finance === 0 ||
        f.communication === 0 ||
        f.product === 0 ||
        f.operations === 0 ||
        f.focus === ""
    );
    if (noAnswer) return message.info("All fields are required");
    dispatch(
      actionCreators.addProfile(
        [
          ...founderInput.map((f) => ({
            id: f.id,
            name: f.name,
            time: f.time,
            focus: f.focus,
            growth: f.growth,
            product: f.product,
            operations: f.operations,
            finance: f.finance,
            communication: f.communication,
          })),
        ],
        [],
        [],
        {},
        "",
        "",
        [],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Founder updated");
          getProfile();
        }
      )
    );
  };

  const addCustomer = () => {
    const noAnswer = customers.find((c) => c.checked);
    if (!noAnswer) return message.info("No answer submitted");
    dispatch(
      actionCreators.addProfile(
        [],
        [
          ...customers.map((c) => ({
            id: c.id,
            name: c.name,
            checked: c.checked,
          })),
        ],
        [],
        {},
        "",
        "",
        [],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Customer updated");
          getProfile();
        }
      )
    );
  };

  const addBusinessModal = () => {
    const noAnswer = businessModals.find((b) => b.checked);
    if (!noAnswer) return message.info("No answer submitted");
    dispatch(
      actionCreators.addProfile(
        [],
        [],
        [
          ...businessModals.map((b) => ({
            id: b.id,
            name: b.name,
            checked: b.checked,
          })),
        ],
        {},
        "",
        "",
        [],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Business Modal updated");
          getProfile();
        }
      )
    );
  };

  const addFinance = () => {
    if (!revenue) return message.info("Enter required fields");
    dispatch(
      actionCreators.addProfile(
        [],
        [],
        [],
        {
          lifeTimeRevenue: revenue.lifetime,
          fullMonthRevenue: revenue.fullMonth,
          monthYear: revenue.monthYear,
          products: [
            ...productInput.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              unitCost: p.unitCost,
            })),
          ],
        },
        "",
        "",
        [],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Product & Finance updated");
          getProfile();
        }
      )
    );
  };

  const addGoal = () => {
    if (!goal) return message.info("Enter required field");
    dispatch(
      actionCreators.addProfile([], [], [], {}, goal, "", [], (res) => {
        const { success } = res;
        if (success) message.info("Company Goal updated");
        getProfile();
        setEditGoal(false);
      })
    );
  };

  const addElevatorPitch = () => {
    if (!elevatorPitch) return message.info("No Elevator Pitch Submitted");
    dispatch(
      actionCreators.addProfile(
        [],
        [],
        [],
        {},
        "",
        elevatorPitch,
        [],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Elevator Pitch updated");
          setEditPitch(false);
          getProfile();
        }
      )
    );
  };

  const addJourney = () => {
    const noAnswer = journeySteps.find((j) => j.checked);
    if (!noAnswer) return message.info("No answer submitted");
    dispatch(
      actionCreators.addProfile(
        [],
        [],
        [],
        {},
        "",
        "",
        [
          ...journeySteps.map((j) => ({
            id: j.id,
            name: j.name,
            checked: j.checked,
          })),
        ],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Journey updated");
          getProfile();
        }
      )
    );
  };

  const submitProfile = () => {
    const customerz = customers.filter((c) => c.checked);
    const businessModalz = businessModals.filter((c) => c.checked);
    const journeyStepz = journeySteps.filter((c) => c.checked);
    if (!founderInput.length || !businessModalz.length || !elevatorPitch)
      return message.info("Enter required fields");
    dispatch(
      actionCreators.addProfile(
        [
          ...founderInput.map((f) => ({
            id: f.id,
            name: f.name,
            time: f.time,
            skill: f.skill,
            growth: f.growth,
            product: f.product,
            operations: f.operations,
            finance: f.finance,
            communication: f.communication,
          })),
        ],
        [...customerz.map((c) => ({ name: c.name }))],
        [...businessModalz.map((b) => ({ name: b.name }))],
        {
          lifeTimeRevenue: revenue.lifetime,
          fullMonthRevenue: revenue.fullMonth,
          monthYear: revenue.monthYear,
          products: [
            ...productInput.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              unitCost: p.unitCost,
            })),
          ],
        },
        goal,
        elevatorPitch,
        [...journeyStepz.map((j) => ({ name: j.name }))],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Profile updated");
          getProfile();
        }
      )
    );
  };

  return (
    <div className="startup-profile-container">
      <Helmet>
        <title>Company Profile</title>
      </Helmet>
      <div className="profile-content">
        <div className="profile-content-header">
          <div className="startup-avatar">
            <h1>{username.substring(0, 1)}</h1>
          </div>
        </div>
        <div className="profile-details-column">
          <h3>{username}</h3>
          <div className="profile-details-row">
            <EmailIcon
              style={{
                color: "rgba(0,0,0,0.2)",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
            <h4>{email}</h4>
          </div>
        </div>
        {loading ? (
          <img
            src={svg}
            style={{ height: "40px", width: "40px", alignSelf: "center" }}
          />
        ) : null}
      </div>
      <div className="separator-row">
        <div className="profile-separator" />
        <h4>{!profile ? "Setup company profile" : "Company profile"}</h4>
        <div className="profile-separator" />
      </div>
      <Accordion
        style={{
          width: "80%",
          marginBottom: "1rem",
        }}
      >
        <AccordionSummary
          expandIcon={
            !profile?.founder.length ? (
              <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
            ) : (
              <CheckBoxIcon style={{ color: "#37561b", fontSize: "25px" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordion-row">
            <PeopleIcon
              style={{
                color: "#37561b",
                fontSize: "45px",
                marginRight: "0.5rem",
              }}
            />
            <div className="accordion-column">
              <h3>Founding Team</h3>
              <h5>Founders with shares in the company</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="accordion-content">
          <Founders
            founders={profile?.founder}
            data={data}
            founderInput={founderInput}
            editFounder={editFounder}
            selectedFounderId={selectedFounderId}
            editFounderTableColumn={editFounderTableColumn}
            founderState={founderState}
            setFounderState={setFounderState}
            cancelFounderEdit={cancelFounderEdit}
            openFounderColumnEdit={openFounderColumnEdit}
            cancelFounderColumnEdit={cancelFounderColumnEdit}
            handleAdd={handleFounderAdd}
            handleDelete={handleFounderDelete}
            handleFounderInputChange={handleFounderNameInputChange}
            handleFounderTimeInputChange={handleFounderTimeInputChange}
            handleFounderFocusChange={handleFounderFocusChange}
            handleFounderGrowthInputChange={handleFounderGrowthInputChange}
            handleFounderProductInputChange={handleFounderProductInputChange}
            handleFounderOperationsInputChange={
              handleFounderOperationsInputChange
            }
            handleFounderFinanceInputChange={handleFounderFinanceInputChange}
            handleFounderCommunicationInputChange={
              handleFounderCommunicationInputChange
            }
          />
          {!profile?.founder.length ? (
            <div className="save-button-column" onClick={addFounder}>
              <SaveIcon
                style={{
                  color: "#37561b",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
              <h3>save</h3>
            </div>
          ) : null}
          {profile?.founder.length > 0 && !editFounder ? (
            <ModeEditOutlineIcon
              onClick={openFounderEdit}
              style={{
                fontSize: "20px",
                color: "#37561b",
                alignSelf: "flex-end",
              }}
              className="finance-table-icon"
            />
          ) : null}
          {editFounder ? (
            <CancelIcon
              onClick={cancelFounderEdit}
              style={{
                fontSize: "20px",
                color: "#37561b",
                alignSelf: "flex-end",
              }}
              className="finance-table-icon"
            />
          ) : null}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            !profile?.customer.length ? (
              <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
            ) : (
              <CheckBoxIcon style={{ color: "#37561b", fontSize: "25px" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordion-row">
            <GroupsIcon
              style={{
                color: "#37561b",
                fontSize: "45px",
                marginRight: "0.5rem",
              }}
            />
            <div className="accordion-column">
              <h3>Customer</h3>
              <h5>Who is your customer</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="accordion-content">
          <Customer
            customers={customers}
            handleCustomerChange={handleCustomerChange}
          />
          <div className="save-button-column" onClick={addCustomer}>
            <SaveIcon
              style={{
                color: "#37561b",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
            <h3>save</h3>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            !profile?.businessModal.length ? (
              <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
            ) : (
              <CheckBoxIcon style={{ color: "#37561b", fontSize: "25px" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordion-row">
            <ManageAccountsIcon
              style={{
                color: "#37561b",
                fontSize: "45px",
                marginRight: "0.5rem",
              }}
            />
            <div className="accordion-column">
              <h3>Business Model</h3>
              <h5>What is your businsess model type</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="accordion-content">
          <BusinessModal
            businessModals={businessModals}
            handleBusinessModalChange={handleBusinessModalChange}
          />
          <div className="save-button-column" onClick={addBusinessModal}>
            <SaveIcon
              style={{
                color: "#37561b",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
            <h3>save</h3>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            !profile?.finance ? (
              <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
            ) : (
              <CheckBoxIcon style={{ color: "#37561b", fontSize: "25px" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordion-row">
            <CurrencyExchangeIcon
              style={{
                color: "#37561b",
                fontSize: "45px",
                marginRight: "0.5rem",
              }}
            />
            <div className="accordion-column">
              <h3>Product and Finance</h3>
              <h5>Revenue & Products</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="accordion-content">
          <Finance
            revenue={revenue}
            finance={profile?.finance}
            setRevenue={setRevenue}
            productInput={productInput}
            editRevenue={editRevenue}
            editFinance={editFinance}
            productState={productState}
            setProductState={setProductState}
            selectedProductId={selectedProductId}
            openRevenueEdit={openRevenueEdit}
            cancelRevenueEdit={cancelRevenueEdit}
            openFinanceEdit={openFinanceEdit}
            cancelFinanceEdit={cancelFinanceEdit}
            handleProductAdd={handleProductAdd}
            handleProductDelete={handleProductDelete}
            handleProductNameChange={handleProductNameChange}
            handleProductPriceChange={handleProductPriceChange}
            handleProductUnitCostChange={handleProductUnitCostChange}
          />
          {!profile?.finance || Object.keys(profile?.finance).length === 0 ? (
            <div className="save-button-column" onClick={addFinance}>
              <SaveIcon
                style={{
                  color: "#37561b",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
              <h3>save</h3>
            </div>
          ) : null}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            !profile?.goal ? (
              <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
            ) : (
              <CheckBoxIcon style={{ color: "#37561b", fontSize: "25px" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordion-row">
            <SportsScoreIcon
              style={{
                color: "#37561b",
                fontSize: "45px",
                marginRight: "0.5rem",
              }}
            />
            <div className="accordion-column">
              <h3>Goal and Motivation</h3>
              <h5>What is your motivation to build a business</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="accordion-content">
          <Goal
            setGoal={setGoal}
            goal={profile?.goal}
            editGoal={editGoal}
            openGoalEdit={openGoalEdit}
            cancelGoalEdit={cancelGoalEdit}
          />
          <div className="save-button-column" onClick={addGoal}>
            <SaveIcon
              style={{
                color: "#37561b",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
            <h3>save</h3>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            !profile?.pitch ? (
              <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
            ) : (
              <CheckBoxIcon style={{ color: "#37561b", fontSize: "25px" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordion-row">
            <CampaignIcon
              style={{
                color: "#37561b",
                fontSize: "45px",
                marginRight: "0.5rem",
              }}
            />
            <div className="accordion-column">
              <h3>Elevator Pitch</h3>
              <h5>
                For instance, consider problem, solution, uniqueness, market,
                team
              </h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="accordion-content">
          <Pitch
            pitch={elevatorPitch}
            elevatorPitch={profile?.pitch}
            handleElecatorPitchChange={handleElecatorPitchChange}
            openPitchEdit={openPitchEdit}
            cancelPitchEdit={cancelPitchEdit}
            editPitch={editPitch}
          />
          <div className="save-button-column" onClick={addElevatorPitch}>
            <SaveIcon
              style={{
                color: "#37561b",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
            <h3>save</h3>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            !profile?.journey.length ? (
              <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
            ) : (
              <CheckBoxIcon style={{ color: "#37561b", fontSize: "25px" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordion-row">
            <FollowTheSignsIcon
              style={{
                color: "#37561b",
                fontSize: "45px",
                marginRight: "0.5rem",
              }}
            />
            <div className="accordion-column">
              <h3>Journey</h3>
              <h5>Journey steps archived</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="accordion-content">
          <Journey
            journeySteps={journeySteps}
            handleJourneyStepsChange={handleJourneyStepsChange}
          />
          <div className="save-button-column" onClick={addJourney}>
            <SaveIcon
              style={{
                color: "#37561b",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
            <h3>save</h3>
          </div>
        </AccordionDetails>
      </Accordion>
      {!profile ? (
        <button className="profile-submit-btn" onClick={submitProfile}>
          Submit Profile
        </button>
      ) : null}
    </div>
  );
};

export default withRouter(StartupProfile);
