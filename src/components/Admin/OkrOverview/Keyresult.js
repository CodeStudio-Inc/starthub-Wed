import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, svg } from "../../Paths";
import { Popover } from "antd";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import EditIcon from "@mui/icons-material/Edit";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import moment from "moment";

const Keyresult = ({
  r,
  k,
  openModal,
  showEditKeyresult,
  hideEditKeyresult,
  deleteKeyresult,
  editkR,
  activeCardId,
  setPayload,
}) => {
  const [keyResult, setKeyresult] = React.useState(k.keyResult);

  const { loading } = useSelector((state) => state.requests);
  const { username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const updatedMembersArray = React.useMemo(() => {
    const addedMembers = k?.members?.map((r) => r.name);
    return addedMembers;
  }, [k]);
  const totalTasks = k.tasks.length;
  const totalDoneTasks = k?.tasks.filter((t) => t.check).length;

  const editKeyresult = (objId, krId) => {
    const data = {
      keyResult,
      updatedBy: username,
    };
    dispatch(
      actionCreators.updateItem(
        `catalyzer/edit-keyresult?objId=${objId}&krId=${krId}`,
        data,
        (data) => {
          const { keyResult } = data;
          if (!keyResult) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
            hideEditKeyresult();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <div className="keyresult-card">
      <div className="keyresult-card-header">
        <div className="keyresult-card-header-row">
          <QueryBuilderRoundedIcon
            style={{
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.5)",
              marginRight: "0.2rem",
            }}
          />
          <p>
            last changed by {k.updatedBy} {moment(k.updatedAt).fromNow()}
          </p>
        </div>
        <div className="keyresult-card-header-row">
          <Popover title="Edit keyresult">
            <EditIcon
              onClick={() => showEditKeyresult(k._id)}
              style={{
                fontSize: "15px",
                color: "rgba(0, 0, 0, 0.5)",
              }}
            />
          </Popover>
          <Popover title="Delete keyresult">
            <DeleteOutlineIcon
              onClick={() => deleteKeyresult(r._id, k._id)}
              style={{
                fontSize: "15px",
                color: "rgba(0, 0, 0, 0.5)",
              }}
            />
          </Popover>
        </div>
      </div>
      {editkR && activeCardId === k._id ? (
        <div className="editKR-row">
          <input
            placeholder="Enter keyresult"
            value={keyResult}
            onChange={(e) => setKeyresult(e.target.value)}
          />
          <p onClick={() => editKeyresult(k.objId, k._id)}>save</p>
          <CancelRoundedIcon
            onClick={hideEditKeyresult}
            style={{
              fontSize: "20PX",
              color: "#37561b",
              marginLeft: "0.5rem",
            }}
            className="objective-icons"
          />
          {loading && activeCardId === k._id ? (
            <img style={{ height: "30px", width: "30px" }} src={svg} />
          ) : null}
        </div>
      ) : (
        <div
          className="keyresult-container"
          onClick={() => openModal(r._id, k._id)}
        >
          <h4 onClick={() => openModal(r._id, k._id)}>{k.keyResult}</h4>
        </div>
      )}
      <div className="keyresult-card-footer">
        <div className="tasks-row">
          <CheckCircleOutlineIcon
            style={{
              fontSize: "18px",
              color: "rgba(0,0,0,0.5)",
              marginRight: "0.3rem",
            }}
          />
          <p>
            {totalDoneTasks} / {totalTasks}
          </p>
        </div>
        <div className="keyresult-member-row">
          {updatedMembersArray?.map((m) => (
            <div className="member-avatar">
              <p>{m.substring(0, 2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyresult;
