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
        {/* {journey?.length > 0 && !editJourney
          ? journey?.map((j, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox />}
                label={j.name}
                checked={j.checked}
              />
            ))
          : null}
        {!journey?.length && !editJourney
          ? journeySteps?.map((j, i) => (
              <FormControlLabel
                key={j.id}
                control={<Checkbox />}
                label={j.name}
                onChange={() => handleJourneyStepsChange(j.id, i)}
              />
            ))
          : null}
        {editJourney
          ? journeySteps?.map((j, i) => (
              <FormControlLabel
                key={j.id}
                control={<Checkbox />}
                label={j.name}
                onChange={() => handleJourneyStepsChange(j.id, i)}
              />
            ))
          : null} */}
      </FormGroup>
      {/* {journey?.length > 0 && !editJourney ? (
        <EditIcon
          onClick={openJourneyEdit}
          style={{ alignSelf: "flex-end", color: "#37561b" }}
          className="edit-icon"
        />
      ) : null}
      {editJourney ? (
        <CancelIcon
          onClick={cancelJourneyEdit}
          style={{ alignSelf: "flex-end", color: "#37561b" }}
          className="edit-icon"
        />
      ) : null} */}
    </div>
  );
};

export default Journey;
