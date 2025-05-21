import React from "react";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";
import ExecutivesGoals from "../../../../features/ExecutiveGoals";

export default function Metas() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <ExecutivesGoals />
    </ExecutivesLayout>
  );
}
