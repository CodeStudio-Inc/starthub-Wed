import React, { useState } from "react";
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
} from "antd";
const { Option } = Select;
const AddRevenueDrawer = ({
  open,
  showDrawer,
  onClose,
  startups,
  newRevState,
  setNewRevState,
  addRevenue,
  loading,
  svg,
}) => {
  const months = [
    { month: "January", value: "Jan" },
    { month: "February", value: "Feb" },
    { month: "March", value: "Mar" },
    { month: "April", value: "Apr" },
    { month: "May", value: "May" },
    { month: "June", value: "Jun" },
    { month: "July", value: "Jul" },
    { month: "August", value: "Aug" },
    { month: "September", value: "Sep" },
    { month: "October", value: "Oct" },
    { month: "November", value: "Nov" },
  ];

  const options = [
    ...startups.map((r) => ({ startup: r.username, value: r._id })),
  ];

  const onChange = (date, dateString) => {
    setNewRevState({ ...newRevState, date: dateString });
  };

  return (
    <>
      <Drawer
        title="Add New Revenue"
        // width={400}
        closeIcon={null}
        height={600}
        onClose={onClose}
        placement="bottom"
        visible={open}
        extra={
          <Space>
            <Button onClick={onClose} className="btn">
              Cancel
            </Button>
            <Button onClick={addRevenue} className="btn">
              Submit
            </Button>
            {loading ? (
              <img src={svg} style={{ height: "30px", width: "30px" }} />
            ) : null}
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
            <Form.Item
              name="startup"
              label="Startup"
              rules={[
                {
                  required: true,
                  message: "Please select startup",
                },
              ]}
            >
              <select
                className="select"
                value={newRevState.id}
                onChange={(e) =>
                  setNewRevState({ ...newRevState, id: e.target.value })
                }
              >
                <option>-select startup-</option>
                {options.map((m, i) => (
                  <option key={i} value={m.value}>
                    {m.startup}
                  </option>
                ))}
              </select>
            </Form.Item>
            <Form.Item
              name="month_revenue"
              label="Monthly revenue"
              rules={[
                {
                  required: true,
                  message: "Please enter monthly revenue",
                },
              ]}
            >
              <Input
                placeholder="Please enter user monthly revenue"
                value={newRevState.month_revenue}
                onChange={(e) =>
                  setNewRevState({
                    ...newRevState,
                    month_revenue: e.target.value,
                  })
                }
                style={{ height: "50px" }}
              />
            </Form.Item>
            <Form.Item
              name="month_expense"
              label="Monthly expense"
              rules={[
                {
                  required: true,
                  message: "Please enter monthly expense",
                },
              ]}
            >
              <Input
                placeholder="Please enter user monthly expense"
                value={newRevState.month_expense}
                onChange={(e) =>
                  setNewRevState({
                    ...newRevState,
                    month_expense: e.target.value,
                  })
                }
                style={{ height: "50px" }}
              />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                  message: "Please choose the date",
                },
              ]}
            >
              <DatePicker
                style={{
                  height: "50px",
                  width: "100%",
                }}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="month"
              label="Month"
              rules={[
                {
                  required: true,
                  message: "Please select month",
                },
              ]}
            >
              <select
                className="select"
                value={newRevState.month}
                onChange={(e) =>
                  setNewRevState({
                    ...newRevState,
                    month: e.target.value,
                  })
                }
              >
                <option>-select month-</option>
                {months.map((m, i) => (
                  <option key={i} value={m.value}>
                    {m.month}
                  </option>
                ))}
              </select>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default AddRevenueDrawer;
