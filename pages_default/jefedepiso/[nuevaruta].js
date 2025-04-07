import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import FloorManagerNewRoute from "../../features/FloorManagerNewRoute";

const Nuevaruta = () => {
  return (
    <CommonLogLayout role={"jefedepiso"}>
      <FloorManagerNewRoute />
    </CommonLogLayout>
  );
};

export default Nuevaruta;
