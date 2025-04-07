import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainLayout from "../../../components/MainLayout";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

import ClientsCompaniesManager from "../../../components/Catalogos/EmpresasManager";
import DirectorLayout from "../../../layouts/DirectorLayout";
import LoaderPage from "../../../components/LoaderPage";
import useValidateLogin from "../../../hooks/useValidateLogin";

export default function Companies() {
  const { roleId } = useSelector(userSelector);
  const { isLoadingPage } = useValidateLogin(["Admin_compania", "admin", "director", "ejecutivo", "gerente"]);
  if (isLoadingPage) return <LoaderPage />;

  return (
    <>
      {roleId === "director" || roleId === "Admin_compania" ? (
        <DirectorLayout>
          <ClientsCompaniesManager />
        </DirectorLayout>
      ) : (
        <MainLayout>
          <ClientsCompaniesManager />
        </MainLayout>
      )}
    </>
  );
}
