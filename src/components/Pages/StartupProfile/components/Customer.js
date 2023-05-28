import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Customer = ({ customers, customerz, handleCustomerChange }) => {
  return (
    <FormGroup>
      <div className="accordion-business">
        {customerz?.length > 0
          ? customerz?.map((c, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox />}
                label={c.name}
                checked={c.checked}
              />
            ))
          : null}
        {!customerz?.length
          ? customers?.map((c, i) => (
              <FormControlLabel
                key={c.id}
                control={<Checkbox />}
                label={c.name}
                onChange={() => handleCustomerChange(c.id, i)}
              />
            ))
          : null}
      </div>
    </FormGroup>
  );
};

export default Customer;
