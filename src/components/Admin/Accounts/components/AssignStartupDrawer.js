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

const AssignStartupDrawer = ({ toggle, open, startupNames }) => {
  const { loading, mentor } = useSelector((state) => state.requests);

  const [checkedList, setCheckedList] = React.useState([]);
  const [UncheckedList, setUnCheckedList] = React.useState([]);
  const [toggleBtn, setToggleBtn] = React.useState(false);

  const mentorId = mentor?._id;

  const CheckboxGroup = Checkbox.Group;
  const dispatch = useDispatch();

  const checkAll = startupNames?.length === checkedList?.length;
  const indeterminate =
    checkedList?.length > 0 && checkedList?.length < startupNames?.length;

  const handleAssignToggle = () => setToggleBtn(false);
  const handleUnAssignToggle = () => setToggleBtn(true);

  const onChange = (list) => {
    setCheckedList(list);
    handleAssignToggle();
  };
  const onUnAssignChange = (list) => {
    setUnCheckedList(list);
    handleUnAssignToggle();
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? startupNames?.map((m) => m.value) : []);
  };

  const assignedStartups = mentor?.teams?.map((m) => ({
    label: startupNames?.find((s) => s.value === m)?.label,
    value: m,
  }));

  const assignStartup = () => {
    if (toggleBtn) return unAssignStartup();
    const data = {
      teams: checkedList,
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
            setCheckedList([]);
            toggle();
            handleAssignToggle();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const unAssignStartup = () => {
    const data = {
      teams: UncheckedList,
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
            dispatch(actionCreators.setUsers(data.users));
            toggle();
            handleAssignToggle();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <Drawer
      // title="Assign Startup"
      // width={400}
      closeIcon={null}
      width="12.6rem"
      onClose={toggle}
      placement="right"
      visible={open}
      extra={
        <Space>
          {/* <Button className="btn" onClick={toggle}>
            Cancel
          </Button> */}
          <Button className="btn" onClick={assignStartup}>
            {toggleBtn ? "UnAssign" : "Assign"}
          </Button>
          {/* {loading ? (
            <img src={svg} style={{ height: "30px", width: "30px" }} />
          ) : null} */}
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
        <h4 style={{ color: "rgba(0,0,0,0.4)" }}>Select Startups</h4>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <Divider />
        <CheckboxGroup
          options={startupNames}
          value={checkedList}
          onChange={onChange}
        />
        <Divider />
        <h4 style={{ color: "rgba(0,0,0,0.4)" }}>Check to unassigned</h4>
        {
          <CheckboxGroup
            options={assignedStartups}
            value={UncheckedList}
            onChange={onUnAssignChange}
          />
        }
        <Divider />
      </div>
    </Drawer>
  );
};

export default AssignStartupDrawer;
