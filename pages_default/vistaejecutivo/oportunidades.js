import React from "react";
import { useSelector } from "react-redux";
import OportunidadesEjecutive from "../../components/UI/templates/OportunitiesEjecutive";
import { dashboardViewExecutiveSelector } from "../../redux/slices/dashboardViewExecutiveSlice";

export default function Oportunities() {
  const { userDataExecutive, isFetchingData } = useSelector(dashboardViewExecutiveSelector);

  if (isFetchingData) {
    return null;
  }
  return <OportunidadesEjecutive from={"managerview"} />;
}
