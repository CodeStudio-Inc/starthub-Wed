import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Acordion = ({ dispatch, actionCreators, loading, svg }) => {
  const [val, setVal] = React.useState([
    {
      category: "",
      feature: "",
    },
  ]);
  const [message, setMessage] = React.useState("");

  const handleAdd = () => {
    const inputs = [...val, []];
    setVal(inputs);
  };

  const handleCategoryChange = (e, i) => {
    const inputData = [...val];
    inputData[i].category = e.target.value;
    setVal(inputData);
  };

  const handleFeatureChange = (e, i) => {
    const inputData = [...val];
    inputData[i].feature = e.target.value;
    setVal(inputData);
  };

  const handleDelete = (i) => {
    const deleteData = [...val];
    deleteData.splice(i);
    setVal(deleteData);
    setMessage("");
  };

  const addFeatures = () =>
    dispatch(
      actionCreators.addFeatures(
        [...val.map((v) => ({ name: v.feature, category: v.category }))],
        (res) => {
          const { success } = res;
          if (success) setMessage("Successfully added!");
        }
      )
    );

  return (
    <Accordion style={{ width: "95%" }}>
      <AccordionSummary
        expandIcon={<SettingsApplicationsIcon style={{ color: "#37561b" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h4 style={{ color: "#37561b" }}>Add Features</h4>
      </AccordionSummary>
      <AccordionDetails>
        <h5>
          These include features that the platform already has that you would
          want to be accessed by users
        </h5>
        <div className="add-feature-column">
          <div className="add-button" onClick={handleAdd}>
            <AddCircleOutlineIcon
              style={{ color: "#37561b", marginRight: "5px" }}
            />
            <h5>add feature</h5>
          </div>
          {val.map((v, i) => {
            return (
              <div className="add-feature-input-column" key={i}>
                <select onChange={(e) => handleCategoryChange(e, i)}>
                  <option value="" disabled selected>
                    -select-user-
                  </option>
                  <option value="startups">startups</option>
                  <option value="admins">Team Leads/Members</option>
                </select>
                <input
                  placeholder="feature"
                  onChange={(e) => handleFeatureChange(e, i)}
                />
                <HighlightOffIcon
                  className="icon-close"
                  style={{ color: "#37561b", marginRight: "5px" }}
                  onClick={() => handleDelete(i)}
                />
              </div>
            );
          })}
        </div>
        {loading ? (
          <img src={svg} style={{ height: "20px", width: "20px" }} />
        ) : (
          <button className="submit-btn" onClick={addFeatures}>
            submit
          </button>
        )}
        <p style={{ margin: "0", color: "#37561b" }}>{message}</p>
      </AccordionDetails>
    </Accordion>
  );
};

export default Acordion;
