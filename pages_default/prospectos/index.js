import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import ProspectosEjecutives from "../../components/UI/templates/ProspectsEjecutives";
import ProspectosManager from "../../components/UI/templates/ProspectsManager";
import MainLayout from "../../components/MainLayout";
import useGlobalCommons from "../../hooks/useGlobalCommons";

export default function Prospectos() {
  const { roleId } = useSelector(userSelector);
  const { getCatalogBy } = useGlobalCommons();

  useEffect(() => {
    getCatalogBy("origins");
  }, []);

  return <MainLayout>{roleId === "ejecutivo" ? <ProspectosEjecutives /> : <ProspectosManager />}</MainLayout>;
}
