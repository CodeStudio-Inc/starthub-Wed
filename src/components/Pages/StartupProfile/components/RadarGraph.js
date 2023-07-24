import React from "react";
import { Line, Radar } from "react-chartjs-2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const RadarGraph = ({ data, founders }) => {
  const founder = [
    ...founders.map((f) => ({ name: f.name, time: f.time, focus: f.focus })),
  ];

  return (
    <div className="accordion-founder">
      <div className="founder-card-row">
        {founder.map((f, i) => (
          <div
            className={
              founder.length >= 3 ? "resized-founder-card" : "founder-card"
            }
            key={i}
          >
            <h2>{f.name}</h2>
            <div className="founder-card-row">
              <h4>Time committed per week</h4>
              <div className="founder-icon-row">
                <AccessTimeIcon
                  style={{
                    color: "rgba(0,0,0,0.2)",
                    fontSize: "16px",
                    marginRight: "0.5rem",
                  }}
                />
                <h3>
                  {typeof f.time === "undefined" ? 0 : parseInt(f.time)} %
                </h3>
              </div>
            </div>
            <div className="founder-card-row">
              <h4>Core Focus</h4>
              <div className="founder-icon-row">
                <FitnessCenterIcon
                  style={{
                    color: "rgba(0,0,0,0.2)",
                    fontSize: "18px",
                    marginRight: "0.5rem",
                  }}
                />
                <h3>{f.focus}</h3>
              </div>
            </div>
          </div>
        ))}
        {[...new Array(3 - (founder.length % 3)).fill()].map((r) => (
          <div className="resized-founder-card hidden" />
        ))}
      </div>
      <h4>Founder skill level on a scale of 10</h4>
      <Radar
        data={data}
        // options={{
        //   scales: {
        //     yAxis: {
        //       min: 0,
        //       max: 10,
        //     },
        //   },
        // }}
        options={{
          aspectRatio: 2,
          // scales: {
          //   ticks: {
          //     beginAtZero: true,
          //     max: 10,
          //     min: 0,
          //   },
          // },
        }}
      />
    </div>
  );
};

export default RadarGraph;
