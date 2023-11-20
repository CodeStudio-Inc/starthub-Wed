import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, svg } from "../../Paths";
import {
  message,
  Tabs,
  Row,
  Select,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Button,
} from "antd";
import { getRandomColor } from "../../utilities/helpers";
import TextField from "@mui/material/TextField";
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";

import "antd/dist/antd.css"; //

const AddObjectiveDialogue = ({
  open,
  closeModal,
  setPayload,
  startupOptions,
  mentorOptions,
  currentQuater,
}) => {
  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;
  const [state, setState] = React.useState({
    description: "",
    quarter: 0,
  });
  const [description, setDescription] = React.useState(" ");
  const [quarter, setQuarter] = React.useState(" ");
  const [title, setTitle] = React.useState(" ");
  const [startup, setStartup] = React.useState([]);
  const [mentor, setMentor] = React.useState([]);
  const [venue, setVenue] = React.useState(" ");
  const [date, setDate] = React.useState(" ");
  const [duration, setDuration] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("");
  const [selected, setSelected] = React.useState([]);

  const { category } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const handleDateOnChange = (date, dateString) => {
    setDate(dateString);
  };

  const handleDurationOnChange = (date, dateString) => {
    setDuration(dateString);
  };

  const handleQuarterChange = (value) => {
    setQuarter(value);
  };

  const addObjective = () => {
    const data = {
      description: description,
      quarter: quarter,
      category,
    };
    dispatch(
      actionCreators.addItem(
        `catalyzer/objective`,
        data,
        (data) => {
          const { description, quarter } = data;
          if (!description || !quarter) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
            setState({
              description: "",
              quarter: "",
            });
            closeModal();
          }
          if (!success) console.log(success);
        }
      )
    );
  };

  const addNote = () => {
    if (!duration.length || !date)
      return message.error("Please update the date and duration to proceed!");
    const data = {
      title: title,
      startup: [...startup.map((s) => s.value)],
      mentor: [...mentor.map((m) => m.value)],
      date: date,
      duration: duration,
      venue: venue,
    };

    dispatch(
      actionCreators.addItem(
        `catalyzer/note`,
        data,
        (data) => {
          const { title } = data;
          if (
            !title ||
            !startup.length ||
            !mentor.length ||
            !date ||
            !duration.length ||
            !venue
          )
            return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setTitle("");
            setDate("");
            setDuration("");
            dispatch(actionCreators.setNotes(data.notes));
            closeModal();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <Modal
      // title=""
      centered
      visible={open}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <Tabs
        style={{ width: "100%" }}
        tabBarStyle={{ color: "#37561b" }}
        size="small"
        type="card"
        onTabClick={(e) => setActiveTab(e)}
        defaultActiveKey="1"
      >
        <TabPane tab="Add Objective" key="1">
          <h4 className="session-text">Objective</h4>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="session-input"
          />
          <h4 className="session-text">Quarter</h4>
          <InputNumber
            min={1}
            max={4}
            className="number-input"
            defaultValue={currentQuater}
            onChange={handleQuarterChange}
          />
          <Button onClick={addObjective} disabled={loading}>
            Save
          </Button>
        </TabPane>
        <TabPane tab="Add Session" key="2">
          <h4 className="session-text">Title</h4>
          <Input
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="session-input"
          />
          <h4 className="session-text">Startup</h4>
          <MultiSelect
            options={startupOptions}
            value={startup}
            className="multiple-select"
            onChange={setStartup}
            labelledBy="Select startup"
          />
          <h4 className="session-text">Mentor</h4>
          <MultiSelect
            options={mentorOptions}
            className="multiple-select"
            value={mentor}
            onChange={setMentor}
            labelledBy="Select startup"
          />
          <Row
            xs={12}
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <DatePicker
              className="session-date-picker"
              onChange={handleDateOnChange}
            />
            <TimePicker.RangePicker
              onChange={handleDurationOnChange}
              format="HH:mm A"
              use12Hours
            />
          </Row>
          <h4 className="session-text">Location</h4>
          <Input
            value={venue}
            placeholder="Title"
            onChange={(e) => setVenue(e.target.value)}
            disabled={loading}
            className="session-input"
          />
          <Button onClick={addNote} disabled={loading}>
            Save
          </Button>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AddObjectiveDialogue;
