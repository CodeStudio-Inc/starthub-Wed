import React from "react";
import {
  TeamLead,
  TeamleadStartups,
  OkrOverview,
  Revenue,
  AddStartup,
  AddMember,
  StartupList,
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
      {index === 3 ? <AddMember /> : null}
      {index === 4 ? <AddStartup /> : null}
      {index === 5 ? <TeamleadStartups /> : null}
      {index === 7 ? <StartupList title={title} /> : null}
      {index === 8 ? <StartupList title={title} /> : null}
      {index === 9 ? <StartupList title={title} /> : null}
      {index === 10 ? <StartupList title={title} /> : null}
      {index === 11 ? <Revenue /> : null}
      {index === 12 ? <OkrOverview /> : null}
    </div>
  );
};

export default Teamlead;
