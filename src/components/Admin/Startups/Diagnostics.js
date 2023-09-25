import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Diagnostics = ({ diagnosticTool, selected, handleChange }) => {
  // const projects = [...diagnostics.map((d) => d.project)];

  const doesContainDups = (array) => {
    if (typeof array === "undefined") return;
    let set = new Set(array);
    return set.size !== array.length;
  };

  return (
    <div className="diagonistics">
      <h2>Diagnostics</h2>
      {diagnosticTool?.map((d) => (
        <div className="diagonistics-row">
          <div className="progress-bar-label">
            <h4>{d.tool}</h4>
          </div>
          <div className="progress-bar">
            <Box sx={{ width: "80%" }}>
              <LinearProgress
                variant="determinate"
                value={d.score}
                color="success"
              />
            </Box>
          </div>
          <div className="progress-bar-percentage">
            <h5>{d.score}%</h5>
          </div>
        </div>
      ))}
      {/* {diagnosticTool?.map((d) => (
        <div className="diagonistics-row">
          <div className="progress-bar-label">
            <h4>{d.tool}</h4>
          </div>
          <div className="progress-bar">
            <Box sx={{ width: "80%" }}>
              <LinearProgress
                variant="determinate"
                value={d.score}
                color="success"
              />
            </Box>
          </div>
          <div className="progress-bar-percentage">
            <h5>{d.score}%</h5>
          </div>
        </div>
      ))} */}
    </div>
  );
};
export default Diagnostics;
