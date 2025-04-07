import React, { useState } from "react";
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";

import SideBarExecutive from "./SideBarExecutive";
import SideBarAdmin from "./SideBarAdmin";
import SideBarManager from "./SideBarManager";
import SideBarIntelligence from "./SideBarIntelligence";
import SideBarPurchases from "./SideBarPurchases";
import SideBarAdministrationSales from "./SideBarAdministrationSales";
import SideBarLogistic from "./SideBarLogistic";

export default function SideBar({ open, setOpen }) {
  const { roleId } = useSelector(userSelector);

  switch (roleId) {
    case "ejecutivo":
      return <SideBarExecutive />;

    case "gerente":
      return <SideBarManager />;

    case "admin":
      return <SideBarAdmin />;

    case "director":
      return <SideBarAdmin />;

    case "Admin_compania":
      return <SideBarAdmin />;

    case "inteligencia_comercial":
      return <SideBarIntelligence />;

    case "compras":
      return <SideBarPurchases />;
    case "administrador_de_ventas":
      return <SideBarAdministrationSales />;

    case "logistica":
      return <SideBarLogistic />;
    default:
      return null;
  }
}
