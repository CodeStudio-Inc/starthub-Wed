import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Input,
  Avatar,
  Row,
  Divider,
  Select,
  Card,
  Progress,
  Space,
  Col,
} from "antd";
import {
  LoadingOutlined,
  ReloadOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

import { actionCreators } from "../../../Paths";

const PortfolioCard = ({ r, props, email }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const downloadExcel = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/auth/download-excel",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Card
      style={{
        width: "550px",
        margin: "1rem",
      }}
      key={r._id}
    >
      <div className="card-content-column" key={r._id}>
        <Row xs={12}>
          <div className="avatar-column">
            <Avatar
              style={{
                backgroundColor: "#36561b56",
                marginRight: "0.5rem",
              }}
              size={55}
            >
              {r.username.substring(0, 1)}
            </Avatar>
            <h3>{r.username}</h3>
          </div>
          <div className="avatar-column">
            <h2>Pitch Deck</h2>
            {/* <h3>{r?.profile?.pitch}</h3> */}
            <h3>{r?.profile?.pitch ? r?.profile?.pitch : "Company Pitch"}</h3>
          </div>
        </Row>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="radar-graph-column">
            <h2>Founders</h2>
            <Divider style={{ margin: "0" }} />
            {r?.profile?.founder?.map((f) => (
              <div style={{ width: "90%" }} key={r.id}>
                <h3>{f.name}</h3>
                <div className="progress-bar-column">
                  <p>Growth</p>
                  <Progress
                    percent={(parseInt(f.growth) / 10) * 100}
                    size="small"
                    strokeColor="#36561b56"
                  />
                </div>
                <div className="progress-bar-column">
                  <p>Finance</p>
                  <Progress
                    percent={(parseInt(f.finance) / 10) * 100}
                    size="small"
                    strokeColor="#36561b56"
                  />
                </div>
                <div className="progress-bar-column">
                  <p>communication</p>
                  <Progress
                    percent={(parseInt(f.communication) / 10) * 100}
                    size="small"
                    strokeColor="#36561b56"
                  />
                </div>
                <div className="progress-bar-column">
                  <p>Product</p>
                  <Progress
                    percent={(parseInt(f.product) / 10) * 100}
                    size="small"
                    strokeColor="#36561b56"
                  />
                </div>
                <div className="progress-bar-column">
                  <p>Operations</p>
                  <Progress
                    percent={(parseInt(f.operations) / 10) * 100}
                    size="small"
                    strokeColor="#36561b56"
                  />
                </div>

                <Divider />
              </div>
            ))}
          </div>
          <div className="radar-graph-column">
            <h2>Revenue</h2>
            <Divider style={{ margin: "0" }} />
            <Card
              bodyStyle={{ display: "flex", flexDirection: "row" }}
              className="rev-card"
            >
              <Avatar
                style={{
                  backgroundColor: "#36561b56",
                  color: "#37561b",
                }}
                icon={<LineChartOutlined />}
                size={40}
              />
              <div className="rev-card-column">
                <h4>Total Revenue</h4>
                <h2>
                  {r?.totalRevenue
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  Shs
                </h2>
              </div>
            </Card>
            <Card
              bodyStyle={{ display: "flex", flexDirection: "row" }}
              className="rev-card"
            >
              <Avatar
                style={{
                  backgroundColor: "#36561b56",
                  color: "#37561b",
                }}
                icon={<LineChartOutlined />}
                size={40}
              />
              <div className="rev-card-column">
                <h4>Total Expense</h4>
                <h2>
                  {r?.totalExpense
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  Shs
                </h2>
              </div>
            </Card>
            <Card
              bodyStyle={{
                display: "flex",
                flexDirection: "row",
              }}
              className="rev-card"
            >
              <Avatar
                style={{
                  backgroundColor: "#36561b56",
                  color: "#37561b",
                }}
                icon={<LineChartOutlined />}
                size={40}
              />
              <div className="rev-card-column">
                <h4>Expected Revenue Share</h4>
                <h2>
                  {r?.totalExpectedRevenueShare
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  Shs
                </h2>
              </div>
            </Card>
          </div>
        </div>
        <Divider style={{ margin: "0.5rem" }} />
        <Row gutter={12}>
          <Col gutter={12}>
            <Button
              onClick={() =>
                props.history.push(`/startup/${r.username}`, {
                  data: r,
                })
              }
              style={{ color: "#37561b" }}
              type="link"
            >
              view startup
            </Button>
          </Col>
          <Col gutter={12}>
            <Button
              onClick={downloadExcel}
              style={{ color: "#37561b" }}
              type="link"
            >
              Export Excel
            </Button>
          </Col>
          <Col gutter={12}>
            <Button
              onClick={() => email(r)}
              style={{ color: "#37561b" }}
              type="link"
            >
              send email
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default PortfolioCard;
