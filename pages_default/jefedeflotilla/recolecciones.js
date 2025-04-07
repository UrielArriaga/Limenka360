import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import FleetChiefRecolecciones from "../../features/FleetChiefRecolecciones";

export default function JefeDeFlotilla() {
  return (
    <CommonLogLayout role={"jefedeflotilla"}>
      <FleetChiefRecolecciones />
    </CommonLogLayout>
  );
}
