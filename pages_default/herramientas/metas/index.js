import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Add, Cached, Star } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import NavBarDashboard from "../../../components/NavBarDashboard";
import SideBar from "../../../components/SideBar";
import EjecutiveGoals from "../../../components/UI/templates/EjecutiveGoals";
import ManagerGoals from "../../../components/UI/templates/ManagerGoals";
import { userSelector } from "../../../redux/slices/userSlice";
import { MetasLayoutStyled } from "../../../styles/Herramientas/metas.styled";
import DirectorGoals from "../../../components/UI/templates/DirectorGoals";
import MainLayout from "../../../components/MainLayout";

export default function Metas() {
  const router = useRouter();
  const { roleId } = useSelector(userSelector);
  const handleClickNewGoal = () => {
    router.push("../herramientas/metas/nuevameta");
  };
  const renderContentGoals = role => {
    switch (role) {
      case "ejecutivo":
        return <EjecutiveGoals handleClickNewGoal={handleClickNewGoal} />;
      case "director":
        return <DirectorGoals handleClickNewGoal={handleClickNewGoal} />;
      case "Admin_compania":
        return <DirectorGoals handleClickNewGoal={handleClickNewGoal} />;
      default:
        return <ManagerGoals handleClickNewGoal={handleClickNewGoal} />;
    }
  };
  return renderContentGoals(roleId);
}
