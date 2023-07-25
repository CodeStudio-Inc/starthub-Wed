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
    <div style={{ width: "100%" }}>
      {index === 1 ? <Startups /> : null}
      {index === 3 ? <StartupList /> : null}
      {index === 4 ? <StartupList title={title} /> : null}
      {index === 5 ? <StartupList title={title} /> : null}
      {index === 6 ? <OkrOverview /> : null}
    </div>
  );
};

export default TeamMember;
