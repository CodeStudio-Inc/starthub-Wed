import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import Keyresult from "./Keyresult";
import AddKeyresult from "./AddKeyresult";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { actionCreators, svg } from "../../Paths";

const Objective = ({
  r,
  showEditObjective,
  keyResult,
  hideEditObjective,
  editObjective,
  setPayload,
  payload,
  activeCardId,
  progressBtn,
  hideProgressBtn,
  showAddKeyresult,
  hideAddKeyresult,
  openModal,
  showEditKeyresult,
  deleteKeyresult,
  editkeyResult,
  hideEditKeyresult,
}) => {
  const [description, setDescription] = React.useState(r.description);

  const { loading } = useSelector((state) => state.requests);
  const { username, userRole } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const roles = ["team lead", "team member"];

  const editObjectiveDescription = (id) => {
    const data = {
      description,
    };
    dispatch(
      actionCreators.updateItem(
        `catalyzer/objective/${id}`,
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
            hideEditObjective();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const saveObjectiveChanges = (objId) => {
    const paylod = [...payload];

    const objective = paylod.find((r) => r._id === objId);
    console.log(objective?.keyresults);
    const data = {
      keyresults: objective?.keyresults,
    };
    dispatch(
      actionCreators.updateItem(
        `catalyzer/objective-progress/${objId}`,
        data,
        (data) => {
          const { keyresults } = data;
          if (typeof keyresults === "undefined") return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
            hideProgressBtn();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const deleteObjective = () => {
    dispatch(
      actionCreators.deleteItem(`catalyzer/objective/${r._id}`, (res) => {
        const { success, data, error } = res;
        if (success) {
          setPayload(data.objs);
          dispatch(actionCreators.setObjectives(data.objs));
        }
        if (!success) console.log(error);
      })
    );
  };

  const pushToNextQuarter = (objId) => {
    dispatch(
      actionCreators.getItem(`catalyzer/update-quarter/${objId}`, (res) => {
        const { success, data, error } = res;
        if (success) {
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
          }
          if (!success) console.log(error);
        }
      })
    );
  };

  return (
    <div className="objective-card">
      <div className="objective-card-header">
        <div className="objective-card-header-row">
          <QueryBuilderRoundedIcon
            style={{
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.5)",
              marginRight: "0.2rem",
            }}
          />
          <p>
            last changed by {username} {moment(r.updatedAt).fromNow()}
          </p>
        </div>
        {roles.includes(userRole) ? null : (
          <div className="objective-card-header-row">
            <Popover title="Push to next quarter">
              <RightCircleOutlined
                onClick={() => pushToNextQuarter(r._id)}
                style={{
                  fontSize: "15px",
                  color: "rgba(0, 0, 0, 0.5)",
                  background: "none",
                }}
              />
            </Popover>
            <Popover title="Edit objective">
              <EditIcon
                onClick={() => showEditObjective(r._id)}
                style={{
                  fontSize: "15px",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              />
            </Popover>
            <Popover title="Delete Objective">
              <DeleteOutlineIcon
                onClick={() => deleteObjective(r._id)}
                style={{
                  fontSize: "15px",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              />
            </Popover>
            {progressBtn && activeCardId === r._id ? (
              <button onClick={() => saveObjectiveChanges(r._id)}>
                save changes
              </button>
            ) : null}
            {loading && activeCardId === r._id ? (
              <img style={{ height: "30px", width: "30px" }} src={svg} />
            ) : null}
          </div>
        )}
      </div>
      <div className="objective-card-header">
        {editObjective && activeCardId === r._id ? (
          <div className="objective-card-edit-row">
            <input
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p onClick={() => editObjectiveDescription(r._id)}>save</p>
            <CancelRoundedIcon
              onClick={hideEditObjective}
              style={{
                fontSize: "20PX",
                color: "#37561b",
                marginLeft: "0.5rem",
              }}
              className="objective-icons"
            />
            {loading && activeCardId === r._id ? (
              <img src={svg} style={{ height: "30px", height: "30px" }} />
            ) : null}
          </div>
        ) : (
          <h3>{r.description}</h3>
        )}
      </div>
      {r?.keyresults.map((k, krIndex) => (
        <Keyresult
          key={krIndex}
          k={k}
          r={r}
          openModal={openModal}
          showEditKeyresult={showEditKeyresult}
          deleteKeyresult={deleteKeyresult}
          editkR={editkeyResult}
          activeCardId={activeCardId}
          hideEditKeyresult={hideEditKeyresult}
          setPayload={setPayload}
        />
      ))}
      {keyResult && activeCardId === r._id ? (
        <AddKeyresult
          objId={r._id}
          setPayload={setPayload}
          hideAddKeyresult={hideAddKeyresult}
        />
      ) : (
        <div
          className="add-result-row"
          onClick={() => showAddKeyresult(r._id)}
          style={{
            visibility: roles.includes(userRole) ? "hidden" : "visible",
          }}
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
  );
};

export default Objective;
