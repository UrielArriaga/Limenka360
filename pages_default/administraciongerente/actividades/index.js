import React from "react";
import AdminManagerActivities from "../../../features/AdminManagerActivities";
import LayoutManagerAdmin from "../../../layouts/LayoutManagerAdmin";

const actividades = () => {
  return (
    <LayoutManagerAdmin role={"admin_gerente"}>
      <AdminManagerActivities />
    </LayoutManagerAdmin>
  );
};

export default actividades;
