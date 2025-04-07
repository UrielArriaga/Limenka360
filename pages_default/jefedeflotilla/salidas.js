import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import FleetChiefSalidas from "../../features/FleetChiefSalidas";

export default function JefeDeFlotilla() {
  return (
    <CommonLogLayout role={"jefedeflotilla"}>
      <FleetChiefSalidas />
    </CommonLogLayout>
  );
}
