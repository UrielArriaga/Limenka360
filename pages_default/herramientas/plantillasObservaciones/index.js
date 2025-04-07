import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/MainLayout";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";

import useValidateLogin from "../../../hooks/useValidateLogin";
import LoaderPage from "../../../components/LoaderPage";
import TempObservations from "../../../components/Herramientas/TempObservations";

export default function TemplatesObesrvations() {
  const { roleId } = useSelector(userSelector);
  const { isLoadingPage } = useValidateLogin(["Admin_compania", "admin", "director", "ejecutivo", "gerente"]);
  if (isLoadingPage) return <LoaderPage />;
  return (
    <>
      {roleId === "director" || roleId === "Admin_compania" ? (
        <DirectorLayout>
          <TempObservations />
        </DirectorLayout>
      ) : (
        <MainLayout>
          <TempObservations />
        </MainLayout>
      )}
    </>
  );
}
