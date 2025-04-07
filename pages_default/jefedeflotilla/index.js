import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import FleetChief from "../../features/FleetChief";

export default function JefeDeFlotilla() {
  return (
    <CommonLogLayout role={"jefedeflotilla"}>
      <FleetChief />
    </CommonLogLayout>
  );
}
