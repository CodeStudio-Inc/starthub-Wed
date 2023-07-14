import React from "react";
import { TeamLead, TeamleadStartups, OkrOverview } from "../../Paths";
const Teamlead = ({ index }) => {
  return (
    <div style={{ width: "100%" }}>
      {index === 1 ? <TeamLead /> : null}
      {index === 3 ? <TeamleadStartups /> : null}
      {index === 5 ? <OkrOverview /> : null}
    </div>
  );
};

export default Teamlead;
