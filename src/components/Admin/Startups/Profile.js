import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, svg } from "../../Paths";
import { message } from "antd";
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

import Journey from "../../Pages/StartupProfile/components/Journey";
import Pitch from "../../Pages/StartupProfile/components/ElevatorPitch";
import Goal from "../../Pages/StartupProfile/components/Goal&Motivation";
import Finance from "../../Pages/StartupProfile/components/Product&Finance";
import BusinessModal from "../../Pages/StartupProfile/components/BusinessModal";
import Customer from "../../Pages/StartupProfile/components/Customer";
import Founders from "../../Pages/StartupProfile/components/Founders";

import Navbar from "./modals/Navbar";
import "../../Pages/StartupProfile/Styles.css";
const Profile = ({ location, history }) => {
  const [founderInput, setFounderInput] = React.useState([
    {
      id: "",
      name: "",
      time: "",
      skill: 0,
      growth: 0,
      product: 0,
      operations: 0,
      finance: 0,
      communication: 0,
    },
  ]);
  const [customers, setCustomers] = React.useState([
    { id: 1, name: "B2B", checked: false },
    { id: 2, name: "B2C", checked: false },
    { id: 3, name: "B2B2C", checked: false },
    { id: 4, name: "B2G", checked: false },
  ]);
  const [businessModals, setBusinessModals] = React.useState([
    { id: 1, name: "Transactional", checked: false },
    { id: 2, name: "Saas", checked: false },
    { id: 3, name: "E-commerce", checked: false },
    { id: 4, name: "Hardware", checked: false },
    { id: 5, name: "Marketplace", checked: false },
    { id: 6, name: "Usage-Based", checked: false },
    { id: 7, name: "Subscription", checked: false },
    { id: 8, name: "Advertising", checked: false },
    { id: 9, name: "Service", checked: false },
  ]);
  const [journeySteps, setJourneySteps] = React.useState([
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
    { id: 6, name: "10 people LOVE your product, find PSF", checked: false },
    { id: 7, name: "100 people LOVE your product", checked: false },
    {
      id: 8,
      name: "Find great retention and continuous fast growth",
      checked: false,
    },
  ]);
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
  const [metricInput, setMetricInput] = React.useState([
    {
      name: "",
      id: "",
    },
  ]);
  const [goal, setGoal] = React.useState("");
  const { username, email, totalExpense, totalRevenue } = useSelector(
    (state) => state.auth
  );
  const [payload, setPayload] = React.useState([]);

  const { profile, loading } = useSelector((state) => state.profile);

  const userId = location?.state?.data?._id;

  const dispatch = useDispatch();

  React.useEffect(() => {
    // updateFounderObject();
  }, []);

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

  const handleFounderSkillInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].skill = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderGrowthInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].growth = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderProductInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].product = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderOperationsInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].operations = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderFinanceInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].finance = e.target.value;
    setFounderInput(inputData);
  };

  const handleFounderCommunicationInputChange = (e, i) => {
    const inputData = [...founderInput];
    inputData[i].communication = e.target.value;
    setFounderInput(inputData);
  };

  // const founders = React.useMemo(() => {
  //   let founderData = [];
  //   if (!profile?.founder.length) return;
  //   else
  //     founderData = Array.from(
  //       profile?.founder,
  //       ({
  //         name,
  //         skill,
  //         growth,
  //         product,
  //         finance,
  //         operations,
  //         communication,
  //       }) => ({
  //         name,
  //         skill,
  //         growth,
  //         product,
  //         finance,
  //         operations,
  //         communication,
  //       })
  //     );
  //   return founderData;
  // }, [profile?.founder]);

  // const updateFounderObject = () => {
  //   if (typeof founders === "undefined") return;
  //   const newPayload = [
  //     ...founders.map((f) => {
  //       const { name } = f;
  //       return {
  //         name: name,
  //         data: Object.values(founders.find((e) => e.name === name)).slice(1),
  //         label: Object.keys(founders.find((e) => e.name === name)).slice(1),
  //       };
  //     }),
  //   ];
  //   return setPayload(newPayload);
  // };

  // const datasets = [
  //   ...payload?.map((f) => ({
  //     label: f.name,
  //     data: f.data,
  //     fill: true,
  //     backgroundColor: ["#36561b56", "#dfa12685", "681a1ba8"],
  //     borderColor: ["#37561b", "#dfa126", "#681a1b"],
  //     pointBackgroundColor: "#681a1b",
  //     pointBorderColor: "#681a1b",
  //     pointHoverBackgroundColor: "#681a1b",
  //     pointHoverBorderColor: "#681a1b",
  //     pointStyle: "circle",
  //   })),
  // ];

  // const data = {
  //   labels: [...payload.map((f) => f.label)][0],
  //   datasets: datasets,
  // };

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

  const handleMetricAdd = () => {
    const inputs = [...metricInput, []];
    setMetricInput(inputs);
  };

  const handleMetricDelete = (i) => {
    const deleteData = [...metricInput];
    deleteData.splice(i);
    setMetricInput(deleteData);
  };

  const handleMetricNameChange = (e, i) => {
    const inputData = [...metricInput];
    inputData[i].name = e.target.value;
    inputData[i].id = "SHA" + Math.random().toString().slice(2);
    setMetricInput(inputData);
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
          metrics: [...metricInput.map((m) => ({ id: m.id, name: m.name }))],
        },
        goal,
        elevatorPitch,
        [...journeyStepz.map((j) => ({ name: j.name }))],
        (res) => {
          const { success } = res;
          if (success) message.info("Company Profile updated");
        }
      )
    );
  };

  return (
    <div className="startup-profile-container">
      <Helmet>
        <title>{location?.state?.data?.username}</title>
      </Helmet>
      <Navbar data={location?.state?.data} history={history} />
      {/* <div className="profile-content">
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
          {!profile ? (
            <button onClick={submitProfile}>Submit Profile</button>
          ) : null}
        </div>
        {loading ? (
          <img
            src={svg}
            style={{ height: "40px", width: "40px", alignSelf: "center" }}
          />
        ) : null}
      </div> */}
      {/* <div className="admin-separator-row">
        <div className="profile-separator" />
        <h4>{!profile ? "Setup company profile" : "Company profile"}</h4>
        <div className="profile-separator" />
      </div>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
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
        <AccordionDetails>
          <Founders
            founders={profile?.founder}
            data={data}
            founderInput={founderInput}
            handleAdd={handleFounderAdd}
            handleDelete={handleFounderDelete}
            handleFounderInputChange={handleFounderNameInputChange}
            handleFounderTimeInputChange={handleFounderTimeInputChange}
            handleFounderSkillInputChange={handleFounderSkillInputChange}
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
        <AccordionDetails>
          <Customer
            customers={customers}
            customerz={profile?.customer}
            handleCustomerChange={handleCustomerChange}
          />
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
              <h3>Business Modal</h3>
              <h5>What is your businsess modal type</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <BusinessModal
            businessModals={businessModals}
            businessModalz={profile?.businessModal}
            handleBusinessModalChange={handleBusinessModalChange}
          />
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
              <h5>Revenue, product and metrics</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Finance
            revenue={revenue}
            finance={profile?.finance}
            setRevenue={setRevenue}
            productInput={productInput}
            handleProductAdd={handleProductAdd}
            handleProductDelete={handleProductDelete}
            metricInput={metricInput}
            handleMetricAdd={handleMetricAdd}
            handleMetricDelete={handleMetricDelete}
            handleProductNameChange={handleProductNameChange}
            handleProductPriceChange={handleProductPriceChange}
            handleProductUnitCostChange={handleProductUnitCostChange}
            handleMetricNameChange={handleMetricNameChange}
          />
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
        <AccordionDetails>
          <Goal setGoal={setGoal} goal={profile?.goal} />
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
        <AccordionDetails>
          <Pitch
            pitch={elevatorPitch}
            elevatorPitch={profile?.pitch}
            handleElecatorPitchChange={handleElecatorPitchChange}
          />
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
        <AccordionDetails>
          <Journey
            journeySteps={journeySteps}
            journey={profile?.journey}
            handleJourneyStepsChange={handleJourneyStepsChange}
          />
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default Profile;
