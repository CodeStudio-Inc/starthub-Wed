import React from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
  Checkbox,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../Paths";
import { MultiSelect } from "react-multi-select-component";

const AssignStartupDrawer = ({ toggle, open, startupNames }) => {
  const { loading, mentor } = useSelector((state) => state.requests);

  const [assignStartup, setAssignStartup] = React.useState([]);
  const [unAssignStartup, setUnAssignStartup] = React.useState([]);

  const mentorId = mentor?._id;
  const dispatch = useDispatch();

  const assignedStartups = mentor?.teams?.map((m) => ({
    label: startupNames?.find((s) => s.value === m)?.label,
    value: m,
  }));

  const handleAssignStartup = () => {
    const data = {
      teams: assignStartup.map((s) => s.value),
    };
    dispatch(
      actionCreators.updateItem(
        `auth/assign/${mentorId}`,
        data,
        (data) => {
          const { teams } = data;
          if (!teams.length) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            message.info("Successfully assigned startup");
            dispatch(actionCreators.setUsers(data.users));
            toggle();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const handleUnAssignStartup = () => {
    const data = {
      teams: unAssignStartup.map((s) => s.value),
    };
    dispatch(
      actionCreators.updateItem(
        `auth/unassign/${mentorId}`,
        data,
        (data) => {
          const { teams } = data;
          if (!teams.length) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            message.info("Successfully unassigned startup");
            dispatch(actionCreators.setUsers(data.users));
            toggle();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <Drawer
      closeIcon={null}
      width="20rem"
      onClose={toggle}
      placement="right"
      visible={open}
      extra={
        <Space>
          <Button disabled={loading} className="btn" onClick={toggle}>
            cancel
          </Button>
        </Space>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h4 style={{ color: "rgba(0,0,0,0.8)" }}>Select Startups</h4>
        <MultiSelect
          disabled={loading}
          options={startupNames}
          value={assignStartup}
          className="startup-multiple-select"
          onChange={setAssignStartup}
          labelledBy="Select startup"
        />
        <Button
          disabled={loading}
          type="link"
          style={{ color: "#37561b" }}
          onClick={handleAssignStartup}
        >
          Assign
        </Button>
        <Divider />
        <h4 style={{ color: "rgba(0,0,0,0.8)" }}>Assign Startup</h4>
        <MultiSelect
          disabled={loading}
          options={assignedStartups}
          value={unAssignStartup}
          className="startup-multiple-select"
          onChange={setUnAssignStartup}
          labelledBy="Select startup"
        />
        <Button
          disabled={loading}
          type="link"
          style={{ color: "#37561b" }}
          onClick={handleUnAssignStartup}
        >
          UnAssign
        </Button>
        <Divider />
      </div>
    </Drawer>
  );
};

export default AssignStartupDrawer;
