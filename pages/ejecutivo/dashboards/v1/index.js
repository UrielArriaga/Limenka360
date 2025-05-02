import React from "react";
import ExecutivesDashboard from "../../../../features/ExecutivesDashboard";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";
import AIChat from "../../../../componentx/LimiBot";

export default function Dashboard() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <ExecutivesDashboard />

      {/* <AIChat /> */}
    </ExecutivesLayout>
  );
}
