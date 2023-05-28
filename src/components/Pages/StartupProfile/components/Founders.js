import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Chart } from "chart.js/auto";
import RadarGraph from "./RadarGraph";

const Founders = ({
  founders,
  data,
  founderInput,
  handleAdd,
  handleDelete,
  handleFounderInputChange,
  handleFounderTimeInputChange,
  handleFounderSkillInputChange,
  handleFounderGrowthInputChange,
  handleFounderProductInputChange,
  handleFounderOperationsInputChange,
  handleFounderFinanceInputChange,
  handleFounderCommunicationInputChange,
}) => {
  return (
    <div className="accordion">
      {founders?.length > 0 ? <RadarGraph data={data} /> : null}
      {!founders?.length ? (
        <div className="add-button-column" onClick={handleAdd}>
          <AddCircleOutlineIcon
            style={{
              color: "#37561b",
              fontSize: "20px",
              marginRight: "0.5rem",
            }}
          />
          <h3>add founder</h3>
        </div>
      ) : null}
      {!founders?.length
        ? founderInput?.map((f, i) => (
            <div className="profile-input-column" key={i}>
              <div className="profile-input-row">
                <TextField
                  required
                  label="founder name"
                  variant="outlined"
                  type="text"
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderInputChange(e, i)}
                />
                <TextField
                  required
                  label="commited time"
                  variant="outlined"
                  type="time"
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderTimeInputChange(e, i)}
                />
              </div>
              <div className="profile-input-row">
                <TextField
                  required
                  label="skill level(1-10)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderSkillInputChange(e, i)}
                />
                <TextField
                  required
                  label="growth level(1-10)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderGrowthInputChange(e, i)}
                />
              </div>
              <div className="profile-input-row">
                <TextField
                  required
                  label="product(1-10)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderProductInputChange(e, i)}
                />
                <TextField
                  required
                  label="operations(1-10)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderOperationsInputChange(e, i)}
                />
              </div>
              <div className="profile-input-row">
                <TextField
                  required
                  label="finance(1-10)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderFinanceInputChange(e, i)}
                />
                <TextField
                  required
                  label="communication(1-10)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  style={{ width: "45%" }}
                  onChange={(e) => handleFounderCommunicationInputChange(e, i)}
                />
              </div>
              <div
                className="close-button-column"
                onClick={() => handleDelete(i)}
              >
                <HighlightOffIcon
                  style={{
                    color: "#37561b",
                    fontSize: "20px",
                    marginRight: "0.5rem",
                  }}
                />
                <h3>cancel</h3>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Founders;
