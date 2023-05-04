import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Features = ({ features, handleCheckboxSelect, message, emailcheck }) => {
  return (
    <div className="input-modal-column">
      <FormGroup>
        {features.map((f) => (
          <FormControlLabel
            control={<Checkbox />}
            label={f.name}
            onChange={() => handleCheckboxSelect(f._id)}
            disabled={
              [
                "add team leads",
                "add team members",
                "assign startups",
              ].includes(f.name)
                ? true
                : false
            }
          />
        ))}
      </FormGroup>
      <p>{message}</p>
      <p>{emailcheck}</p>
    </div>
  );
};

export default Features;
