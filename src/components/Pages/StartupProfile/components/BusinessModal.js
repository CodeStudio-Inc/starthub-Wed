import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const BusinessModal = ({
  businessModals,
  businessModalz,
  handleBusinessModalChange,
}) => {
  return (
    <FormGroup>
      <div className="accordion-business">
        {businessModals?.map((b, i) => (
          <FormControlLabel
            key={b.id}
            control={<Checkbox />}
            label={b.name}
            checked={b.checked ? b.checked : null}
            onChange={() => handleBusinessModalChange(b.id, i)}
          />
        ))}
      </div>
    </FormGroup>
  );
};

export default BusinessModal;
