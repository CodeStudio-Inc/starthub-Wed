import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const AddObjective = ({
  objective,
  showAddObjective,
  description,
  setDescription,
  hideAddObjective,
  loading,
  svg,
  addObjective,
}) => {
  return (
    <div>
      {!objective ? (
        <div className="add-result-row" onClick={showAddObjective}>
          <AddRoundedIcon
            style={{
              fontSize: "20PX",
              color: "#37561b",
            }}
          />
          <h4>add objective</h4>
        </div>
      ) : (
        <div className="add-objective-row">
          <input
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p onClick={addObjective}>save</p>
          <CancelRoundedIcon
            onClick={hideAddObjective}
            style={{
              fontSize: "20PX",
              color: "#37561b",
              marginLeft: "0.5rem",
            }}
            className="objective-icons"
          />
          {loading ? (
            <img src={svg} style={{ height: "30px", width: "30px" }} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AddObjective;
