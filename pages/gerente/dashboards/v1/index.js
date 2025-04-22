import React from "react";
import ManagerLayout from "../../../../layouts/ManagerLayout";
import ManagerDashboard from "../../../../features/ManagerDashboard";

export default function Dashboard() {
  return (
    <ManagerLayout type={"navbar"}>
      <ManagerDashboard />
    </ManagerLayout>
  );
}
