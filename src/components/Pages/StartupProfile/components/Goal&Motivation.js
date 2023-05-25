import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Goal = ({ setGoal, goal }) => {
  const [checked, setCkecked] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selected, setSelected] = React.useState();

  const values = ["To Own", "To Exit", "Not Sure"];

  const toggleCheckboxOn = (i) => {
    setSelected(i);
    setCkecked(true);
    setGoal(values[i]);
  };
  const toggleCheckboxOff = () => setCkecked(false);

  return (
    <div className="accordion-business">
      {goal ? (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="To Own"
            checked={goal === "To Own" ? true : false}
          />
        </FormGroup>
      ) : null}
      {goal ? (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="To Exit"
            checked={goal === "To Exit" ? true : false}
          />
        </FormGroup>
      ) : null}
      {goal ? (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Not Sure"
            checked={goal === "Not Sure" ? true : false}
          />
        </FormGroup>
      ) : null}
      {!goal
        ? values.map((v, i) => (
            <div className="option-select-container" key={i}>
              <div className="checkbox-container">
                {checked && selected === i ? (
                  <CheckBoxIcon
                    style={{ fontSize: "25px", color: "#1776d1" }}
                    className="checkbox"
                    onClick={() => toggleCheckboxOff(i)}
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    style={{ fontSize: "25px", color: "rgba(0,0,0,0.6)" }}
                    className="checkbox"
                    onClick={() => toggleCheckboxOn(i)}
                  />
                )}
              </div>
              <h3>{v}</h3>
            </div>
          ))
        : null}
    </div>
  );
};

export default Goal;
