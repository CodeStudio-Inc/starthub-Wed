import React from "react";
import { Select, Space } from "antd";
import { useSelector } from "react-redux";

const MemberSelector = ({
  addMember,
  members,
  handleSelectChange,
  updatedMembersArray,
  svg,
  loading,
}) => {
  const { category } = useSelector((state) => state.auth);

  const { Option } = Select;

  const memberz =
    category === "catalyzer"
      ? ["Matthias", "Timmm", "Esther"]
      : ["Laura", "Gerald", "Noah", "Rebecca"];

  const removeExistingMembers = (arr1, arr2) => {
    if (typeof arr2 === "undefined") return;
    return arr1.filter((m) => !arr2.includes(m));
  };

  const items = removeExistingMembers(memberz, updatedMembersArray);

  return (
    <div className="member-select-row">
      <Select
        mode="multiple"
        className="selector"
        placeholder="add members"
        onChange={handleSelectChange}
        optionLabelProp="label"
      >
        {items.map((m) => (
          <Option value={m} label={m} key={Math.random()}>
            <Space>
              <p>{m}</p>
            </Space>
          </Option>
        ))}
      </Select>
      <p onClick={addMember}>
        {members?.length > 1 ? "add members" : "add member"}
      </p>
      {loading ? (
        <img style={{ height: "30px", widith: "30px" }} src={svg} />
      ) : null}
    </div>
  );
};

export default MemberSelector;
