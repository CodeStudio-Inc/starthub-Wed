import React from "react";
import { Select, Space } from "antd";

const MemberSelector = ({
  addMember,
  members,
  handleSelectChange,
  svg,
  loading,
}) => {
  const { Option } = Select;

  return (
    <div className="member-select-row">
      <Select
        mode="multiple"
        className="selector"
        placeholder="add members"
        onChange={handleSelectChange}
        optionLabelProp="label"
      >
        <Option value="Matthias" label="Matthias">
          <Space>
            <p>Matthias</p>
          </Space>
        </Option>
        <Option value="Timmm" label="Timmm">
          <Space>
            <p>Timmm</p>
          </Space>
        </Option>
        <Option value="Esther" label="Esther">
          <Space>
            <p>Esther</p>
          </Space>
        </Option>
        <Option value="Bonita" label="Bonita">
          <Space>
            <p>Bonita</p>
          </Space>
        </Option>
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
