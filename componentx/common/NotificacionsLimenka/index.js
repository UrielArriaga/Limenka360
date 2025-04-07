import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { roles } from "../../../BD/databd";
import { userSelector } from "../../../redux/slices/userSlice";

const NewComments = lazy(() => import("./NewComments"));
const NewOrderApprovedByLogistic = lazy(() => import("./NewOrderApprovedByLogistic/index"));

const roleComponents = {
  [roles.DIRECTOR_DE_LOGISTICA]: [<NewComments key="NewComments" />],
  [roles.ADMINISTRADOR_LOGISTICA]: [<NewComments key="NewComments" />],
  [roles.ADMINISTRACION]: [<NewComments key="NewComments" />],
  [roles.ADMINISTRADOR_DE_ALMACEN]: [<NewComments key="NewComments" />],
  [roles.ADMINISTRACIONGERENTE]: [<NewComments key="NewComments" />],
  [roles.ENCARGADO_DE_EGRESOS]: [<NewComments key="NewComments" />],
  [roles.ENCARGADO_DE_INGRESOS]: [<NewComments key="NewComments" />],
  [roles.COMPRAS]: [<NewComments key="NewComments" />, <NewOrderApprovedByLogistic key="NewOrderApprovedByLogistic" />],
};

export default function NotificacionsLimenka() {
  const { roleId } = useSelector(userSelector);

  return <Suspense fallback={<div></div>}>{roleComponents[roleId]}</Suspense>;
}

// rolesToSend = [
//   ...rolesToSend,
//   rolesLimenka.ADMINISTRACION,
//   rolesLimenka.ADMINISTRACIONGERENTE,
//   rolesLimenka.DIRECTORLOGISTICA,
//   rolesLimenka.ADMINISTRADORLOGISTICA,
