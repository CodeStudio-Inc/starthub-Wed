import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const BusineesModal = () => {
  return (
    <div className="accordion">
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Transactional" />
        <FormControlLabel control={<Checkbox />} label="SaaS" />
        <FormControlLabel control={<Checkbox />} label="e-commerce" />
        <FormControlLabel control={<Checkbox />} label="hardware" />
        <FormControlLabel control={<Checkbox />} label="marketplace" />
        <FormControlLabel control={<Checkbox />} label="usage-based" />
        <FormControlLabel control={<Checkbox />} label="subscription" />
        <FormControlLabel control={<Checkbox />} label="advertising" />
        <FormControlLabel control={<Checkbox />} label="service " />
      </FormGroup>
    </div>
  );
};

export default BusineesModal;
