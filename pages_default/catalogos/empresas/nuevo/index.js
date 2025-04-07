import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import NewCompany from "../../../../components/Catalogos/EmpresasManager/nuevo";
import DirectorLayout from "../../../../layouts/DirectorLayout";
import { userSelector } from "../../../../redux/slices/userSlice";

export default function NewProspect() {
  const { roleId } = useSelector(userSelector);
  return (
    <>
      {roleId === "director" || roleId === "Admin_compania" ? (
        <DirectorLayout>
          <NewCompany />
        </DirectorLayout>
      ) : (
        <MainLayout>
          <NewCompany />
        </MainLayout>
      )}
    </>
  );
}
