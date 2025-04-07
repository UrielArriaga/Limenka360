import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import NavBarManager from "../UI/organism/NavBarManager";
import NavBarDashboardAdministration from "./Administration";
import NavBarDashboardAdministrationSales from "./AdministrationSales";
import NavBarDashboardAdmin from "./AdminNav";
import NavBarDashboardExecutive from "./ExecutiveNav";
import NavBarDashboardIntelligence from "./IntelligenceNav";
import NavBarDashboardLogistic from "./Logistic";
import NavBarDashboardManager from "./ManagerNav";
import ManagerNavBar from "./ManagerNavBar";
import NavBarDashboardDirector from "./ManagerNavDirector";
import NavBarDashboardPurchases from "./Purchases";
import NavBarDashboardRecepcion from "./RecepcionNav";


export default function NavBarDashboard({ sideBar }) {
  const { group, name, isFetching, isSuccess, isLogged_User, isError, errorMessage, email, roleId, isOnline } =
    useSelector(userSelector);

  switch (roleId) {
    case "ejecutivo":
      return <NavBarDashboardExecutive sideBar={sideBar} />;

    case "gerente":
      // return <NavBarManager sideBar={sideBar} />;
      return <NavBarDashboardManager sideBar={sideBar} />;

    case "director":
      // return <NavBarManager sideBar={sideBar} />;
      return <NavBarDashboardDirector sideBar={sideBar} />;

    case "Admin_compania":
      return <NavBarDashboardDirector sideBar={sideBar} />;

    case "admin":
      return <NavBarDashboardAdmin sideBar={sideBar} />;

    case "inteligencia_comercial":
      return <NavBarDashboardIntelligence sideBar={sideBar} />;

    case "compras":
      return <NavBarDashboardPurchases sideBar={sideBar} />;
    case "administrador_de_ventas":
      return <NavBarDashboardAdministrationSales sideBar={sideBar} />;

    case "administracion":
      return <NavBarDashboardAdministration sideBar={sideBar} />;

    case "logistica":
      return <NavBarDashboardLogistic sideBar={sideBar} />;
      
      case "recepcion":
        return <NavBarDashboardRecepcion sideBar={sideBar} />;
    default:
      null;
  }
}
