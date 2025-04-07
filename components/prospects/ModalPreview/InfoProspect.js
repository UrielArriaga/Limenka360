import { Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../styles/global.styles";
import dayjs from "dayjs";
export default function InfoProspect({ prospectSelected }) {
  const [showAllInfo, setShowAllInfo] = useState(false);
  let separation = 5;

  const printNa = value => {
    return value ? value : "N/A";
  };

  const formatDate = date => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "N/A";
  };
  return (
    <InfoProspectStyled>
      <Grid container spacing={0}>
        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Nombre</p>
            <Tooltip title="Click para editar" placement="bottom-start">
              <p className="value">{printNa(prospectSelected?.fullname)}</p>
            </Tooltip>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Correo</p>
            <p className="value">{printNa(prospectSelected?.email)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">No. Celular</p>
            <p className="value">{printNa(prospectSelected?.phone)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Producto de Interes</p>
            <p className="value">{printNa(prospectSelected?.product)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Categoria de Interes</p>
            <p className="value">{printNa(prospectSelected?.category?.name)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Fecha de Creacion</p>
            <p className="value">{formatDate(prospectSelected?.createdAt)}</p>
          </div>
        </Grid>

        {showAllInfo && (
          <>
            <Grid item md={separation} xs={12}>
              <div className="itemData">
                <p className="label">Tipo de Cliente</p>
                <p className="value">{printNa(prospectSelected?.phone)}</p>
              </div>
            </Grid>
          </>
        )}

        {/* <Grid item md={6} xs={12}></Grid> */}
      </Grid>

      <div className="center">
        <button
          onClick={() => {
            setShowAllInfo(!showAllInfo);
          }}
        >
          Ver mas datos
        </button>
      </div>
    </InfoProspectStyled>
  );
}

const InfoProspectStyled = styled.div`
  background-color: #fff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 30px;

  .itemData {
    margin-bottom: 10px;
  }
  .label {
    /* font-weight: bold; */
    margin-bottom: 5px;
    color: #a3a9b1;
  }
  .value {
    font-weight: bold;
    /* margin-bottom: 5px; */
    color: #000;
  }

  .center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  button {
    background-color: transparent;
    border: none;
    color: ${colors.primaryColor};
    /* padding: 10px 20px; */
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
`;
