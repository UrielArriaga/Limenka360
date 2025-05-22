import React from "react";
import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";
import ExecutiveOrdersV1 from "../../../../features/ExecutiveOrdersV1";
export default function Pedidos() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <ExecutiveOrdersV1 />
    </ExecutivesLayout>
  );
}
