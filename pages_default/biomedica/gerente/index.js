import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicaManager from "../../../features/BiomedicaManager";

function Manager() {
  return (
    <CommonLogLayout role={"areabiomedica"}>
      <BiomedicaManager type="general" />
    </CommonLogLayout>
  );
}

export default Manager;
