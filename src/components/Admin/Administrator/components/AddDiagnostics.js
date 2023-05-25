import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Acordion = ({ dispatch, actionCreators, loading, svg }) => {
  const [val, setVal] = React.useState([
    {
      stepNo: "",
      step: "",
      checked: false,
    },
  ]);
  const [state, setState] = React.useState({
    project: "",
    toolName: "",
  });
  const [message, setMessage] = React.useState("");

  const handleAdd = () => {
    const inputs = [...val, []];
    setVal(inputs);
  };

  const handleStepChange = (e, i) => {
    const inputData = [...val];
    inputData[i].step = e.target.value;
    setVal(inputData);
  };

  const handleStepNoChange = (e, i) => {
    const inputData = [...val];
    inputData[i].stepNo = parseInt(e.target.value);
    inputData[i].checked = false;
    setVal(inputData);
  };

  const handleDelete = (i) => {
    const deleteData = [...val];
    deleteData.splice(i);
    setVal(deleteData);
    setMessage("");
  };

  const addDiagnostics = () =>
    dispatch(
      actionCreators.addDiagnostics(
        state.project,
        state.toolName,
        [
          ...val.map((v) => ({
            stepNo: v.stepNo,
            step: v.step,
            checked: v.checked,
          })),
        ],
        (res) => {
          const { success } = res;
          if (success) setMessage("Successfully added!");
        }
      )
    );

  //   console.log(val);
  return (
    <Accordion style={{ width: "95%" }}>
      <AccordionSummary
        expandIcon={<QueryStatsIcon style={{ color: "#37561b" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h4 style={{ color: "#37561b" }}>Add Diagnostics tools</h4>
      </AccordionSummary>
      <AccordionDetails>
        <h5>These include structures, processes and their implementations</h5>
        <div className="add-feature-column">
          <input
            placeholder="project"
            value={state.project}
            onChange={(e) => setState({ ...state, project: e.target.value })}
          />
          <input
            placeholder="category name"
            value={state.toolName}
            onChange={(e) => setState({ ...state, toolName: e.target.value })}
          />
          <div className="add-button" onClick={handleAdd}>
            <AddCircleOutlineIcon
              style={{ color: "#37561b", marginRight: "5px" }}
            />
            <h5>add step</h5>
          </div>
          {val.map((v, i) => {
            return (
              <div className="add-feature-input-row" key={i}>
                <input
                  type="number"
                  min={1}
                  style={{ width: "20%" }}
                  placeholder="no."
                  onChange={(e) => handleStepNoChange(e, i)}
                />
                <input
                  placeholder="step name"
                  onChange={(e) => handleStepChange(e, i)}
                />
                <HighlightOffIcon
                  className="icon-close"
                  style={{ color: "#37561b", marginRight: "5px" }}
                  onClick={() => handleDelete(i)}
                />
              </div>
            );
          })}
        </div>
        {loading ? (
          <img src={svg} style={{ height: "20px", width: "20px" }} />
        ) : (
          <button className="submit-btn" onClick={addDiagnostics}>
            submit
          </button>
        )}
        <p style={{ margin: "0", color: "#37561b" }}>{message}</p>
      </AccordionDetails>
    </Accordion>
  );
};

export default Acordion;
