import React from "react";
import ExecutivesDashboardv2 from "../../../../features/ExecutivesDashboardv2";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";

export default function Dashboard() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <ExecutivesDashboardv2 />
    </ExecutivesLayout>
  );
}
