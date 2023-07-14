import React from "react";

const Members = ({ members }) => {
  return (
    <div className="member-select-row">
      {members.map((m, i) => (
        <h5 key={i}>{m}</h5>
      ))}
    </div>
  );
};

export default Members;
