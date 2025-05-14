import React from "react";

import ExecutivesLayout from "../../../../layouts/ExecutivesLayout";
import Customers from "../../../../features/Customers";

export default function Oportunidades() {
  return (
    <ExecutivesLayout type={"navbar"}>
      <Customers />
    </ExecutivesLayout>
  );
}
