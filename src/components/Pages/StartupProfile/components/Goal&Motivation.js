import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const Goal = ({ setGoal, goal, editGoal, openGoalEdit, cancelGoalEdit }) => {
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
      {goal && !editGoal ? (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="To Own"
            checked={goal === "To Own" ? true : false}
          />
        </FormGroup>
      ) : null}
      {goal && !editGoal ? (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="To Exit"
            checked={goal === "To Exit" ? true : false}
          />
        </FormGroup>
      ) : null}
      {goal && !editGoal ? (
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
      {goal && editGoal
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
      {goal && !editGoal ? (
        <EditIcon
          onClick={openGoalEdit}
          style={{ alignSelf: "flex-end", color: "#37561b" }}
          className="edit-icon"
        />
      ) : null}
      {editGoal ? (
        <CancelIcon
          onClick={cancelGoalEdit}
          style={{ alignSelf: "flex-end", color: "#37561b" }}
          className="edit-icon"
        />
      ) : null}
    </div>
  );
};

export default Goal;
