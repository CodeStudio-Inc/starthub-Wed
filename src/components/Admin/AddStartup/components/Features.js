import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Features = ({ features, emailcheck, handleCheckboxSelect }) => {
  return (
    <div className="input-modal-column">
      <FormGroup>
        {features.map((f) => (
          <FormControlLabel
            control={<Checkbox />}
            label={f.name}
            onChange={() => handleCheckboxSelect(f._id)}
          />
        ))}
      </FormGroup>
      <p>{emailcheck}</p>
    </div>
  );
};

export default Features;
