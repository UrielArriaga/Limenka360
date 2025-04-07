import React, { useEffect, useState } from "react";
import CustomerManager from "../../components/UI/templates/CustomerManager";
import CustomerExecutives from "../../components/UI/templates/CustomerExecutives";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import MainLayout from "../../components/MainLayout";

export default function Clientes() {
  const { roleId } = useSelector(userSelector);

  return <MainLayout>{roleId !== "ejecutivo" ? <CustomerManager /> : <CustomerExecutives />}</MainLayout>;
}
