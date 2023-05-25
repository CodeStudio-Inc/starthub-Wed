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
        {businessModalz?.length > 0
          ? businessModalz?.map((b, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox />}
                label={b.name}
                checked={b.checked}
              />
            ))
          : null}
        {!businessModalz?.length
          ? businessModals?.map((b, i) => (
              <FormControlLabel
                key={b.id}
                control={<Checkbox />}
                label={b.name}
                onChange={() => handleBusinessModalChange(b.id, i)}
              />
            ))
          : null}
      </div>
    </FormGroup>
  );
};

export default BusinessModal;
