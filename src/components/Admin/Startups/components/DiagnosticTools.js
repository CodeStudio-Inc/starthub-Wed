import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Features = ({ diagnostics, selected, setSelected }) => {
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const filterDiagnostics = () => {
    diagnostics.filter((d) => d);
  };

  const projects = [...diagnostics.map((d) => d.project)];

  const doesContainDups = (array) => {
    let set = new Set(array);
    return set.size !== array.length;
  };

  return (
    <div className="input-modal-column">
      <h2>Diagnostic Tools</h2>
      <h3>Select project</h3>
      <FormControl sx={{ m: 1, width: "70%", minHeight: 40 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Diagnostic Tools
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
  );
};

export default Features;
