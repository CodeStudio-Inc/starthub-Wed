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
  handleFounderFocusChange,
  handleFounderGrowthInputChange,
  handleFounderProductInputChange,
  handleFounderOperationsInputChange,
  handleFounderFinanceInputChange,
  handleFounderCommunicationInputChange,
}) => {
  return (
    <div className="accordion">
      {founders?.length > 0 ? (
        <RadarGraph data={data} founders={founders} />
      ) : null}
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
                <input
                  placeholder="founder name"
                  onChange={(e) => handleFounderInputChange(e, i)}
                />
                <select onChange={(e) => handleFounderTimeInputChange(e, i)}>
                  <option disabled selected>
                    Time commitment per week(Founders)
                  </option>
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                  <option value={30}>30%</option>
                  <option value={40}>40%</option>
                  <option value={50}>50%</option>
                  <option value={60}>60%</option>
                  <option value={70}>70%</option>
                  <option value={80}>80%</option>
                  <option value={90}>90%</option>
                  <option value={100}>100%</option>
                </select>
              </div>
              <div className="profile-input-row">
                <select onChange={(e) => handleFounderFocusChange(e, i)}>
                  <option disabled selected>
                    Core focus(Founders)
                  </option>
                  <option value="Product">Product</option>
                  <option value="Growth">Growth</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                </select>
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of growth(1-10)"
                  onChange={(e) => handleFounderGrowthInputChange(e, i)}
                />
              </div>
              <div className="profile-input-row">
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level building product(1-10)"
                  onChange={(e) => handleFounderProductInputChange(e, i)}
                />
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of operations(1-10)"
                  onChange={(e) => handleFounderOperationsInputChange(e, i)}
                />
              </div>
              <div className="profile-input-row">
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of finance(1-10)"
                  onChange={(e) => handleFounderFinanceInputChange(e, i)}
                />
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of communication(1-10)"
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
