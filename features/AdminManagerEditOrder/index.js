import React, { useState } from "react";
import { AdminManagerEditOrderStyled, AdminManagerOrdersStyled } from "./styles";
import useAdminManagerOrders from "./hooks/useAdminManagerOrders";
import { Badge, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search } from "@material-ui/icons";
import Filters from "./components/Filters";
import useFilters from "../DirLogPedidos/hooks/useFilters";
import { filtersOrders } from "./data";
import ListOrders from "./components/ListOrders";
import useDirLogPedidos from "./hooks/useDirLogPedidos";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import PreviewOrder from "./components/PreviewOrder";
import { AnimatePresence, motion } from "framer-motion";
import useDirLogPedido from "./hooks/useDirLogPedido";

export default function AdminManagerEditOrder() {
  return (
    <AdminManagerEditOrderStyled>
      <div className="header">Editar pedido</div>
    </AdminManagerEditOrderStyled>
  );
}
