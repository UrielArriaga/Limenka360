import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import FleetChiefRevisados from "../../features/FleetChiefRevisados";

export default function JefeDeFlotilla() {
  return (
    <CommonLogLayout role={"jefedeflotilla"}>
      <FleetChiefRevisados />
    </CommonLogLayout>
  );
}
