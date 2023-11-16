import { Avatar } from "antd";
import React from "react";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import PlaceIcon from "@mui/icons-material/Place";
import moment from "moment";
import { getFirstDateElement } from "../../../utilities/helpers";

const Event = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-content-column">
        <h3>{event.name}</h3>
        <div className="event-content-row">
          <KeyboardVoiceRoundedIcon
            style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }}
          />
          <p>{event.speaker}</p>
        </div>
        <div className="event-content-row">
          <CalendarMonthIcon
            style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }}
          />
          <p>{moment(getFirstDateElement(event.duration)).format("ll")}</p>
        </div>
        <div className="event-content-row">
          <PlaceIcon style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }} />
          <p>{event.venue}</p>
        </div>
      </div>
      <Avatar shape="square" size={64} style={{ background: "#36561b56" }}>
        <h1 style={{ color: "#fff" }}>SHA</h1>
      </Avatar>
    </div>
  );
};

export default Event;
