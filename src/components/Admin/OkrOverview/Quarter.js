import React from "react";
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

const Quarter = ({
  description,
  setDescription,
  keyResultState,
  setKeyresultState,
  addObjective,
  addkeyResult,
  deleteKeyresult,
  deleteObjective,
  objective,
  keyResult,
  editkeyResult,
  editKeyresult,
  editObjective,
  progressBtn,
  editObjectiveDescription,
  updateObjectiveProgress,
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
  updateKeyresultsStatus,
}) => {
  //   console.log(objectives);
  return (
    <div className="objective-quarter-container">
      {objectives.map((r, objIndex) => (
        <div className="objective-card" key={r._id}>
          <div className="objective-card-header">
            <div className="objective-card-header-row">
              <QueryBuilderRoundedIcon
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.5)",
                  marginRight: "0.2rem",
                }}
              />
              <p>{moment(r.updatedAt).fromNow()}</p>
            </div>
            <div className="objective-card-header-row">
              <EditIcon
                onClick={() => showEditObjective(r._id)}
                style={{
                  fontSize: "15px",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              />
              <DeleteOutlineIcon
                onClick={() => deleteObjective(r._id)}
                style={{
                  fontSize: "15px",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              />
              {progressBtn && activeCardId === r._id ? (
                <button onClick={() => updateObjectiveProgress(r._id)}>
                  update progress
                </button>
              ) : null}
            </div>
            <span
              style={{
                background: r.objPercentage === 100 ? "#37561b" : "#dfa126",
              }}
            >
              <p>progress:</p>
              <h5>{!r.objPercentage ? 0 : Math.round(r.objPercentage)}%</h5>
            </span>
          </div>
          <div className="objective-card-header">
            {editObjective && activeCardId === r._id ? (
              <div className="objective-card-edit-row">
                <input
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <AddCircleRoundedIcon
                  onClick={() => editObjectiveDescription(r._id)}
                  style={{
                    fontSize: "20PX",
                    color: "#37561b",
                  }}
                  className="objective-icons"
                />
                <CancelRoundedIcon
                  onClick={hideEditObjective}
                  style={{
                    fontSize: "20PX",
                    color: "#37561b",
                  }}
                  className="objective-icons"
                />
              </div>
            ) : (
              <h3>{r.description}</h3>
            )}
          </div>
          {r?.keyresults.map((k, krIndex) => (
            <div className="keyresult-card" key={k._id}>
              <div className="keyresult-card-header">
                <div className="keyresult-card-header-row">
                  <QueryBuilderRoundedIcon
                    style={{
                      fontSize: "12px",
                      color: "rgba(0, 0, 0, 0.5)",
                      marginRight: "0.2rem",
                    }}
                  />
                  <p>{moment(k.startDate).fromNow()}</p>
                </div>
                <div className="keyresult-card-header-row">
                  <EditIcon
                    onClick={() => showEditKeyresult(k._id)}
                    style={{
                      fontSize: "15px",
                      color: "rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  <DeleteOutlineIcon
                    onClick={() => deleteKeyresult(r._id, k._id, objIndex)}
                    style={{
                      fontSize: "15px",
                      color: "rgba(0, 0, 0, 0.5)",
                    }}
                  />
                </div>
              </div>
              {editkeyResult && activeCardId === k._id ? (
                <div className="add-keyresult-row">
                  <textarea
                    placeholder="Type keyresult..."
                    value={keyResultState.keyResult}
                    onChange={(e) =>
                      setKeyresultState({
                        ...keyResultState,
                        keyResult: e.target.value,
                      })
                    }
                  />
                  <h3>start date: </h3>
                  <input
                    type="date"
                    value={keyResultState.startDate}
                    onChange={(e) =>
                      setKeyresultState({
                        ...keyResultState,
                        startDate: e.target.value,
                      })
                    }
                  />
                  <div className="add-keyresult-input-row"></div>
                  <div className="icons-row">
                    <AddCircleRoundedIcon
                      onClick={() => editKeyresult(r._id, k._id)}
                      style={{
                        fontSize: "20PX",
                        color: "#37561b",
                      }}
                      className="objective-icons"
                    />
                    <CancelRoundedIcon
                      onClick={hideEditKeyresult}
                      style={{
                        fontSize: "20PX",
                        color: "#37561b",
                      }}
                      className="objective-icons"
                    />
                  </div>
                  {loading ? <p>updating keyresult...</p> : null}
                </div>
              ) : (
                <FormGroup key={k._id}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={k.description}
                    checked={k.checked ? k.checked : null}
                    onChange={() =>
                      updateKeyresultsStatus(r._id, k._id, objIndex, krIndex)
                    }
                  />
                </FormGroup>
              )}
            </div>
          ))}
          {keyResult && activeCardId === r._id ? (
            <div className="add-keyresult-row">
              <textarea
                placeholder="Type keyresult..."
                value={keyResultState.keyResult}
                onChange={(e) =>
                  setKeyresultState({
                    ...keyResultState,
                    keyResult: e.target.value,
                  })
                }
              />
              <h3>start date: </h3>
              <input
                type="date"
                value={keyResultState.startDate}
                onChange={(e) =>
                  setKeyresultState({
                    ...keyResultState,
                    startDate: e.target.value,
                  })
                }
              />
              <div className="add-keyresult-input-row"></div>
              <div className="icons-row">
                <AddCircleRoundedIcon
                  onClick={() => addkeyResult(r._id)}
                  style={{
                    fontSize: "20PX",
                    color: "#37561b",
                  }}
                  className="objective-icons"
                />
                <CancelRoundedIcon
                  onClick={hideAddKeyresult}
                  style={{
                    fontSize: "20PX",
                    color: "#37561b",
                  }}
                  className="objective-icons"
                />
              </div>
              {loading ? <p>adding keyresult...</p> : null}
            </div>
          ) : (
            <div
              className="add-result-row"
              onClick={() => showAddKeyresult(r._id)}
            >
              <AddRoundedIcon
                style={{
                  fontSize: "20PX",
                  color: "#37561b",
                }}
              />
              <h4>add keyresult</h4>
            </div>
          )}
        </div>
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
          <AddCircleRoundedIcon
            onClick={addObjective}
            style={{
              fontSize: "20PX",
              color: "#37561b",
            }}
            className="objective-icons"
          />
          <CancelRoundedIcon
            onClick={hideAddObjective}
            style={{
              fontSize: "20PX",
              color: "#37561b",
            }}
            className="objective-icons"
          />
          {loading ? <p>adding objective...</p> : null}
        </div>
      )}
    </div>
  );
};

export default Quarter;
