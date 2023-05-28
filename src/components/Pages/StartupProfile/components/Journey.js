import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Journey = ({ journeySteps, handleJourneyStepsChange, journey }) => {
  return (
    <div className="accordion">
      <FormGroup>
        {journey?.length > 0
          ? journey?.map((j, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox />}
                label={j.name}
                checked={true}
                disabled={true}
              />
            ))
          : null}
        {!journey?.length
          ? journeySteps?.map((j, i) => (
              <FormControlLabel
                key={j.id}
                control={<Checkbox />}
                label={j.name}
                onChange={() => handleJourneyStepsChange(j.id, i)}
              />
            ))
          : null}
      </FormGroup>
    </div>
  );
};

export default Journey;
