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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../Paths";

const AddProgramDrawer = ({ toggle, open, mentors }) => {
  const [name, setName] = React.useState("");
  const [programLead, setProgramLead] = React.useState("");
  const [date, setDate] = React.useState("");

  const { username } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.requests);

  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const handleDateOnChange = (date, dateString) => {
    setDate(dateString);
  };

  const options = mentors.map((m) => ({
    label: m.username,
    value: m.username,
  }));

  const handleAddProgram = () => {
    const data = {
      name,
      programLead,
      duration: date,
      updatedBy: username,
    };
    console.log(data);
    dispatch(
      actionCreators.addItem(
        `catalyzer/program`,
        data,
        (data) => {
          const { name, programLead } = data;
          if (!name || !programLead) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            message.info("Successfully added Program");
            dispatch(actionCreators.setPrograms(data.programs));
            toggle();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const handleChange = (value) => {
    setProgramLead(value);
  };

  return (
    <Drawer
      title="Add Program"
      // width={400}
      closeIcon={null}
      height={450}
      onClose={toggle}
      placement="bottom"
      visible={open}
      extra={
        <Space>
          <Button className="btn" onClick={toggle}>
            Cancel
          </Button>
          <Button disabled={loading} className="btn" onClick={handleAddProgram}>
            Submit
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          span={20}
          layout="vertical"
          validateMessages="All fields required"
          style={{
            width: "60%",
          }}
        >
          <Row gutter={12}>
            <Form.Item
              name="program"
              label="Program Name"
              style={{ width: "90%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter program name",
                },
              ]}
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="large"
              />
            </Form.Item>
          </Row>
          <Row gutter={12}>
            <Form.Item
              name="lead"
              label="Progran Lead"
              style={{ width: "90%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter program Lead",
                },
              ]}
            >
              <Select size="large" options={options} onChange={handleChange} />
            </Form.Item>
          </Row>
          <Row gutter={12}>
            <Form.Item
              name="duration"
              label="Duration"
              style={{ width: "90%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter duration",
                },
              ]}
            >
              <RangePicker
                style={{ marginRight: "1rem", width: "100%" }}
                onChange={handleDateOnChange}
                size="large"
              />
            </Form.Item>
          </Row>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddProgramDrawer;
