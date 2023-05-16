import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Finance = ({
  productInput,
  handleProductAdd,
  handleProductDelete,
  metricInput,
  handleMetricAdd,
  handleMetricDelete,
}) => {
  return (
    <div className="accordion">
      <div className="profile-input-row">
        <FormControl style={{ width: "100%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Revenue</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            placeholder="Total lifetime revenue so far"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </div>
      <div className="profile-input-row">
        <FormControl style={{ width: "45%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Revenue</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            placeholder="Revenue of last full month"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <TextField
          label="month & year"
          variant="outlined"
          type="month"
          style={{ width: "45%" }}
        />
      </div>
      <h3>Product or Package list</h3>
      <div className="add-button-column" onClick={handleProductAdd}>
        <AddCircleOutlineIcon
          style={{
            color: "#37561b",
            fontSize: "20px",
            marginRight: "0.5rem",
          }}
        />
        <h3>add product</h3>
      </div>
      {productInput.map((p, i) => (
        <div className="profile-input-row">
          <TextField
            label="name"
            variant="outlined"
            type="text"
            style={{ width: "30%" }}
          />
          <TextField
            label="price"
            variant="outlined"
            type="text"
            style={{ width: "30%" }}
          />
          <TextField
            label="unit production cost"
            variant="outlined"
            type="text"
            style={{ width: "30%" }}
          />
          <HighlightOffIcon
            onClick={() => handleProductDelete(i)}
            style={{
              color: "#37561b",
              fontSize: "30px",
              marginRight: "0.5rem",
              alignSelf: "flex-end",
            }}
          />
        </div>
      ))}
      <h3>Metrics</h3>
      <div className="add-button-column" onClick={handleMetricAdd}>
        <AddCircleOutlineIcon
          style={{
            color: "#37561b",
            fontSize: "20px",
            marginRight: "0.5rem",
          }}
        />
        <h3>add metric</h3>
      </div>
      {metricInput.map((m, i) => (
        <div className="profile-input-row">
          <TextField
            label="name"
            variant="outlined"
            type="text"
            style={{ width: "85%" }}
          />
          <HighlightOffIcon
            onClick={() => handleMetricDelete(i)}
            style={{
              color: "#37561b",
              fontSize: "30px",
              marginRight: "0.5rem",
              alignSelf: "flex-end",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Finance;
