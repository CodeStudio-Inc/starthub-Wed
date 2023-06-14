import React from "react";
import { Startups, ResourceFiles, OkrOverview, Loans } from "../../Paths";

const TeamMember = ({ index }) => {
  return (
    <div style={{ width: "100%" }}>
      {index === 0 ? <Startups /> : null}
      {index === 1 ? <OkrOverview /> : null}
      {/* {index === 2 ? <Loans /> : null} */}
    </div>
  );
};

export default TeamMember;
