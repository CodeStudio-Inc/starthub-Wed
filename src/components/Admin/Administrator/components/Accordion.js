import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Acordion = ({ state, setState }) => {
  return (
    <div className="input-modal-column">
      <h4>
        Set permissions to manage what the team member will be able to do with
        the account
      </h4>
      <Accordion>
        <AccordionSummary
          expandIcon={
            state.permissions === "owner" ? (
              <CheckCircleIcon style={{ color: "#1776d1" }} />
            ) : (
              <ExpandMoreIcon />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4>Owner</h4>
        </AccordionSummary>
        <AccordionDetails>
          <h5>
            As an owner the Team member is able to create and delete accounts,
            enter loan details, add edit and delete okrs, generate excel
            documents of startup records and enable or disable features for
            startups
          </h5>
          <p onClick={() => setState({ ...state, permissions: "owner" })}>
            Add as owner
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            state.permissions === "member" ? (
              <CheckCircleIcon style={{ color: "#1776d1" }} />
            ) : (
              <ExpandMoreIcon />
            )
          }
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <h4>Member</h4>
        </AccordionSummary>
        <AccordionDetails>
          <h5>
            As a member the Team member has a viewer role and not able to
            perform any edits to the existing startup records
          </h5>
          <p onClick={() => setState({ ...state, permissions: "member" })}>
            Add as member
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Acordion;
