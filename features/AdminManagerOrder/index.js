import React from "react";
import { AdminManagerOrderStyled } from "./styles";

import useAdminManagerOrder from "./hooks/useSkeleton";
import { Assignment, Home } from "@material-ui/icons";
import NavBarRoutes from "./components/NavBarRoutes";

export default function AdminManagerOrder() {
  const { count, isOpenPreview } = useAdminManagerOrder();

  return (
    <AdminManagerOrderStyled>
      <NavBarRoutes />
    </AdminManagerOrderStyled>
  );
}
