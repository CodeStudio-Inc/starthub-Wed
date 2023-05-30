import React from "react";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const Pitch = ({
  pitch,
  handleElecatorPitchChange,
  elevatorPitch,
  editPitch,
  openPitchEdit,
  cancelPitchEdit,
}) => {
  return (
    <div className="accordion">
      {elevatorPitch && !editPitch ? <h3>"{elevatorPitch}"</h3> : null}
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
      {elevatorPitch && editPitch ? (
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
      {elevatorPitch && !editPitch ? (
        <EditIcon
          onClick={openPitchEdit}
          style={{ alignSelf: "flex-end", color: "#37561b" }}
          className="edit-icon"
        />
      ) : null}
      {editPitch ? (
        <CancelIcon
          onClick={cancelPitchEdit}
          style={{ alignSelf: "flex-end", color: "#37561b" }}
          className="edit-icon"
        />
      ) : null}
    </div>
  );
};

export default Pitch;
