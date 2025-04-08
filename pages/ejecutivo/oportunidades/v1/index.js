import React from "react";
import ExecutiveOportunitiesV1 from "../../../../features/ExecutiveOportunitiesV1";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";

export default function Oportunidades() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <ExecutiveOportunitiesV1 />
    </ExecutivesLayout>
  );
}
