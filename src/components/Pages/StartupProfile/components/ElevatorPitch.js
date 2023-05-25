import React from "react";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

const Pitch = ({ pitch, handleElecatorPitchChange, elevatorPitch }) => {
  return (
    <div className="accordion">
      {elevatorPitch ? <h3>"{elevatorPitch}"</h3> : null}
      {!elevatorPitch ? (
        <Textarea
          required
          placeholder="description…(max 300 characters)"
          value={pitch}
          onChange={handleElecatorPitchChange}
          minRows={2}
          maxRows={4}
          maxLength={100}
          endDecorator={
            <Typography level="body3" sx={{ ml: "auto" }}>
              {pitch.length} character(s)
            </Typography>
          }
          inputProps={{ maxLength: 10 }}
          style={{ width: "100%" }}
        />
      ) : null}
    </div>
  );
};

export default Pitch;
