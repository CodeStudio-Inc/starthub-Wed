import React from "react";
import { TeamLead, TeamleadStartups } from "../../Paths";
const Teamlead = ({ index }) => {
  return (
    <div style={{ width: "100%" }}>
      {/* {index === 0 ? <TeamLead /> : null} */}
      {index === 1 ? <TeamleadStartups /> : null}
    </div>
  );
};

export default Teamlead;
