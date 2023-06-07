import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Journey = ({ journeySteps, handleJourneyStepsChange }) => {
  return (
    <div className="accordion">
      <FormGroup>
        {journeySteps?.map((j, i) => (
          <FormControlLabel
            key={j.id}
            control={<Checkbox />}
            label={j.name}
            checked={j.checked ? j.checked : null}
            onChange={() => handleJourneyStepsChange(j.id, i)}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default Journey;
