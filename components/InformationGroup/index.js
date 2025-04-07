import React, { useState } from "react";
import { Avatar, Collapse, Grid } from "@material-ui/core";
import { formatLink } from "../../utils";
import { useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import dayjs from "dayjs";
import { InfoStyled, LindeDivider } from "../InformationProspect/style";
import { URL_SPACE } from "../../services/api";
export default function InformationGroup({ group }) {
  const { groups: grupos } = useSelector(commonSelector);
  const groups = grupos.results;
  const [isSeeMore, setIsSeeMore] = useState(false);
  const validateData = (info, typeData) => {
    if (info) {
      switch (typeData) {
        case "link":
          return formatLink(info);
        case "date":
          return dayjs(info).format("MMMM DD, YYYY");
        case "group":
          let searchGroup = groups.filter(item => item.id === info);
          if (searchGroup.length > 0) {
            return searchGroup[0]?.name;
          } else {
            return "N/A";
          }
        default:
          return info;
      }
    } else {
      return "N/A";
    }
  };

  return (
    <InfoStyled>
      <Grid container={true} spacing={2} className="info_prospect">
        <Grid item xs={12}>
          <p>Información del Grupo</p>
        </Grid>
        <Grid item xs={6} md={4}>
          <Avatar src={group?.itemBD?.logo ? URL_SPACE + group?.itemBD?.logo : ""} />
        </Grid>
        <Grid item xs={6} md={4}>
          <p className="title">Nombre</p>
          <p className="data capitalize">{validateData(group?.nombre)}</p>
        </Grid>
        <Grid item xs={6} md={4}>
          <p className="title">Monto Vendido</p>
          <p className="data important">{validateData(group["Monto Vendido"])}</p>
        </Grid>
        <Grid item xs={6} md={4}>
          <p className="title">Total Oportunidades</p>
          <p className="data">{validateData(group["Total Oportunidades"])}</p>
        </Grid>
        <Grid item xs={6} md={4}>
          <p className="title">Total Oportunidades</p>
          <p className="data">{validateData(group["Total Oportunidades"])}</p>
        </Grid>
        <Grid item xs={6} md={4}>
          <p className="title">Total Prospectos</p>
          <p className="data">{validateData(group["Total Prospectos"])}</p>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={isSeeMore}>
            <Grid container={true} spacing={2} className="info_prospect">
              <Grid item xs={12}>
                {/* Este grid evita que se bugue la linea divisora */}
                <LindeDivider />
              </Grid>

              <Grid item md={4} xs={6}>
                <p className="title">Auditoria</p>
                <p className="data capitalize">{group?.itemBD?.audit ? "Esta siendo auditada" : "No auditada"}</p>
              </Grid>

              <Grid item md={4} sm={6}>
                <p className="title">Fecha de creación</p>
                <p className="data capitalize">{dayjs(group?.itemBD?.createdAt).format("DD/MM/YYYY")}</p>
              </Grid>
              <Grid item md={4} sm={6}>
                <p className="title">Última actualizacion</p>
                <p className="data capitalize">{dayjs(group?.itemBD?.updatedAt).format("DD/MM/YYYY")}</p>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
      <p className="seemore" onClick={() => setIsSeeMore(!isSeeMore)}>
        {isSeeMore ? "...Ver Menos" : "Ver Más..."}
      </p>
    </InfoStyled>
  );
}
