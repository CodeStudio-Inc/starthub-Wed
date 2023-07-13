import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentQuarter } from "../../utilities/helpers";
import { actionCreators } from "../../Paths";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import Objective from "./Objective";

const Quarter = ({
  deleteKeyresult,
  deleteObjective,
  objective,
  keyResult,
  editkeyResult,
  editObjective,
  progressBtn,
  hideProgressBtn,
  openModal,
  setPayload,
  payload,
  activeCardId,
  showAddObjective,
  hideAddObjective,
  showAddKeyresult,
  hideAddKeyresult,
  hideEditObjective,
  showEditObjective,
  showEditKeyresult,
  hideEditKeyresult,
  objectives,
  loading,
  svg,
}) => {
  const [description, setDescription] = React.useState("");

  const { category } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const addObjective = () => {
    const quarter = getCurrentQuarter();
    const data = {
      description,
      quarter,
      category,
    };

    dispatch(
      actionCreators.addItem(
        `catalyzer/objective`,
        data,
        (data) => {
          const { description } = data;
          if (!description) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
            setDescription("");
            hideAddObjective();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <div className="objective-quarter-container">
      {objectives.map((r) => (
        <Objective
          r={r}
          key={r._id}
          showEditObjective={showEditObjective}
          hideEditObjective={hideEditObjective}
          deleteObjective={deleteObjective}
          editObjective={editObjective}
          activeCardId={activeCardId}
          progressBtn={progressBtn}
          showAddKeyresult={showAddKeyresult}
          hideAddKeyresult={hideAddKeyresult}
          setPayload={setPayload}
          payload={payload}
          keyResult={keyResult}
          openModal={openModal}
          showEditKeyresult={showEditKeyresult}
          deleteKeyresult={deleteKeyresult}
          editkeyResult={editkeyResult}
          hideEditKeyresult={hideEditKeyresult}
          hideProgressBtn={hideProgressBtn}
        />
      ))}
      {!objective ? (
        <div className="add-result-row" onClick={showAddObjective}>
          <AddRoundedIcon
            style={{
              fontSize: "20PX",
              color: "#37561b",
            }}
          />
          <h4>add objective</h4>
        </div>
      ) : (
        <div className="add-objective-row">
          <input
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p onClick={addObjective}>save</p>
          <CancelRoundedIcon
            onClick={hideAddObjective}
            style={{
              fontSize: "20PX",
              color: "#37561b",
              marginLeft: "0.5rem",
            }}
            className="objective-icons"
          />
          {loading ? (
            <img src={svg} style={{ height: "30px", width: "30px" }} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Quarter;
