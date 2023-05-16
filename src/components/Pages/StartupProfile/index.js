import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

import Pitch from "./components/ElevatorPitch";
import Goal from "./components/Goal&Motivation";
import Finance from "./components/Product&Finance";
import BusineesModal from "./components/BusinessModal";
import Customer from "./components/Customer";
import Founders from "./components/Founders";
import "./Styles.css";
const StartupProfile = () => {
  const [founderInput, setFounderInput] = React.useState([]);
  const [productInput, setProductInput] = React.useState([]);
  const [metricInput, setMetricInput] = React.useState([]);
  const [pitch, setPitch] = React.useState("");
  const { username, email, totalExpense, totalRevenue } = useSelector(
    (state) => state.auth
  );

  const handleFounderAdd = () => {
    const inputs = [...founderInput, []];
    setFounderInput(inputs);
  };

  const handleFounderDelete = (i) => {
    const deleteData = [...founderInput];
    deleteData.splice(i);
    setFounderInput(deleteData);
  };

  const handleProductAdd = () => {
    const inputs = [...productInput, []];
    setProductInput(inputs);
  };

  const handleProductDelete = (i) => {
    const deleteData = [...productInput];
    deleteData.splice(i);
    setProductInput(deleteData);
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
  //   console.log(auth);
  return (
    <div className="startup-profile-container">
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
          <button>Edit Profile</button>
        </div>
      </div>
      <div className="separator-row">
        <div className="profile-separator" />
        <h4>Setup company profile</h4>
        <div className="profile-separator" />
      </div>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
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
              <h5>Add Founders with shares in the company</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Founders
            founderInput={founderInput}
            handleAdd={handleFounderAdd}
            handleDelete={handleFounderDelete}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
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
          <Customer />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
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
              <h5>Whats your businsess modal type</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <BusineesModal />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
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
            productInput={productInput}
            handleProductAdd={handleProductAdd}
            handleProductDelete={handleProductDelete}
            metricInput={metricInput}
            handleMetricAdd={handleMetricAdd}
            handleMetricDelete={handleMetricDelete}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
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
              <h5>What's your motivation to build a business</h5>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Goal />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "80%", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={
            <AddIcon style={{ color: "#37561b", fontSize: "25px" }} />
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
          <Pitch pitch={pitch} setPitch={setPitch} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default withRouter(StartupProfile);
