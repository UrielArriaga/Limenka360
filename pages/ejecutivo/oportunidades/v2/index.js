import React from "react";
import ExecutiveOportunitiesV2 from "../../../../features/ExecutiveOportunitiesV2";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";

export default function Oportunidades() {
  return (
    <ExecutivesLayout type={"versiontwo"}>
      <ExecutiveOportunitiesV2 />
    </ExecutivesLayout>
  );
}
