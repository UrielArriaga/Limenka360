import React from "react";
import ExecutivesDashboard from "../../../../features/ExecutivesDashboard";
import ExecutivesLayoutTopNav, {
  SidebarLayout,
} from "../../../../layouts/ExecutivesLayoutTopNav";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";

export default function Dashboard() {
  return (
    <ExecutivesLayout type={"test"}>
      <ExecutivesDashboard />
    </ExecutivesLayout>
  );
}
