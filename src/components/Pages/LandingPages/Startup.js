import React from "react";
import {
  Metrics,
  LeanCanvas,
  OKRs,
  DiagnosticsTest,
  StartupProfile,
} from "../../Paths";
const Startup = ({ index, visible }) => {
  return (
    <div style={{ width: "100%" }}>
      {/* {index === 0 ? <Metrics visible={visible} /> : null} */}
      {index === 0 ? <OKRs /> : null}
      {index === 1 ? <LeanCanvas /> : null}
      {index === 2 ? <DiagnosticsTest /> : null}
      {index === 3 ? <StartupProfile /> : null}
    </div>
  );
};

export default Startup;
