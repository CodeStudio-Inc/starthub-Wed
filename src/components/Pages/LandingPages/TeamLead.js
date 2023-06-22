import React from "react";
import { TeamLead, TeamleadStartups } from "../../Paths";
const Teamlead = ({ index }) => {
  return (
    <div style={{ width: "100%" }}>
      {index === 1 ? <TeamLead /> : null}
      {index === 3 ? <TeamleadStartups /> : null}
    </div>
  );
};

export default Teamlead;
