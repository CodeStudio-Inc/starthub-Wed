import React from "react";
import dayjs from "dayjs";
import Kalend, {
  CalendarView,
  onSelectView,
  selectedView,
  onPageChange,
} from "kalend";
import "kalend/dist/styles/index.css";

const Schedule = ({ events }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Kalend
        // onEventClick={onEventClick}
        // onNewEventClick={onNewEventClick}
        events={events}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        disabledViews={[CalendarView.DAY]}
        onSelectView={onSelectView}
        selectedView={selectedView}
        onPageChange={onPageChange}
        timeFormat={"24"}
        weekDayStart={"Monday"}
        calendarIDsHidden={["work"]}
        language={"en"}
      />
    </div>
  );
};

export default Schedule;
