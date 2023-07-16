import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateObjectData } from "../../../utilities/helpers";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Chart } from "chart.js/auto";
import { Table } from "antd";
import { actionCreators } from "../../../Paths";
import RadarGraph from "./RadarGraph";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const Founders = ({
  founders,
  data,
  founderInput,
  editFounder,
  editFounderTableColumn,
  selectedFounderId,
  cancelFounderEdit,
  founderState,
  payload,
  updateFounder,
  loading,
  svg,
  setFounderState,
  handleAdd,
  handleDelete,
  handleFounderInputChange,
  cancelFounderColumnEdit,
  openFounderColumnEdit,
  handleFounderTimeInputChange,
  handleFounderFocusChange,
  handleFounderGrowthInputChange,
  handleFounderProductInputChange,
  handleFounderOperationsInputChange,
  handleFounderFinanceInputChange,
  handleFounderCommunicationInputChange,
}) => {
  const [newFounder, setNewFounder] = React.useState({
    id: "SHA" + Math.random().toString().slice(2),
    name: "",
    time: 0,
    focus: "",
    growth: 0,
    product: 0,
    operations: 0,
    finance: 0,
    communication: 0,
  });
  const tableRef = React.useRef(null);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Founder",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <input
              value={founderState.name ? founderState.name : r.name}
              onChange={(e) =>
                setFounderState({ ...founderState, name: e.target.value })
              }
            />
          ) : (
            <p>{r.name}</p>
          )}
        </div>
      ),
    },
    {
      title: "Core Focus",
      dataIndex: "focus",
      key: "focus",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <select
              style={{ width: "100px" }}
              value={founderState.focus ? founderState.focus : r.focus}
              onChange={(e) =>
                setFounderState({ ...founderState, focus: e.target.value })
              }
            >
              <option value="Product">Product</option>
              <option value="Growth">Growth</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
            </select>
          ) : (
            <p>{r.focus}</p>
          )}
        </div>
      ),
    },
    {
      title: "Time Committed(Weekly)%",
      dataIndex: "time",
      key: "time",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <select
              value={founderState.time ? founderState.time : r.time}
              style={{ width: "100px" }}
              onChange={(e) =>
                setFounderState({ ...founderState, time: e.target.value })
              }
            >
              <option value={10}>10%</option>
              <option value={20}>20%</option>
              <option value={30}>30%</option>
              <option value={40}>40%</option>
              <option value={50}>50%</option>
              <option value={60}>60%</option>
              <option value={70}>70%</option>
              <option value={80}>80%</option>
              <option value={90}>90%</option>
              <option value={100}>100%</option>
            </select>
          ) : (
            <p>{r.time}</p>
          )}
        </div>
      ),
    },
    {
      title: "Growth",
      dataIndex: "growth",
      key: "growth",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <input
              type="number"
              min={1}
              max={10}
              value={founderState.growth ? founderState.growth : r.growth}
              onChange={(e) =>
                setFounderState({
                  ...founderState,
                  growth: e.target.value > 10 ? "10" : e.target.value,
                })
              }
            />
          ) : (
            <p>{r.growth}</p>
          )}
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <input
              type="number"
              min={1}
              max={10}
              value={founderState.product ? founderState.product : r.product}
              onChange={(e) =>
                setFounderState({
                  ...founderState,
                  product: e.target.value > 10 ? "10" : e.target.value,
                })
              }
            />
          ) : (
            <p>{r.product}</p>
          )}
        </div>
      ),
    },
    {
      title: "Finance",
      dataIndex: "finance",
      key: "finance",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <input
              type="number"
              min={1}
              max={10}
              value={founderState.finance ? founderState.finance : r.finance}
              onChange={(e) =>
                setFounderState({
                  ...founderState,
                  finance: e.target.value > 10 ? "10" : e.target.value,
                })
              }
            />
          ) : (
            <p>{r.finance}</p>
          )}
        </div>
      ),
    },
    {
      title: "Operations",
      dataIndex: "operations",
      key: "operations",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <input
              type="number"
              min={1}
              max={10}
              value={
                founderState.operations ? founderState.operations : r.operations
              }
              onChange={(e) =>
                setFounderState({
                  ...founderState,
                  operations: e.target.value > 10 ? "10" : e.target.value,
                })
              }
            />
          ) : (
            <p>{r.operations}</p>
          )}
        </div>
      ),
    },
    {
      title: "Communications",
      dataIndex: "communication",
      key: "communication",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {editFounderTableColumn && selectedFounderId === r.id ? (
            <input
              type="number"
              min={1}
              max={10}
              value={
                founderState.communication
                  ? founderState.communication
                  : r.communication
              }
              onChange={(e) =>
                setFounderState({
                  ...founderState,
                  communication: e.target.value > 10 ? "10" : e.target.value,
                })
              }
            />
          ) : (
            <p>{r.communication}</p>
          )}
        </div>
      ),
    },
    {
      title: "edit",
      dataIndex: "id",
      key: "id",
      align: "left",
      render: (r) => (
        <div className="founder-table-row">
          {!editFounderTableColumn ? (
            <ModeEditOutlineIcon
              onClick={() => openFounderColumnEdit(r)}
              style={{ fontSize: "16px", color: "#37561b" }}
              className="founder-table-icon"
            />
          ) : (
            <div className="founder-icon-row">
              <h4 onClick={() => updateFounder(r)}>save</h4>
              <CancelIcon
                onClick={cancelFounderColumnEdit}
                style={{
                  fontSize: "16px",
                  color: "#37561b",
                  marginLeft: "0.5rem",
                }}
                className="founder-table-icon"
              />
            </div>
          )}
          {loading && selectedFounderId === r ? (
            <img src={svg} style={{ height: "30px", width: "30px" }} />
          ) : null}
        </div>
      ),
    },
  ];

  const addNewFounder = () => {
    const data = {
      founder: newFounder,
    };
    founders = [...founders, newFounder];
    dispatch(
      actionCreators.updateProfileItem(
        `catalyzer/new-founder`,
        data,
        (data) => {
          if (validateObjectData(data.founder)) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setProfile(data.profile));
          }
        }
      )
    );
  };

  return (
    <div className="accordion">
      {editFounder ? (
        <Table
          ref={tableRef}
          columns={columns}
          dataSource={[
            ...payload?.map((r) => ({
              ...r,
              key: r.id,
            })),
          ]}
          style={{ width: "100%" }}
          bordered={true}
          expandable={{
            expandedRowRender: (r) => (
              <div className="founder-table-row">
                <input
                  style={{ width: "90px" }}
                  placeholder="name"
                  value={newFounder.name}
                  onChange={(e) =>
                    setNewFounder({ ...newFounder, name: e.target.value })
                  }
                />
                <select
                  style={{ width: "90px" }}
                  value={newFounder.focus}
                  onChange={(e) =>
                    setNewFounder({ ...newFounder, focus: e.target.value })
                  }
                >
                  <option value="Product">Product</option>
                  <option value="Growth">Growth</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                </select>
                <select
                  style={{ width: "90px" }}
                  value={newFounder.time}
                  onChange={(e) =>
                    setNewFounder({ ...newFounder, time: e.target.value })
                  }
                >
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                  <option value={30}>30%</option>
                  <option value={40}>40%</option>
                  <option value={50}>50%</option>
                  <option value={60}>60%</option>
                  <option value={70}>70%</option>
                  <option value={80}>80%</option>
                  <option value={90}>90%</option>
                  <option value={100}>100%</option>
                </select>
                <input
                  style={{ width: "90px" }}
                  type="number"
                  min={1}
                  max={10}
                  placeholder="growth"
                  value={newFounder.growth}
                  onChange={(e) =>
                    setNewFounder({
                      ...newFounder,
                      growth: e.target.value > 10 ? "10" : e.target.value,
                    })
                  }
                />
                <input
                  style={{ width: "90px" }}
                  type="number"
                  min={1}
                  max={10}
                  placeholder="product"
                  value={newFounder.product}
                  onChange={(e) =>
                    setNewFounder({
                      ...newFounder,
                      product: e.target.value > 10 ? "10" : e.target.value,
                    })
                  }
                />
                <input
                  style={{ width: "90px" }}
                  type="number"
                  min={1}
                  max={10}
                  placeholder="finance"
                  value={newFounder.finance}
                  onChange={(e) =>
                    setNewFounder({
                      ...newFounder,
                      finance: e.target.value > 10 ? "10" : e.target.value,
                    })
                  }
                />
                <input
                  style={{ width: "90px" }}
                  type="number"
                  min={1}
                  max={10}
                  placeholder="operations"
                  value={newFounder.operations}
                  onChange={(e) =>
                    setNewFounder({
                      ...newFounder,
                      operations: e.target.value > 10 ? "10" : e.target.value,
                    })
                  }
                />
                <input
                  style={{ width: "90px" }}
                  type="number"
                  min={1}
                  max={10}
                  placeholder="communication"
                  value={newFounder.communication}
                  onChange={(e) =>
                    setNewFounder({
                      ...newFounder,
                      communication:
                        e.target.value > 10 ? "10" : e.target.value,
                    })
                  }
                />
                <div className="founder-icon-row">
                  <h4 onClick={addNewFounder}>save</h4>
                </div>
              </div>
            ),
          }}
          pagination={{
            defaultPageSize: 9,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      ) : null}
      {founders?.length > 0 && !editFounder ? (
        <RadarGraph data={data} founders={founders} />
      ) : null}
      {!founders?.length ? (
        <div className="add-button-column" onClick={handleAdd}>
          <AddCircleOutlineIcon
            style={{
              color: "#37561b",
              fontSize: "20px",
              marginRight: "0.5rem",
            }}
          />
          <h3>add founder</h3>
        </div>
      ) : null}
      {!founders?.length
        ? founderInput?.map((f, i) => (
            <div className="profile-input-column" key={i}>
              <div className="profile-input-row">
                <input
                  placeholder="founder name"
                  onChange={(e) => handleFounderInputChange(e, i)}
                />
                <select onChange={(e) => handleFounderTimeInputChange(e, i)}>
                  <option disabled selected>
                    Time commitment per week(Founders)
                  </option>
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                  <option value={30}>30%</option>
                  <option value={40}>40%</option>
                  <option value={50}>50%</option>
                  <option value={60}>60%</option>
                  <option value={70}>70%</option>
                  <option value={80}>80%</option>
                  <option value={90}>90%</option>
                  <option value={100}>100%</option>
                </select>
              </div>
              <div className="profile-input-row">
                <select onChange={(e) => handleFounderFocusChange(e, i)}>
                  <option disabled selected>
                    Core focus(Founders)
                  </option>
                  <option value="Product">Product</option>
                  <option value="Growth">Growth</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                </select>
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of growth(1-10)"
                  onChange={(e) => handleFounderGrowthInputChange(e, i)}
                />
              </div>
              <div className="profile-input-row">
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level building product(1-10)"
                  onChange={(e) => handleFounderProductInputChange(e, i)}
                />
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of operations(1-10)"
                  onChange={(e) => handleFounderOperationsInputChange(e, i)}
                />
              </div>
              <div className="profile-input-row">
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of finance(1-10)"
                  onChange={(e) => handleFounderFinanceInputChange(e, i)}
                />
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="skill level of communication(1-10)"
                  onChange={(e) => handleFounderCommunicationInputChange(e, i)}
                />
              </div>
              <div
                className="close-button-column"
                onClick={() => handleDelete(i)}
              >
                <HighlightOffIcon
                  style={{
                    color: "#37561b",
                    fontSize: "20px",
                    marginRight: "0.5rem",
                  }}
                />
                <h3>cancel</h3>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Founders;
