import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import FleetChiefNewRoute from "../../../features/FleetChiefNewRoute";

export default function Nuevo() {
  return (
    <CommonLogLayout role={"jefedeflotilla"}>
      <FleetChiefNewRoute />
    </CommonLogLayout>
  );
}
