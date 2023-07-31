import React from "react";
import { TeamLead, TeamleadStartups, OkrOverview, Revenue } from "../../Paths";
const Teamlead = ({ index }) => {
  return (
    <div style={{ width: "100%" }}>
      {index === 1 ? <TeamLead /> : null}
      {index === 2 ? <TeamleadStartups /> : null}
      {index === 3 ? <Revenue /> : null}
      {index === 4 ? <OkrOverview /> : null}
    </div>
  );
};

export default Teamlead;
