import React from "react";
import {
  Modal,
  Button,
  Upload,
  message,
  Box,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../Paths";

const AddEventModal = ({ open, toggle, startups }) => {
  const [name, setName] = React.useState("");
  const [speaker, setSpeaker] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [type, setType] = React.useState("");
  const [invites, setInvites] = React.useState("");
  const [date, setDate] = React.useState("");

  const { loading } = useSelector((state) => state.requests);
  const { username } = useSelector((state) => state.auth);

  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const handleDurationOnChange = (date, dateString) => {
    setDate(dateString);
  };

  const handleInvitesChange = (value, option) => {
    setInvites(option.map((o) => o.value));
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleAddEvent = () => {
    const data = {
      name,
      speaker,
      venue,
      type,
      invites,
      duration: date,
      updatedBy: username,
    };
    dispatch(
      actionCreators.addItem(
        `catalyzer/event`,
        data,
        (data) => {
          const { name, venue, type, duration } = data;
          if (!name || !duration?.length || !venue || !type) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            message.info("Successfully added Program");
            dispatch(actionCreators.setEvents(data.events));
            setName("");
            setVenue("");
            setSpeaker("");
            toggle();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const handleCustomRequest = async ({ file, onSuccess, onError }) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) return message.error("Image must smaller than 2MB!");
    try {
      const data = new FormData();
      data.append("upload_preset", "starthub_preset");
      data.append("cloud_name", "starthub-africa");
      data.append("file", file);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/starthub-africa/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        onSuccess(result, file);
        message.info("successful");
      } else {
        onError(new Error("Upload failed"));
        message.error("Upload Failed");
      }
    } catch (error) {
      onError(error);
    }
  };

  const eventTypeOPtions = [
    { label: "Group Training", value: "group_training" },
    { label: "Specific Individuals", value: "specific_individuals" },
    { label: "One on One Session", value: "one_on_one" },
  ];

  const invitesList = startups?.map((s) => ({
    label: s.username,
    value: s.email,
  }));

  return (
    <Modal
      title="Add Event"
      visible={open}
      onCancel={toggle}
      footer={null}
      width={600}
      style={{ top: "0" }}
    >
      <div className="event-modal">
        <div className="event-modal-content">
          <Form
            span={20}
            layout="vertical"
            validateMessages="All fields required"
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              width="100%"
              rules={[
                {
                  required: true,
                  message: "Please enter event title",
                },
              ]}
            >
              <Input
                disabled={loading}
                size="large"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="type"
              label="Event Type"
              width="100%"
              rules={[
                {
                  required: true,
                  message: "Please select event type",
                },
              ]}
            >
              <Select
                allowClear
                disabled={loading}
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleTypeChange}
                options={eventTypeOPtions}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="invite"
              label="Select Indivduals to Invites"
              width="100%"
              rules={[
                {
                  required: true,
                  message: "Please add invites",
                },
              ]}
            >
              <Select
                disabled={loading}
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleInvitesChange}
                options={invitesList}
                size="large"
              />
            </Form.Item>
            <Form.Item
              placeholder="optional"
              name="speaker"
              label="Guest Speaker(optional)"
              width="100%"
            >
              <Input
                disabled={loading}
                size="large"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="duration"
              label="Date"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter duration",
                },
              ]}
            >
              <RangePicker
                disabled={loading}
                showTime
                style={{ marginRight: "1rem", width: "100%" }}
                onChange={handleDurationOnChange}
                size="large"
                format="YYYY-MM-DDTHH:mm"
              />
            </Form.Item>
            <Form.Item
              name="venue"
              label="location"
              width="100%"
              rules={[
                {
                  required: true,
                  message: "Please enter venue",
                },
              ]}
            >
              <Input
                disabled={loading}
                size="large"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Upload>
                <Button style={{ marginTop: "1rem" }}>
                  Add Featured Image
                </Button>
              </Upload>
            </Form.Item>
            <Button disabled={loading} onClick={handleAddEvent}>
              Save
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddEventModal;
