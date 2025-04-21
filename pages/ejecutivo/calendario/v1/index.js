import React from "react";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";
import NewCalendarPendings from "../../../../features/CalendarPendings/CalendarPendings";

export default function Calendario() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <NewCalendarPendings />
    </ExecutivesLayout>
  );
}
