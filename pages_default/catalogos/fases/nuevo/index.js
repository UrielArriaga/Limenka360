import React, { useState } from "react";
import { NewProspectStyled, Error } from "../../../../styles/Propectos/NewProspect";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import { useForm } from "react-hook-form";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { api } from "../../../../services/api";
import { useSelector } from "react-redux";
import router from "next/router";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { userSelector } from "../../../../redux/slices/userSlice";
import { ArrowBack } from "@material-ui/icons";
import MainLayout from "../../../../components/MainLayout";
import NewPhase from "../../../../components/Catalogos/Fases/nuevo";
import DirectorLayout from "../../../../layouts/DirectorLayout";

export default function NewPhases() {
  const { roleId } = useSelector(userSelector);
  return (
    <>
      {roleId === "director" || roleId === "Admin_compania" ? (
        <DirectorLayout>
          <NewPhase />
        </DirectorLayout>
      ) : (
        <MainLayout>
          <NewPhase />
        </MainLayout>
      )}
    </>
  );
}
