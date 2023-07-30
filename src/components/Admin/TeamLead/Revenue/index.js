import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Divider, Typography } from "@mui/material";
import { Table, message, Input, Button } from "antd";
import { isInteger } from "formik";
import { actionCreators } from "../../../Paths";
import { PlusOutlined } from "@ant-design/icons";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

import AddRevenueDrawer from "./AddRevenueDrawer";
import "./Styles.css";
const { Search } = Input;
const Revenue = () => {
  const [id, setId] = React.useState("");
  const [revState, setRevState] = React.useState({
    month_revenue: "",
    month_expense: "",
    revSharepayment: "",
    expectedRevsharePayment: "",
  });
  const [newRevState, setNewRevState] = React.useState({
    id: "",
    month_revenue: "",
    month_expense: "",
    date: "",
    month: "",
  });
  const [columnIndex, setColumnIndex] = React.useState(null);
  const [paymentsIndex, setPaymnentsIndex] = React.useState(null);
  const { revenue } = useSelector((state) => state.requests);
  const { users } = useSelector((state) => state.admin);

  const tableRef = React.useRef(null);

  const startups = users.filter(
    (r) => r.teamCategory === "catalyzer" && r.userRole === "startup"
  );

  console.log(startups);

  const [open, setOpen] = React.useState(false);

  //   console.log(revState);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getRevenue();
  }, []);
  const dispatch = useDispatch();

  const getRevenue = () => {
    dispatch(
      actionCreators.getItem(
        `http://localhost:8080/admin/all-revenue`,
        (res) => {
          const { success, error, data } = res;
          if (success) dispatch(actionCreators.setRevenue(data.revenue));
          if (!success) message.info("Request Failed");
        }
      )
    );
  };

  const updateRevenue = (id) => {
    const data = revState;
    dispatch(
      actionCreators.updateItem(
        `admin/update-revenue/${id}`,
        data,
        (data) => {
          const { month_revenue, month_expense } = data;
          if (!month_revenue || !month_expense) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setRevenue(data.revenue));
            setColumnIndex(null);
          }
          if (!success) message.info("Request Failed");
        }
      )
    );
  };

  const addRevenue = () => {
    if (
      !isInteger(newRevState.month_revenue) ||
      !isInteger(newRevState.month_expense)
    )
      return message.info("All fields are required");
    if (
      moment(newRevState.date).format("MMM") !==
      newRevState.month.substring(0, 3)
    )
      return message.info(
        "Month selected should match with the month in the selected date"
      );
    const data = newRevState;
    console.log(data);
    dispatch(
      actionCreators.addItem(
        `admin/revenue`,
        data,
        (data) => {
          const { id, month_revenue, month_expense, date, month } = data;
          if (!id || !month_revenue || !month_expense || !date || !month)
            return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            console.log(data);
            // dispatch(actionCreators.setRevenue(data.revenue));
            // onClose();
          }
          if (!success) message.info("Request Failed");
        }
      )
    );
  };

  const payment = (id) => {
    const data = newRevState;
    if (!isInteger(data.revSharepayment))
      return message.info("Invalid data entry");
    if (
      data.revSharepayment >= data.expectedRevsharePayment ||
      data.revSharepayment < 0
    )
      return message.info("Amounts exceeds expected payment");
    dispatch(
      actionCreators.updateItem(
        `admin/payment/${id}`,
        data,
        (data) => {
          const { revSharepayment } = data;
          if (!revSharepayment) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setRevenue(data.revenue));
            setPaymnentsIndex(null);
          }
          if (!success) message.info("Request Failed");
        }
      )
    );
  };

  const onSearch = (value) => {
    dispatch(
      actionCreators.getItem(
        `http://localhost:8080/admin/filter-startup?startup=${value}`,
        (res) => {
          const { success } = res;
          if (success) dispatch(actionCreators.setRevenue(res.data.revenue));
          if (!success) message.info("Request Failed");
        }
      )
    );
  };

  const columns = [
    {
      title: "Startup",
      dataIndex: "startup",
      key: "startup",
      align: "left",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "left",
    },
    {
      title: "Monthly Revenue(UGX)",
      dataIndex: "month_revenue",
      key: "month_revenue",
      align: "left",
      render: (text, record, rowIndex) => (
        <div className="revenue-table-cell-row">
          {columnIndex === rowIndex ? (
            <input
              value={revState.month_revenue}
              onChange={(e) =>
                setRevState({ ...revState, month_revenue: e.target.value })
              }
              placeholder="Shs"
            />
          ) : null}
          {columnIndex !== rowIndex ? (
            <p className="table-cell-btn">{text}</p>
          ) : null}
        </div>
      ),
    },
    {
      title: "Monthly Expense(UGX)",
      dataIndex: "month_expense",
      key: "month_expense",
      align: "left",
      render: (text, record, rowIndex) => (
        <div className="revenue-table-cell-row">
          {columnIndex === rowIndex ? (
            <input
              value={revState.month_expense}
              onChange={(e) =>
                setRevState({ ...revState, month_expense: e.target.value })
              }
              placeholder="Shs"
            />
          ) : null}
          {columnIndex !== rowIndex ? (
            <p className="table-cell-btn">{text}</p>
          ) : null}
        </div>
      ),
    },
    {
      title: "Expected Revenue Share Payment(UGX)",
      dataIndex: "expectedRevsharePayment",
      key: "expectedRevsharePayment",
      align: "left",
      render: (r) => (
        <div className="revenue-table-cell-row">
          <p style={{ color: "red" }}>{r}</p>
        </div>
      ),
    },
    {
      title: "Revenue Share Payment(UGX)",
      dataIndex: "revSharepayment",
      key: "revSharepayment",
      align: "left",
      render: (text, record, rowIndex) => (
        <div className="revenue-table-cell-row">
          {paymentsIndex === rowIndex ? (
            <input
              value={newRevState.revSharepayment}
              onChange={(e) =>
                setNewRevState({
                  ...newRevState,
                  revSharepayment: e.target.value,
                })
              }
              placeholder="Shs"
            />
          ) : null}
          {paymentsIndex !== rowIndex ? (
            <p className="table-cell-btn">{text}</p>
          ) : null}
        </div>
      ),
    },
    {
      title: "reveune",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="revenue-table-cell-row">
          {columnIndex !== rowIndex ? (
            <h4
              onClick={() => {
                setId(text);
                setColumnIndex(rowIndex);
                setRevState({
                  month_revenue: record.month_revenue.replace(/\,/g, ""),
                  month_expense: record.month_expense.replace(/\,/g, ""),
                  revSharepayment: record.revSharepayment.replace(/\,/g, ""),
                });
              }}
            >
              edit revenue
            </h4>
          ) : null}
          {columnIndex === rowIndex ? (
            <h4 onClick={() => updateRevenue(record._id)}>save</h4>
          ) : null}
          {columnIndex === rowIndex ? (
            <CancelIcon
              style={{ fontSize: "20px", color: "#37561b" }}
              className="icon"
              onClick={() => setColumnIndex(null)}
            />
          ) : null}
        </div>
      ),
    },
    {
      title: "payments",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="revenue-table-cell-row">
          {paymentsIndex !== rowIndex ? (
            <h4
              onClick={() => {
                setId(text);
                setPaymnentsIndex(rowIndex);
                setNewRevState({
                  month_revenue: record.month_revenue.replace(/\,/g, ""),
                  month_expense: record.month_expense.replace(/\,/g, ""),
                  revSharepayment: record.revSharepayment.replace(/\,/g, ""),
                  expectedRevsharePayment:
                    record.expectedRevsharePayment.replace(/\,/g, ""),
                });
              }}
            >
              edit payments
            </h4>
          ) : null}
          {paymentsIndex === rowIndex ? (
            <h4 onClick={() => payment(record._id)}>save</h4>
          ) : null}
          {paymentsIndex === rowIndex ? (
            <CancelIcon
              style={{ fontSize: "20px", color: "#37561b" }}
              className="icon"
              onClick={() => setPaymnentsIndex(null)}
            />
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <Grid container className="revenue-container">
      <Grid container className="revenue-header">
        {/* <Grid item>
          <Button
            onClick={showDrawer}
            style={{ color: "#fff", background: "#37561b", border: "none" }}
            icon={<PlusOutlined />}
          >
            Add Revenue
          </Button>
        </Grid> */}
        <Grid item>
          <Search
            placeholder="input startup username"
            allowClear
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </Grid>
      </Grid>
      <AddRevenueDrawer
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
        startups={startups}
        newRevState={newRevState}
        setNewRevState={setNewRevState}
        addRevenue={addRevenue}
      />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Table
          ref={tableRef}
          columns={columns}
          dataSource={[
            ...revenue?.map((r) => ({
              ...r,
              key: r._id,
              month_revenue: r.month_revenue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              month_expense: r.month_expense
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              expectedRevsharePayment: r.expectedRevsharePayment
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              revSharepayment: r.revSharepayment
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            })),
          ]}
          //   onRow={(record, rowIndex) => {
          //     return {
          //       onClick: () => {
          //         setColumnIndex(rowIndex);
          //       },
          //     };
          //   }}
          style={{ width: "100%", marginTop: "1rem" }}
          bordered={true}
          // scroll={{
          //   x: 2000,
          // }}
          pagination={{
            defaultPageSize: 9,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Revenue;
