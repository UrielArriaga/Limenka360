import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import OportunidadesEjecutive from "../../components/UI/templates/OportunitiesEjecutive";
import OportunidadesManager from "../../components/UI/templates/OportunitiesManager";
import ModalShowTutorial from "../../components/ModalShowTutorial";
import MainLayout from "../../components/MainLayout";

export default function Oportunidades() {
  const { roleId } = useSelector(userSelector);

  return <MainLayout>{roleId === "ejecutivo" ? <OportunidadesEjecutive /> : <OportunidadesManager />}</MainLayout>;
}
