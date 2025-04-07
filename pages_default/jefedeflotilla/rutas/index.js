import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import FleetChiefRutas from "../../../features/FleetChiefRutas";

export default function Rutas() {
  return (
    <CommonLogLayout role={"jefedeflotilla"}>
      <FleetChiefRutas />
    </CommonLogLayout>
  );
}
