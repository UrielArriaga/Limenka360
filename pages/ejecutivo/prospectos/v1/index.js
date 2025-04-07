import React from "react";
import ExecutivesProspectsV1 from "../../../../features/ExecutiveProspectsV1";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";

export default function Prospectos() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <ExecutivesProspectsV1 />
    </ExecutivesLayout>
  );
}
