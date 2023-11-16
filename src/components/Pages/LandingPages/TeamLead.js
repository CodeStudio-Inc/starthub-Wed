import React from "react";
import {
  TeamLead,
  TeamleadStartups,
  OkrOverview,
  Revenue,
  AddStartup,
  AddMember,
  StartupList,
  Events,
} from "../../Paths";
const Teamlead = ({ index, title }) => {
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
      {index === 2 ? <AddMember /> : null}
      {index === 3 ? <AddStartup /> : null}
      {index === 4 ? <Events /> : null}
      {index === 5 ? <Revenue /> : null}
      {index === 6 ? <OkrOverview /> : null}
    </div>
  );
};

export default Teamlead;
