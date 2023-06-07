import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Diagnostics = ({
  diagnosticTool,
  diagnostics,
  selected,
  handleChange,
}) => {
  const projects = [...diagnostics.map((d) => d.project)];

  const doesContainDups = (array) => {
    let set = new Set(array);
    return set.size !== array.length;
  };

  return (
    <div className="diagonistics">
      <h2>Diagnostics</h2>
      {!diagnosticTool.length ? (
        <div className="attach-diagnostics">
          <h3>Update startup diagnostic tools</h3>
          <FormControl sx={{ m: 1, width: "70%", minHeight: 40 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              select category
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selected}
              onChange={handleChange}
              autoWidth
              style={{
                height: 50,
              }}
              label="startups"
            >
              {doesContainDups(projects) ? (
                <MenuItem value={projects[0]}>{projects[0]}</MenuItem>
              ) : (
                projects?.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </div>
      ) : (
        diagnosticTool?.map((d) => (
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
        ))
      )}
    </div>
  );
};
export default Diagnostics;
