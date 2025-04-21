import React from "react";
import NewCalendarPendings from "../../features/CalendarPendings/CalendarPendings";
import ExecutivesLayout from "../../layouts/ExecutivesLayout";

export default function Calendario() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <NewCalendarPendings />
    </ExecutivesLayout>
  );
}
