import React, { useState } from "react";
import { Modal, DatePicker, Select, Space, Progress, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, svg } from "../../Paths";
import { generateId } from "../../utilities/helpers";
import dayjs from "dayjs";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import MemberSelector from "./MemberSelector";
import Members from "./Members";

const Keyresult = ({ open, closeModal, keyresult, setPayload, userId }) => {
  const { keyResult, startDate, objId, _id } = keyresult;
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [t, setT] = useState("");
  const { Option } = Select;

  const { loading } = useSelector((state) => state.requests);
  const { username, userRole } = useSelector((state) => state.auth);

  React.useEffect(() => {
    setMembers([]);
    setTasks(keyresult?.tasks);
  }, [keyresult]);

  const updatedMembersArray = React.useMemo(() => {
    const addedMembers = keyresult?.members?.map((r) => r.name);
    return addedMembers;
  }, [keyresult]);

  const dispatch = useDispatch();

  const roles = ["team lead", "team member"];

  const handleChange = ({ target: { value } }) => {
    setT(value);
  };

  const handleSelectChange = (value) => {
    const member = value.map((v) => ({ _id: generateId(), name: v }));
    if (keyresult?.members?.length > 0)
      return setMembers([...keyresult?.members, ...member]);
    setMembers(member);
  };

  const updateKeyresultsStatus = (id) => {
    setTasks((r) =>
      r.map((x) => (x._id === id ? { ...x, check: !x.check } : x))
    );
  };

  const onKeyUp = (e) => {
    if (e.key !== "Enter") return;
    setTasks([...tasks, { _id: generateId(), check: false, task: t }]);
    return setT("");
  };

  const onRemove = (id) => {
    setTasks((r) => r.filter((x) => x._id !== id));
  };

  const progress = React.useMemo(() => {
    const checked = tasks.filter((x) => x.check).length;
    const percentage = Math.ceil((checked / tasks?.length) * 100);
    return percentage;
  }, [tasks, setTasks]);

  const addMember = () => {
    if (!members.length) return message.info("No members selected");
    const data = {
      members,
      krId: _id,
      updatedBy: username,
    };
    dispatch(
      actionCreators.addItem(
        `/catalyzer/member/${objId}`,
        data,
        (data) => {
          const { members } = data;
          if (!members.length) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
            setMembers([]);
          }
          if (!success) console.log(success);
        }
      )
    );
  };

  const addTask = () => {
    const data = {
      tasks,
      krId: _id,
      progress,
      updatedBy: username,
    };
    dispatch(
      actionCreators.addItem(
        `catalyzer/task/${objId}`,
        data,
        (data) => {
          const { tasks } = data;
          if (typeof tasks === "undefined") return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
          }
          if (!success) console.log(success);
        }
      )
    );
  };

  return (
    <Modal
      title={keyResult}
      centered
      visible={open}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div className="keyresult-modal">
        <Members members={updatedMembersArray} />
        {userRole === "startup" ? null : (
          <MemberSelector
            members={members}
            updatedMembersArray={updatedMembersArray}
            handleSelectChange={handleSelectChange}
            addMember={addMember}
            loading={loading}
            svg={svg}
            userId={userId}
          />
        )}
        <div className="keyresult-modal-row"></div>
        <input
          placeholder="add task(press enter to save)"
          value={t}
          onChange={handleChange}
          onKeyUp={onKeyUp}
          disabled={userId ? true : loading}
        />
        <h4>Tasks</h4>
        <Progress
          strokeLinecap="butt"
          strokeColor="#36561bc7"
          strokeWidth={4}
          percent={progress}
        />
        {tasks?.map((r, i) => (
          <FormGroup
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label={r.task}
              checked={r.check}
              onChange={() => updateKeyresultsStatus(r._id)}
              disabled={userId ? true : loading}
            />
            {userId ? null : (
              <p style={{ margin: 0 }} onClick={() => onRemove(r._id)}>
                remove task
              </p>
            )}
          </FormGroup>
        ))}
        {userId ? null : <button onClick={addTask}>save changes</button>}
        {loading ? (
          <img style={{ height: "30px", width: "30px" }} src={svg} />
        ) : null}
      </div>
    </Modal>
  );
};

export default Keyresult;
