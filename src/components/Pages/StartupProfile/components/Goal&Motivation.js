import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Goal = () => {
  return (
    <div className="accordion">
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="To Own" />
        <FormControlLabel control={<Checkbox />} label="To Exit" />
        <FormControlLabel control={<Checkbox />} label="Not Sure" />
      </FormGroup>
    </div>
  );
};

export default Goal;
