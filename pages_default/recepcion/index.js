import { useState, useEffect } from "react";
import { RecepcionStyled } from "../../styles/Recepcion/recepcion.styles";
import Head from "next/head";
import NavBarDashboard from "../../components/NavBarDashboard";
import SideBar from "../../components/SideBar";
import ProspectosRecepcion from "../../components/UI/templates/ProspectsRecepcion";
export default function Recepcion() {
    const [open, setOpen] = useState(false);

  return (
    <RecepcionStyled>
        <Head>
        <title>Recepcion</title>
      </Head>
      <SideBar open={open} setOpen={setOpen} />
      <div className="main">
      <NavBarDashboard />
        <ProspectosRecepcion/>
      </div>
    </RecepcionStyled>
  )
}

