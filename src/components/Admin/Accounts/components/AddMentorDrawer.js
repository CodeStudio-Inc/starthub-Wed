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

const AddMentorDrawer = ({ toggle, open }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleCustomRequest = async ({ file, onSuccess, onError }) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) return message.error("Image must smaller than 2MB!");
    try {
      const data = new FormData();
      data.append("upload_preset", "starthub_preset");
      data.append("cloud_name", "starthub-africa");
      data.append("file", file);
      console.log(data);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/starthub-africa/upload",
        {
          method: "POST",
          body: data,
        }
      );

      console.log(response);

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

  const departmentOptions = [
    { label: "Launch Pad", value: "launch pad" },
    { label: "Catalyzer", value: "catalyzer" },
    { label: "Consultancy", value: "consultancy" },
    { label: "M&E", value: "m&e" },
    { label: "Accounts", value: "accounts" },
  ];

  const professionOptions = [
    { label: "Venture Associate", value: "Venture Associate" },
    {
      label: "Monitoring & Evaluation Expert",
      value: "Monitoring & Evaluation Expert",
    },
    { label: "Sales Expert", value: "Sales Expert" },
    { label: "Project Manager", value: "Project Manager" },
    { label: "Accountant", value: "Accountant" },
  ];

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Team Lead", value: "team lead" },
    { label: "Team Member", value: "team Member" },
  ];

  const permissionOptions = [
    { label: "Viewer", value: "viewer" },
    { label: "Editor", value: "editor" },
  ];

  return (
    <Drawer
      title="Add Mentor"
      // width={400}
      closeIcon={null}
      height={600}
      onClose={toggle}
      placement="bottom"
      visible={open}
      extra={
        <Space>
          <Button className="btn" onClick={toggle}>
            Cancel
          </Button>
          <Button className="btn">Submit</Button>
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
            <Col span={12}>
              <Form.Item
                name="username"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input
                  // placeholder="Please enter user monthly expense"
                  // value={newRevState.month_expense}
                  // onChange={(e) =>
                  //   setNewRevState({
                  //     ...newRevState,
                  //     month_expense: e.target.value,
                  //   })
                  // }
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="profession"
                label="Profession"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please select profession",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={professionOptions}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please select department",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={departmentOptions}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please select user role",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={roleOptions}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="permissions"
                label="Permissions"
                rules={[
                  {
                    required: true,
                    message: "Please select permission",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={permissionOptions}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Profile Image"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please upload Profile image",
                  },
                ]}
              >
                <Upload customRequest={handleCustomRequest}>
                  <Button style={{ width: "100%" }}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input
                  // placeholder="Please enter user monthly expense"
                  // value={newRevState.month_expense}
                  // onChange={(e) =>
                  //   setNewRevState({
                  //     ...newRevState,
                  //     month_expense: e.target.value,
                  //   })
                  // }
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter password",
                  },
                ]}
              >
                <Input
                  // placeholder="Please enter user monthly expense"
                  // value={newRevState.month_expense}
                  // onChange={(e) =>
                  //   setNewRevState({
                  //     ...newRevState,
                  //     month_expense: e.target.value,
                  //   })
                  // }
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddMentorDrawer;
