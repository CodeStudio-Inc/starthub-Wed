import React from "react";
// import Textarea from "@mui/joy/Textarea";
// import Typography from "@mui/joy/Typography";

const Pitch = ({ pitch, setPitch }) => {
  return (
    <div className="accordion">
      <h2>Elevator pitch</h2>
      {/* <Textarea
        placeholder="Type in here…"
        value={pitch}
        onChange={(event) => setPitch(event.target.value)}
        minRows={2}
        maxRows={4}
        endDecorator={
          <Typography level="body3" sx={{ ml: "auto" }}>
            {pitch.length} character(s)
          </Typography>
        }
        sx={{ minWidth: 300 }}
      /> */}
    </div>
  );
};

export default Pitch;
