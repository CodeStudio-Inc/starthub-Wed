import React from "react";
import {
  Startups,
  ResourceFiles,
  Loans,
  StartupList,
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
      {index === 3 ? <StartupList title={title} /> : null}
      {index === 4 ? <StartupList title={title} /> : null}
      {index === 5 ? <StartupList title={title} /> : null}
      {index === 6 ? <StartupList title={title} /> : null}
      {index === 7 ? <StartupList title={title} /> : null}
      {index === 8 ? <StartupList title={title} /> : null}
      {index === 9 ? <OkrOverview /> : null}
    </div>
  );
};

export default TeamMember;
