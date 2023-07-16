import React from "react";

const AddNewFounder = ({ newFounder, setNewFounder, addNewFounder }) => {
  return (
    <div className="founder-table-row">
      <input
        style={{ width: "90px" }}
        placeholder="name"
        value={newFounder.name}
        onChange={(e) => setNewFounder({ ...newFounder, name: e.target.value })}
      />
      <select
        style={{ width: "90px" }}
        value={newFounder.focus}
        onChange={(e) =>
          setNewFounder({ ...newFounder, focus: e.target.value })
        }
      >
        <option value="" disabled selected>
          -focus-
        </option>
        <option value="Product">Product</option>
        <option value="Growth">Growth</option>
        <option value="Operations">Operations</option>
        <option value="Finance">Finance</option>
      </select>
      <select
        style={{ width: "90px" }}
        value={newFounder.time}
        onChange={(e) => setNewFounder({ ...newFounder, time: e.target.value })}
      >
        <option value="" disabled selected>
          -time-
        </option>
        <option value={0}>0%</option>
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
            communication: e.target.value > 10 ? "10" : e.target.value,
          })
        }
      />
      <div className="founder-icon-row">
        <h4 onClick={addNewFounder}>save</h4>
      </div>
    </div>
  );
};

export default AddNewFounder;
