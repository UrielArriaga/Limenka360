import React, { useState } from "react";
import { InfoStyled, LabelContainer, LindeDivider } from "./style";
import { Button, Collapse, Divider, Grid } from "@material-ui/core";
import { formatLink } from "../../utils";
import { useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import dayjs from "dayjs";
import { Cancel } from "@material-ui/icons";
import { userSelector } from "../../redux/slices/userSlice";
import { Skeleton } from "@material-ui/lab";

export default function InfoProspect(props) {
  const { prospect, close, loader } = props;
  const { groups: grupos } = useSelector(commonSelector);
  const { roleId } = useSelector(userSelector);
  const groups = grupos.results;
  const [isSeeMore, setIsSeeMore] = useState(false);

  const validateData = (info, typeData) => {
    if (loader) return <Skeleton variant="text" animation="wave" />;
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

  const validateStatusDiscarted = reason => {
    if (loader) return "";
    if (reason === undefined || reason === null || reason === "") return "";
    return (
      <Grid item={true} md={12} sm={12} xs={12}>
        <p className="discarted_reason">Razón de Descarte: {reason}</p>
      </Grid>
    );
  };

  return (
    <InfoStyled>
      <Grid container={true} spacing={2} className="info_prospect">
        {validateStatusDiscarted(prospect?.discartedreason)}
        <Grid item={true} md={12} sm={12} xs={12}>
          <div className="info_prospect_title">
            {close && <Cancel className="icon" fontSize="medium" onClick={() => close()} />}
            <p>Información del Prospecto</p>
          </div>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Nombre</p>
          <p className="data capitalize">{validateData(prospect?.fullname)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Género</p>
          <p className="data ">{validateData(prospect?.gender)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Movil</p>
          <p className="data important">{validateData(prospect?.phone)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Teléfono Opcional</p>
          <p className="data ">{validateData(prospect?.optionalphone)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Correo Electrónico</p>
          <p className="data important">{validateData(prospect?.email)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Empresa</p>
          <p className="data capitalize">{validateData(prospect?.clientcompany?.companyname)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Categoría de Interés</p>
          <p className="data capitalize">{validateData(prospect?.category?.name)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Tipo de Cliente</p>
          <p className="data capitalize">{validateData(prospect?.clienttype?.name)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Especialidad</p>
          <p className="data capitalize">{validateData(prospect?.specialty?.name)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Facebook</p>
          <p className="data">{validateData(prospect?.facebook, "link")}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Página Web</p>
          <p className="data">{validateData(prospect?.url, "link")}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Origen</p>
          <p className="data capitalize">{validateData(prospect?.origin?.name)}</p>
        </Grid>
        <Grid item={true} md={12} sm={12} xs={12}>
          <Collapse in={isSeeMore}>
            <Grid container={true} spacing={2} className="info_prospect">
              <Grid item={true} md={12} sm={12} xs={12}>
                {/* Este grid evita que se bugue la linea divisora */}
                <LindeDivider />
              </Grid>
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Estado</p>
                <p className="data capitalize">{validateData(prospect?.entity?.name)}</p>
              </Grid>
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Código Postal</p>
                <p className="data">{validateData(prospect?.postal?.postal_code)}</p>
              </Grid>
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Ciudad / Municipio</p>
                <p className="data capitalize">{validateData(prospect?.city?.name)}</p>
              </Grid>
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Calle</p>
                <p className="data capitalize">{validateData(prospect?.street)}</p>
              </Grid>
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Colonia</p>
                <p className="data capitalize">{validateData(prospect?.postal?.settlement)}</p>
              </Grid>

              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Google Maps</p>
                <p className="data">{validateData(prospect?.location, "link")}</p>
              </Grid>
              <LindeDivider />
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Canal</p>
                <p className="data">{validateData(prospect?.channel?.name)}</p>
              </Grid>
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Fecha de Creación</p>
                <p className="data capitalize">{validateData(prospect?.createdAt, "date")}</p>
              </Grid>
              <Grid item={true} md={4} sm={6} xs={6}>
                <p className="title">Fecha de Actualización</p>
                <p className="data capitalize">{validateData(prospect?.updatedAt, "date")}</p>
              </Grid>
              {roleId !== "inteligencia_comercial" && (
                <Grid item={true} md={4} sm={6} xs={6}>
                  <p className="title">Asignado a</p>
                  <p className="data capitalize">Ejecutivo: {validateData(prospect?.ejecutive?.fullname)}</p>
                  <p className="data capitalize ">Grupo: {validateData(prospect?.ejecutive?.groupId, "group")}</p>
                </Grid>
              )}
              <Grid item={true} md={12} sm={12} xs={12}>
                <p className="title">Observaciones</p>
                <p className="data">{validateData(prospect?.observations)}</p>
              </Grid>
              <Grid item={true} md={12} sm={12} xs={12}>
                <p className="title">Etiquetas</p>
                {validateLabels(prospect?.prospectslabels)}
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
