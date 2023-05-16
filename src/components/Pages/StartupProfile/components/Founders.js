import React from "react";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Founders = ({ founderInput, handleAdd, handleDelete }) => {
  return (
    <div className="accordion">
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
      {founderInput?.map((f, i) => (
        <div className="profile-input-column" key={i}>
          <div className="profile-input-row">
            <TextField
              label="founder name"
              variant="outlined"
              type="text"
              style={{ width: "45%" }}
            />
            <TextField
              label="commited time"
              variant="outlined"
              type="time"
              style={{ width: "45%" }}
            />
          </div>
          <div className="profile-input-row">
            <TextField
              label="skill level(1-10)"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              style={{ width: "45%" }}
            />
            <TextField
              label="growth level(1-10)"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              style={{ width: "45%" }}
            />
          </div>
          <div className="profile-input-row">
            <TextField
              label="product(1-10)"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              style={{ width: "45%" }}
            />
            <TextField
              label="operations(1-10)"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              style={{ width: "45%" }}
            />
          </div>
          <div className="profile-input-row">
            <TextField
              label="finance(1-10)"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              style={{ width: "45%" }}
            />
            <TextField
              label="communication(1-10)"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              style={{ width: "45%" }}
            />
          </div>
          <div className="close-button-column" onClick={() => handleDelete(i)}>
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
      ))}
    </div>
  );
};

export default Founders;
