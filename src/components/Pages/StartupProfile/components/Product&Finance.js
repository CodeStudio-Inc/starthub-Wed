import React from "react";
import { Table } from "antd";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Finance = ({
  revenue,
  finance,
  setRevenue,
  productInput,
  handleProductAdd,
  handleProductDelete,
  handleProductNameChange,
  handleProductPriceChange,
  handleProductUnitCostChange,
}) => {
  const tableRef = React.useRef(null);
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "left",
      render: (r) => (
        <p style={{ color: "#37561b" }}>
          <strong style={{ fontWeight: "300", marginRight: "0.5rem" }}>
            UGX
          </strong>
          {r.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      ),
    },
    {
      title: "Unit Production Cost",
      dataIndex: "unitCost",
      key: "unitCost",
      align: "left",
      render: (r) => (
        <p>
          <strong style={{ fontWeight: "300", marginRight: "0.5rem" }}>
            UGX
          </strong>
          {r.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      ),
    },
  ];
  return (
    <div className="accordion">
      {finance ? (
        <div className="profile-listing-row">
          <div className="finance-card">
            <h4>
              <strong
                style={{
                  color: "#dfa126",
                  marginRight: "0.5rem",
                  background: "#dfa1264d",
                  padding: "2px",
                  borderRadius: "5px",
                }}
              >
                $
              </strong>
              Total lifetime revenue sofar
            </h4>
            <h2>
              ${finance?.lifeTimeRevenue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>
          </div>
          <div className="finance-card">
            <h4>
              <strong
                style={{
                  color: "#dfa126",
                  marginRight: "0.5rem",
                  background: "#dfa1264d",
                  padding: "2px",
                  borderRadius: "5px",
                }}
              >
                $
              </strong>
              Revenue of last full month
            </h4>
            <h2>
              ${finance?.fullMonthRevenue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>
          </div>
          <div className="finance-card">
            <h4>Last fullmonth Month & Year</h4>
            <h2>{finance?.monthYear}</h2>
          </div>
        </div>
      ) : null}
      {!finance ? (
        <div className="profile-input-row">
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">Revenue</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-amount"
              placeholder="Total lifetime revenue so far"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              value={revenue.lifetime}
              onChange={(e) =>
                setRevenue({ ...revenue, lifetime: e.target.value })
              }
            />
          </FormControl>
        </div>
      ) : null}
      {!finance ? (
        <div className="profile-input-row">
          <FormControl style={{ width: "45%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">Revenue</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-amount"
              placeholder="Revenue of last full month"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              value={revenue.fullMonth}
              onChange={(e) =>
                setRevenue({ ...revenue, fullMonth: e.target.value })
              }
            />
          </FormControl>
          <TextField
            required
            label="month & year"
            variant="outlined"
            type="month"
            value={revenue.monthYear}
            onChange={(e) =>
              setRevenue({ ...revenue, monthYear: e.target.value })
            }
            style={{ width: "45%" }}
          />
        </div>
      ) : null}
      {finance ? (
        <Table
          ref={tableRef}
          columns={columns}
          dataSource={[
            ...finance?.products?.map((r) => ({
              ...r,
              key: r.id,
            })),
          ]}
          style={{ width: "100%" }}
          bordered={true}
          pagination={{
            defaultPageSize: 9,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      ) : null}
      {!finance ? (
        <div className="add-button-column" onClick={handleProductAdd}>
          <AddCircleOutlineIcon
            style={{
              color: "#37561b",
              fontSize: "20px",
              marginRight: "0.5rem",
            }}
          />
          <h3>add product</h3>
        </div>
      ) : null}
      {!finance
        ? productInput?.map((p, i) => (
            <div className="profile-input-row" key={i}>
              <TextField
                required
                label="name"
                variant="outlined"
                type="text"
                style={{ width: "30%" }}
                onChange={(e) => handleProductNameChange(e, i)}
              />
              <TextField
                required
                label="price"
                variant="outlined"
                type="text"
                style={{ width: "30%" }}
                onChange={(e) => handleProductPriceChange(e, i)}
              />
              <TextField
                required
                label="unit production cost"
                variant="outlined"
                type="text"
                style={{ width: "30%" }}
                onChange={(e) => handleProductUnitCostChange(e, i)}
              />
              <HighlightOffIcon
                onClick={() => handleProductDelete(i)}
                style={{
                  color: "#37561b",
                  fontSize: "30px",
                  marginRight: "0.5rem",
                  alignSelf: "flex-end",
                }}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Finance;
