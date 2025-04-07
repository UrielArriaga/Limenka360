// Ejemplo de uso (reportes/fases y clientes)
// <AscendingAndDescendingOrder
//   falling={falling} *
//   setFalling={setFalling} *
//   order={order} *
//   setOrder={setOrder} *
//   addOptions={[
//     { label: "Creación del cliente", value: "clientat" },
//   ]} Indica las options de filtrado si no se coloca se mandaran las de creacion y actualizacion
// />;

import { Box, Grid, withStyles, Switch } from "@material-ui/core";
import React from "react";
import { colors } from "../../../styles/global.styles";
import styled from "styled-components";

export default function AscendingAndDescendingOrder({ falling, setFalling, order, setOrder, addOptions }) {
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Grid component="label" container alignItems="center" justifyContent="flex-end" spacing={1}>
        <StyledOrder>
          <label
            className="labelOrder"
            style={{ marginRight: 5, fontSize: 11 }}
            onClick={() => console.log("Fecha de: ", order)}
          >
            Ordenar por
          </label>

          {addOptions ? (
            <SelectStyle
              className="order-select"
              onChange={e => setOrder(e.target.value)}
              value={order}
              name=""
              id=""
              style={{ marginRight: 5 }}
            >
              {addOptions &&
                addOptions.map((item, index) => (
                  <option key={index} value={item.value} name={item.label}>
                    {item.label}
                  </option>
                ))}
            </SelectStyle>
          ) : (
            <SelectStyle
              className="order-select"
              onChange={e => setOrder(e.target.value)}
              value={order}
              name=""
              id=""
              style={{ marginRight: 5 }}
            >
              <option value="createdAt" name="Fecha de creacion">
                Fecha de creacion
              </option>
              <option value="updatedAt" name="Fecha de actualizacion">
                Fecha de actualizacion
              </option>
            </SelectStyle>
          )}
        </StyledOrder>
        <Grid item>
          <p style={{ fontSize: 11 }}>Ascendente</p>
        </Grid>
        <Grid item>
          <PurpleSwitch
            checked={falling}
            onChange={() => {
              setFalling(!falling);
            }}
            name="checkedC"
          />
        </Grid>
        <Grid item>
          <p style={{ fontSize: 11 }} onClick={() => console.log("Falling: ", falling)}>
            Descendente
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}

export const StyledOrder = styled.div`
  .labelOrder {
    margin-right: 5px;
    font-size: 12px;
    color: rgb(97, 97, 97);
    font-weight: 500;
    margin-bottom: 1px;
  }
`;
const SelectStyle = styled.select`
  padding: 4px;
  border: 1.6px solid #103c82;
  border-radius: 8px;
  outline: none;
`;

const PurpleSwitch = withStyles({
  switchBase: {
    color: colors.primaryColor,
    "&$checked": {
      color: colors.primaryColor,
    },
    "&$checked + $track": {
      backgroundColor: colors.primaryColor,
    },
  },
  checked: {},
  track: {},
})(Switch);
