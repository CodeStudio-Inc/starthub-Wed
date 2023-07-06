import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, svg } from "../../Paths";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const AddKeyresult = ({ objId, setPayload, hideAddKeyresult }) => {
  const [state, setState] = React.useState({
    keyResult: "",
    dueDate: "",
  });

  const { loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const addkeyResult = () => {
    const data = state;
    dispatch(
      actionCreators.addItem(
        `catalyzer/keyresult/${objId}`,
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
            hideAddKeyresult();
            setState({
              keyResult: "",
            });
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <div className="add-keyresult-row">
      <textarea
        placeholder="Type keyresult..."
        value={state.keyResult}
        onChange={(e) =>
          setState({
            ...state,
            keyResult: e.target.value,
          })
        }
      />
      <h3>due date: </h3>
      <input
        type="date"
        value={state.dueDate}
        onChange={(e) =>
          setState({
            ...state,
            dueDate: e.target.value,
          })
        }
      />
      <div className="add-keyresult-input-row"></div>
      <div className="icons-row">
        <p onClick={addkeyResult}>save</p>
        <CancelRoundedIcon
          onClick={hideAddKeyresult}
          style={{
            fontSize: "20PX",
            color: "#37561b",
          }}
          className="objective-icons"
        />
      </div>
      {loading ? (
        <img src={svg} style={{ height: "30px", width: "30px" }} />
      ) : null}
    </div>
  );
};

export default AddKeyresult;
