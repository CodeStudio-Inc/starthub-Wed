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
  Card,
  Grid,
  Table,
} from "antd";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const { Option } = Select;
function Teams({ open, showDrawer, onClose, tableRef, props, teams }) {
  const revenueTotal = teams.filter(
    (el) => typeof el.totalRevenue !== "undefined"
  );

  const totalRevenue = Array.from(
    revenueTotal,
    ({ totalRevenue }) => totalRevenue
  ).reduce((a, b) => a + b, 0);
  const totalExpense = Array.from(
    revenueTotal,
    ({ totalExpense }) => totalExpense
  ).reduce((a, b) => a + b, 0);
  const totalExpectedRevenuePaid = Array.from(
    revenueTotal,
    ({ totalExpectedRevenueShare }) => totalExpectedRevenueShare
  ).reduce((a, b) => a + b, 0);

  const totalRevenueSharePaid = Array.from(
    revenueTotal,
    ({ totalRevSharePaid }) => totalRevSharePaid
  ).reduce((a, b) => a + b, 0);
  const columns = [
    {
      title: "Startup",
      dataIndex: "username",
      key: "username",
      align: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      align: "center",
    },
    {
      title: "Total Expenses",
      dataIndex: "totalExpense",
      key: "totalExpense",
      align: "center",
    },

    {
      title: "ExpectedRevenueShare",
      dataIndex: "totalExpectedRevenueShare",
      key: "totalExpectedRevenueShare",
      align: "center",
    },
    {
      title: "Total RevenueShare Paid",
      dataIndex: "totalRevSharePaid",
      key: "totalRevSharePaid",
      align: "center",
    },
  ];
  return (
    <Drawer
      title="Catalyzer Teams"
      // width={400}
      closeIcon={null}
      height={700}
      onClose={onClose}
      placement="bottom"
      visible={open}
      extra={
        <Space>
          <Button onClick={onClose} className="btn">
            Cancel
          </Button>
        </Space>
      }
    >
      <div className="teamsContainer">
        <Row
          xs={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            marginBottom: "1rem",
          }}
        >
          <Card className="card2" style={{ padding: "0", height: "120px" }}>
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <TrendingUpIcon
                    style={{ fontSize: "18px", color: "#37561b" }}
                  />
                </div>
                <h3>Total Revenue</h3>
              </div>
              <h1>
                Shs{" "}
                {Math.round(totalRevenue)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </h1>
            </div>
          </Card>
          <Card className="card2" style={{ padding: "0", height: "120px" }}>
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <TrendingUpIcon
                    style={{ fontSize: "18px", color: "#37561b" }}
                  />
                </div>
                <h3>Total Expense</h3>
              </div>
              <h1>
                Shs{" "}
                {Math.round(totalExpense)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </h1>
            </div>
          </Card>
          <Card className="card2" style={{ padding: "0", height: "120px" }}>
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <TrendingUpIcon
                    style={{ fontSize: "18px", color: "#37561b" }}
                  />
                </div>
                <h3>Total Expected Revenue Share</h3>
              </div>
              <h1>
                Shs{" "}
                {Math.round(totalExpectedRevenuePaid)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </h1>
            </div>
          </Card>
          <Card className="card2" style={{ padding: "0", height: "120px" }}>
            <div className="card-content-column">
              <div className="card2-row">
                <div className="card-content-row-avatar">
                  <TrendingUpIcon
                    style={{ fontSize: "18px", color: "#37561b" }}
                  />
                </div>
                <h3>Total Revenue Share Paid</h3>
              </div>
              <h1>
                Shs{" "}
                {Math.round(totalRevenueSharePaid)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </h1>
            </div>
          </Card>
        </Row>
        <Table
          ref={tableRef}
          columns={columns}
          dataSource={[
            ...teams.map((r) => ({
              ...r,
              key: r._id,
              totalRevenue: isNaN(r.totalRevenue)
                ? 0
                : Math.round(r.totalRevenue)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              totalExpense: isNaN(r.totalExpense)
                ? 0
                : Math.round(r.totalExpense)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              totalExpectedRevenueShare: isNaN(r.totalExpectedRevenueShare)
                ? 0
                : Math.round(r.totalExpectedRevenueShare)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              totalRevSharePaid: isNaN(r.totalRevSharePaid)
                ? 0
                : Math.round(r.totalRevSharePaid)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            })),
          ]}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                props.history.push(`/startup/${record.username}`, {
                  data: record,
                });
              },
            };
          }}
          style={{ width: "90%" }}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </div>
    </Drawer>
  );
}

export default Teams;
