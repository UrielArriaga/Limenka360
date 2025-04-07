import React from "react";
import { useSelector } from "react-redux";
import ProspectosEjecutives from "../../components/UI/templates/ProspectsEjecutives";
import { dashboardViewExecutiveSelector } from "../../redux/slices/dashboardViewExecutiveSlice";

export default function Prospectos() {
  const { userDataExecutive, isFetchingData } = useSelector(dashboardViewExecutiveSelector);

  if (isFetchingData) {
    return null;
  }
  return <ProspectosEjecutives from="managerview" />;
}
