import { TableCell, withStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useImportsSlice } from "../../../redux/slices/importsSlice";
import Select from "react-select";

export default function TableCellHeader({ handle, itemHead, indexa }) {
  const { head_default } = useSelector(useImportsSlice);

  return (
    // <StyledTableCell component="td">
    <Container>
      <Select
        placeholder="Seleccionar"
        options={head_default.map((item, index) => ({ label: item.name, value: item.value }))}
        className="head-select"
        defaultValue={"default"}
        onChange={e => handle(e, indexa, itemHead)}
      />
    </Container>
    // </StyledTableCell>
  );
}
const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: colors.primaryColor,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

import styled from "styled-components";

const Container = styled.div`
  padding: 0;
  .head-select {
    * {
      border-radius: 0;
    }
    /* border: 1px solid red; */
    /* overflow: visible !important ; */
  }
`;

// const DEFAULT_HEADERS = [
//   { value: "default", name: "Selecciona la columna" },
//   { value: "hidecolumn", name: "Ocultar columna" },
//   { value: "name", name: "Nombre" },
//   { value: "email", name: "Correo" },
//   { value: "phone", name: "Telefono" },
//   { value: "clientTypeId", name: "Tipo de Cliente" },
//   { value: "product", name: "Producto" },
//   { value: "observations", name: "Comentarios" },
//   { value: "canal", name: "Canal" },
//   { value: "origin", name: "Origen" },
//   { value: "entityId", name: "Estado" },
//   { value: "date", name: "Fecha" },
//   { value: "category", name: "Categoria" },
//   { value: "ejecutiveId", name: "Ejecutivo" },
// ];
