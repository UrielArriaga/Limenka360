import React, { useEffect, useState } from "react";
import Head from "next/head";
import { AdministracionStyled } from "../../styles/Administracion/administracion.styles";
import NavBarDashboardAdministration from "../../components/NavBarDashboard/Administration";
import SideBarAdministration from "../../components/SideBar/SideBarAdministration";
export default function Administracion() {
  const [open, setOpen] = useState(false);
  return (
    <AdministracionStyled>
      <Head>
        <title>CRM JOBS - Dashboard Administración</title>
      </Head>
      <SideBarAdministration open={open} setOpen={setOpen} />
      <NavBarDashboardAdministration sideBar={true} />
      <div className="container">
        <p>Dashboard Administración</p>
      </div>
    </AdministracionStyled>
  );
}
