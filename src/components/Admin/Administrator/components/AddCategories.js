import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Acordion = ({ dispatch, actionCreators, loading, svg }) => {
  const [val, setVal] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const handleAdd = () => {
    const inputs = [...val, []];
    setVal(inputs);
  };

  const handleChange = (e, i) => {
    const inputData = [...val];
    inputData[i] = e.target.value;
    setVal(inputData);
  };

  const handleDelete = (i) => {
    const deleteData = [...val];
    deleteData.splice(i);
    setVal(deleteData);
    setMessage("");
  };

  const addCategories = () =>
    dispatch(
      actionCreators.addCategory(val, (res) => {
        const { success } = res;
        if (success) setMessage("Successfully added!");
      })
    );

  return (
    <Accordion style={{ width: "95%" }}>
      <AccordionSummary
        expandIcon={<CategoryIcon style={{ color: "#37561b" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h4 style={{ color: "#37561b" }}>Add Categories</h4>
      </AccordionSummary>
      <AccordionDetails>
        <h5>These include categories that the different startups belong to</h5>
        <div className="add-feature-column">
          <div className="add-button" onClick={handleAdd}>
            <AddCircleOutlineIcon
              style={{ color: "#37561b", marginRight: "5px" }}
            />
            <h5>add category</h5>
          </div>
          {val.map((v, i) => {
            return (
              <div className="add-feature-input-row" key={i}>
                <input
                  placeholder="title"
                  onChange={(e) => handleChange(e, i)}
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
          <button className="submit-btn" onClick={addCategories}>
            submit
          </button>
        )}
        <p style={{ margin: "0", color: "#37561b" }}>{message}</p>
      </AccordionDetails>
    </Accordion>
  );
};

export default Acordion;
