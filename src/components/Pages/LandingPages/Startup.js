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
      {index === 1 ? <Metrics visible={visible} /> : null}
      {index === 2 ? <OKRs /> : null}
      {index === 3 ? <LeanCanvas /> : null}
      {index === 4 ? <DiagnosticsTest /> : null}
      {index === 5 ? <StartupProfile /> : null}
    </div>
  );
};

export default Startup;
