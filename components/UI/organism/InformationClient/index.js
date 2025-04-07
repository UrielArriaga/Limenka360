import React, { useState } from "react";
import { Box, Grid, Tooltip } from "@material-ui/core";
import dayjs from "dayjs";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { PersonOutline } from "@material-ui/icons";
import { formatLink } from "../../../../utils";
export default function InfoClient(props) {
  const { prospect } = props;
  const [isSeeMore, setIsSeeMore] = useState(false);
  const validateData = (info, typeData) => {
    if (info) {
      switch (typeData) {
        case "date":
          return <p className="data capitalize">{dayjs(info).format("MMMM DD, YYYY")}</p>;
        case "link":
          return (
            <Tooltip title="Abrir link">
              <p className="data">{formatLink(info)}</p>
            </Tooltip>
          );
        case "email":
          return <p className="data">{info}</p>;
        default:
          return <p className="data capitalize">{info}</p>;
      }
    } else {
      return <p className="NA">N/A</p>;
    }
  };
  const validateLabels = labels => {
    if (labels) {
      if (labels.length > 0) {
        return (
          <div className="labels_container">
            {labels.map((item, index) => (
              <LabelContainer key={index} color={item.color}>
                {item.labelname}
              </LabelContainer>
            ))}
          </div>
        );
      } else {
        return <p className="data">Sin Etiquetas</p>;
      }
    } else {
    }
  };
  return (
    <InfoStyled>
      <Grid container={true} spacing={2} className="info_prospect">
        <Grid item xs={12} md={12}>
          <Box component="span" m={1}></Box>
          <div className="divider" />
        </Grid>

        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Nombre</p>
          {validateData(prospect?.fullname)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Género</p>
          {validateData(prospect?.gender)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Movil</p>
          {validateData(prospect?.phone)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Teléfono Opcional</p>
          {validateData(prospect?.optionalphone)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Correo Electrónico</p>
          {validateData(prospect?.email, "email")}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Empresa</p>
          {validateData(prospect?.clientcompany?.companyname)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Categoría de Interés</p>
          {validateData(prospect?.category?.name)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Tipo de Cliente</p>
          {validateData(prospect?.clienttype?.name)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Especialidad</p>
          {validateData(prospect?.specialty?.name)}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Facebook</p>
          {validateData(prospect?.facebook, "link")}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Página Web</p>
          {validateData(prospect?.url, "link")}
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Origen</p>
          {validateData(prospect?.origin?.name)}
        </Grid>
        {isSeeMore && (
          <>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Estado</p>
              <p className="data capitalize">{validateData(prospect?.entity?.name)}</p>
            </Grid>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Código Postal</p>
              <p className="data">{validateData(prospect?.postal?.postal_code)}</p>
            </Grid>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Ciudad / Municipio</p>
              <p className="data capitalize">{validateData(prospect?.city?.name)}</p>
            </Grid>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Calle</p>
              <p className="data capitalize">{validateData(prospect?.street)}</p>
            </Grid>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Colonia</p>
              <p className="data capitalize">{validateData(prospect?.postal?.settlement)}</p>
            </Grid>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Google Maps</p>
              <p className="data">{validateData(prospect?.location, "link")}</p>
            </Grid>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Fecha de Creación</p>
              {validateData(prospect?.createdAt, "date")}
            </Grid>
            <Grid item={true} md={4} sm={6} xs={12}>
              <p className="title">Fecha de Actualización</p>
              <p className="data capitalize">{validateData(prospect?.updatedAt, "date")}</p>
            </Grid>

            <Grid item={true} md={12} sm={12} xs={12}>
              <p className="title">Observaciones</p>
              <p className="data">{validateData(prospect?.observations)}</p>
            </Grid>
            <Grid item={true} md={12} sm={12} xs={12}>
              <p className="title">Etiquetas</p>
              {validateLabels(prospect?.prospectslabels)}
            </Grid>
          </>
        )}
      </Grid>
      <p className="seemore" onClick={() => setIsSeeMore(!isSeeMore)}>
        {isSeeMore ? "...Ver Menos" : "Ver Más..."}
      </p>
    </InfoStyled>
  );
}
const InfoStyled = styled.div`
  overflow-x: hidden;
  .info_prospect {
    margin-bottom: 0px;
    .divider {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1.5px solid #f3f3f3;
    }
    .titleHead {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      display: flex;
      align-items: center;
      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
    }
    .title {
      color: #4f4f4f;
      font-size: 13px;
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 2px;
      height: 32px;
    }
    .data {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
    }
    .NA {
      color: #d1d1d1;
      font-size: 14px;
      font-weight: 500;
    }
    .important {
      color: ${colors.bgDirector};
    }
    .capitalize {
      text-transform: capitalize;
    }
    .labels_container {
      margin-top: 4px;
      display: flex;
    }
  }
  .seemore {
    width: fit-content;
    color: ${colors.bgDirector};
    border-bottom: 1px solid transparent;
    transition: 0.2s;
    &:hover {
      border-bottom: 1px solid ${colors.bgDirector};
      cursor: pointer;
    }
  }
`;
const LabelContainer = styled.p`
  margin-right: 5px;
  border-radius: 5px;
  padding: 2px;
  font-size: 13px;
  border: 2px solid ${({ color }) => color};
  text-transform: capitalize;
  color: grey;
`;
const LindeDivider = styled.hr`
  width: 100%;
  border-top: 1px solid rgb(48, 63, 159);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 5px;
`;
