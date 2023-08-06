import React from "react";
import {
  TeamLead,
  TeamleadStartups,
  OkrOverview,
  Revenue,
  AddStartup,
  AddMember,
} from "../../Paths";
const Teamlead = ({ index }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {index === 1 ? <TeamLead /> : null}
      {index === 3 ? <AddMember /> : null}
      {index === 4 ? <AddStartup /> : null}
      {index === 5 ? <TeamleadStartups /> : null}
      {index === 6 ? <Revenue /> : null}
      {index === 7 ? <OkrOverview /> : null}
    </div>
  );
};

export default Teamlead;
