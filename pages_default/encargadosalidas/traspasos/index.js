import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepAttendantTransfers from "../../../features/DepAttendantTransfers";

function Transfer() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantTransfers />
    </CommonLogLayout>
  );
}

export default Transfer;
