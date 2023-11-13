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

const AddStartupDrawer = ({ toggle, open, options }) => {
  const [date, setDate] = React.useState(" ");

  const handleDateOnChange = (date, dateString) => {
    setDate(dateString);
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

  return (
    <Drawer
      title="Add Startup"
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
                label="Company Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter company name",
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
                name="email"
                label="Email"
                style={{ width: "100%" }}
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
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="program"
                label="Program"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Program",
                  },
                ]}
              >
                <Select size="large" options={options} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="revenue"
                label="Current Revenue"
                rules={[
                  {
                    required: true,
                    message: "Please enter current revenue",
                  },
                ]}
              >
                <Input
                  prefix="Shs"
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
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Contract Date"
                rules={[
                  {
                    required: true,
                    message: "Please enter contract date",
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  onChange={handleDateOnChange}
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
                    message: "Please select password",
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
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="logo"
                label="Company Logo"
                rules={[
                  {
                    required: true,
                    message: "Please upload a company logo",
                  },
                ]}
              >
                <Upload customRequest={handleCustomRequest}>
                  <Button style={{ width: "100%" }}>Add company logo</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddStartupDrawer;
