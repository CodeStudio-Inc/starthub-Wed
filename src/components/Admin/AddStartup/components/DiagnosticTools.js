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
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="" disabled selected>
          select diagnostics
        </option>
        <option value="Catalyzer">Catalyzer</option>
        <option value="OIP">OIP</option>
      </select>
    </div>
  );
};

export default Features;
