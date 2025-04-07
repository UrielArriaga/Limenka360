import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import MainLayout from "../../../../components/MainLayout";

import DirectorLayout from "../../../../layouts/DirectorLayout";
import NewTemplateObservation from "../../../../components/Herramientas/NewTemplateObservation";

export default function NewTemplate() {
  const { roleId, groupId } = useSelector(userSelector);
  return (
    <>
      {roleId === "director" || roleId === "Admin_compania" ? (
        <DirectorLayout>
          <NewTemplateObservation />
        </DirectorLayout>
      ) : (
        <MainLayout>
          <NewTemplateObservation />
        </MainLayout>
      )}
    </>
  );
}
