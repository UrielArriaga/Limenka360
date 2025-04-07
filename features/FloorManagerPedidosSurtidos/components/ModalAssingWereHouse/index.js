import React from "react";
import { Button, Grid } from "@material-ui/core";
import { ModalAssingWereHouseStyled } from "./styles";
import { CloseOutlined } from "@material-ui/icons";
// import WarehouseSelect from "./WarehouseSelect";



export default function ModalAssingWereHouse({

  handleToggle,
  opened,

}) {

  return (
    <ModalAssingWereHouseStyled
      anchor="right"
      open={opened}
      keepMounted
      onClose={handleToggle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
   <div className="header">
        <h3>Adjuntar archivo a pedido </h3>
      </div>
    </ModalAssingWereHouseStyled>
  );
}
