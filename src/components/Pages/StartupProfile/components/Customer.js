import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Customer = ({ customers, handleCustomerChange }) => {
  return (
    <FormGroup>
      <div className="accordion-business">
        {customers?.map((c, i) => (
          <FormControlLabel
            key={c.id}
            control={<Checkbox />}
            label={c.name}
            checked={c.checked ? c.checked : null}
            onChange={() => handleCustomerChange(c.id, i)}
          />
        ))}
      </div>
    </FormGroup>
  );
};

export default Customer;
