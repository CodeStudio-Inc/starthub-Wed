import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Customer = () => {
  return (
    <div className="accordion">
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="B2B" />
        <FormControlLabel control={<Checkbox />} label="B2C" />
        <FormControlLabel control={<Checkbox />} label="B2B2C" />
        <FormControlLabel control={<Checkbox />} label="B2G" />
      </FormGroup>
    </div>
  );
};

export default Customer;
