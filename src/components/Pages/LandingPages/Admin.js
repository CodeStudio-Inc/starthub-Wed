import React from "react";
import { AdminPanel, TeamLeads, TeamMembers, AdminStartups } from "../../Paths";
const Admin = ({ index }) => {
  return (
    <div style={{ width: "100%" }}>
      {index === 1 ? <AdminPanel /> : null}
      {index === 2 ? <TeamLeads /> : null}
      {index === 3 ? <TeamMembers /> : null}
      {/* {index === 3 ? <AdminStartups /> : null} */}
    </div>
  );
};

export default Admin;
