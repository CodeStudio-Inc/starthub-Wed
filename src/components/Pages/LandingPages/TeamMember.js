import React from "react";
import {
  Startups,
  ResourceFiles,
  Loans,
  StartupList,
  AddStartup,
  OkrOverview,
} from "../../Paths";

const TeamMember = ({ index, title }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {index === 1 ? <Startups /> : null}
      {index === 3 ? <AddStartup /> : null}
      {index === 4 ? <StartupList /> : null}
      {index === 5 ? <StartupList title={title} /> : null}
      {index === 6 ? <StartupList title={title} /> : null}
      {index === 7 ? <StartupList title={title} /> : null}
      {index === 8 ? <OkrOverview /> : null}
    </div>
  );
};

export default TeamMember;
