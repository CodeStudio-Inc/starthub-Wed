import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const Diagnostics = ({
  teams,
  vision,
  proposition,
  product,
  market,
  business,
  investment,
}) => {
  const diagnostics = [
    {
      label: "Teams",
      progress: Math.round(teams),
    },
    {
      label: "Problem, Market & Value Proposition",
      progress: Math.round(proposition),
    },
    {
      label: "Product",
      progress: Math.round(product),
    },
    {
      label: "Market, Sales, Growth",
      progress: Math.round(market),
    },
    {
      label: "Finance & Investment",
      progress: Math.round(investment),
    },
    {
      label: "Operation & Management",
      progress: Math.round(business),
    },
    {
      label: "Compliance",
      progress: Math.round(vision),
    },
  ];
  return (
    <div className="diagonistics">
      <h2>Diagnostics</h2>
      {diagnostics.map((d) => (
        <div className="diagonistics-row">
          <div className="progress-bar-label">
            <h4>{d.label}</h4>
          </div>
          <div className="progress-bar">
            <Box sx={{ width: "80%" }}>
              <LinearProgress
                variant="determinate"
                value={d.progress}
                color="success"
              />
            </Box>
          </div>
          <div className="progress-bar-percentage">
            <h5>{d.progress}%</h5>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Diagnostics;
