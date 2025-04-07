import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import ExecutiveSales from "../../components/UI/templates/ExecutiveSales";
import ManagerSales from "../../components/UI/templates/ManagerSales";
import MainLayout from "../../components/MainLayout";

export default function Ventas() {
  const { roleId } = useSelector(userSelector);
  const renderContent = role => {
    let render = dataContent.filter(item => item.id === role);
    if (render.length > 0) return render[0].content;
    return <></>;
  };
  return <MainLayout>{renderContent(roleId)}</MainLayout>;
}

const dataContent = [
  {
    id: "ejecutivo",
    content: <ExecutiveSales />,
  },
  {
    id: "gerente",
    content: <ManagerSales />,
  },
];
