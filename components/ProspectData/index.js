import React, { useEffect, useState } from "react";
import { Divider, Drawer, Grid, Popover, Tooltip, Link } from "@material-ui/core";
import { NavigateNext, Settings, WhatsApp, PersonOutlineOutlined, Timeline } from "@material-ui/icons";
import styled from "styled-components";
import { formatDate, formatLink } from "../../utils";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
const ProspectData = ({ prospect, handleClick, id, anchorEl, handleCloseMenu, setOpenWhats, open, title }) => {
  const { roleId } = useSelector(userSelector);
  const [viewMore, setViewMore] = useState(false);
  return (
    <Grid container spacing={1} className="ctr_information__data">
      {title && (
        <Grid item xs={12}>
          <div className="title" value="valor">
            <Timeline className="icon" />
            <p className="text">Datos de cliente</p>
          </div>
        </Grid>
      )}
      <Grid item xs={12} md={4}>
        <p className="label">Nombre</p>
        <p className="paragraph capitalize">{`${prospect?.name} ${prospect?.lastname}`}</p>
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Genero</p>
        {prospect?.gender ? <p className="paragraph capitalize">{prospect?.gender}</p> : <span>N/A</span>}
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Teléfono</p>
        {prospect?.optionalphone ? <p className="paragraph">{prospect?.optionalphone}</p> : <span>N/A</span>}
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Movil</p>
        <div className="tooltip">
          <Tooltip title="Acciones" arrow>
            <p className="paragraph capitalize whatsApp light" onClick={handleClick}>
              {prospect?.phone}
            </p>
          </Tooltip>
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
        >
          <MenuWhats>
            <div className="headerMenu">
              <p className="titleMenu">Acciones</p>
              <Settings className="headerMenu__icon" />
            </div>
            <Divider />
            <div onClick={() => setOpenWhats(true)} className="menuItem">
              <WhatsApp className="menuItem__icon" />
              <p className="menuItem__title">Enviar WhatsApp</p>
              <NavigateNext className="iconArrow" />
            </div>
          </MenuWhats>
        </Popover>
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Correo</p>
        <p className="paragraph light">{prospect?.email}</p>
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label ">Empresa</p>
        {prospect?.clientcompany ? (
          <p className="paragraph capitalize">{prospect?.clientcompany?.companyname}</p>
        ) : (
          <span>N/A</span>
        )}
      </Grid>
      {/*21/10/2022 se añadio categoria de interes*/}
      <Grid item xs={12} md={4}>
        <p className="label">Categoría de Interés</p>
        {prospect?.category?.name ? (
          <p className="paragraph capitalize">{prospect?.category?.name.toLocaleLowerCase()}</p>
        ) : (
          <span>N/A</span>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Tipo de Cliente</p>
        {prospect?.clienttype ? <p className="paragraph capitalize">{prospect?.clienttype?.name}</p> : <span>N/A</span>}
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Especialidad</p>
        {prospect?.specialtyId ? <p className="paragraph">{prospect?.specialty?.name}</p> : <span>N/A</span>}
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Facebook</p>
        {prospect?.facebook ? <p className="paragraph">{formatLink(prospect?.facebook)}</p> : <span>N/A</span>}
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Web</p>
        {prospect?.url ? <p className="paragraph">{formatLink(prospect?.url)}</p> : <span>N/A</span>}
      </Grid>
      <Grid item xs={12} md={4}>
        <p className="label">Origen</p>
        {prospect?.origin ? <p className="paragraph">{prospect?.origin?.name}</p> : <span>N/A</span>}
      </Grid>
      {viewMore ? (
        <>
          <DivLine />
          <Grid item xs={12} md={4}>
            <p className="label">Estado</p>
            <p className="paragraph"> {prospect?.entity?.name}</p>
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="label ">Codigo Postal</p>
            {prospect?.postalId ? (
              <p className="paragraph capitalize">{prospect?.postal?.postal_code}</p>
            ) : (
              <span>N/A</span>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <p className="label">Ciudad / Municipio</p>
            {prospect?.city ? <p className="paragraph"> {prospect?.city?.name}</p> : <span>N/A</span>}
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="label ">Calle</p>
            {prospect?.street ? <p className="paragraph capitalize">{prospect?.street}</p> : <span>N/A</span>}
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="label ">Colonia</p>
            {prospect?.postalId ? (
              <p className="paragraph capitalize">{prospect?.postal?.settlement}</p>
            ) : (
              <span>N/A</span>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="label">Google Maps</p>
            {prospect?.location ? <p className="paragraph">{formatLink(prospect?.location)}</p> : <span>N/A</span>}
          </Grid>
          <DivLine />

          {/* <Grid item xs={12} md={8}>
            <p className="label">Etiquetas</p>
            {prospect?.prospectslabels ? (
              <p className="paragraph">{prospect?.prospectslabels.map(item => item.label.label).join()}</p>
            ) : (
              <span>N/A</span>
            )}
          </Grid> */}

          <Grid item xs={12} md={4}>
            <p className="label">Fase</p>
            {prospect?.phase ? <p className="paragraph">{prospect?.phase?.name}</p> : <span>N/A</span>}
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="label">Canal</p>
            {prospect?.channel ? <p className="paragraph">{prospect?.channel?.name}</p> : <span>N/A</span>}
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="label">Fecha de creación</p>
            <p className="paragraph">{formatDate(prospect?.createdAt)}</p>
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="label">Ultima actualización</p>
            <p className="paragraph">{formatDate(prospect?.updatedAt)}</p>
          </Grid>
          <Grid item xs={12} md={12}>
            <p className="label">Observaciones</p>
            {prospect?.observations ? <p className="paragraph">{prospect?.observations}</p> : <span>N/A</span>}
          </Grid>
          {roleId !== "ejecutivo" && (
            <Grid item xs={12} md={12}>
              <p className="label">Asignado a</p>
              <p className="paragraph">Nombre: {prospect?.ejecutive?.fullname}</p>
              <p className="paragraph">Grupo: {prospect?.ejecutive?.group?.name}</p>
            </Grid>
          )}

          <Link className="link" onClick={() => setViewMore(false)}>
            Ver menos
          </Link>
        </>
      ) : (
        <Link className="link" onClick={() => setViewMore(true)}>
          Ver más
        </Link>
      )}
    </Grid>
  );
};

export default ProspectData;

const MenuWhats = styled.div`
  .headerMenu {
    display: flex;
    align-items: center;
    .titleMenu {
      font-weight: 500;
      padding: 5px 5px 10px 10px;
    }
    &__icon {
      margin-top: -4px;
      font-size: 15px;
      color: #103c82;
    }
  }
  .number {
    font-weight: 500;
    padding: 5px 10px;
  }
  .menuItem {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: rgb(220, 225, 246, 0.4);
      .iconArrow {
        font-size: 25px;
        color: #103c82;
        transform: translateX(4px);
      }
    }

    .iconArrow {
      font-size: 25px;
      transition: 0.3s;
      margin-left: 5px;
      color: grey;
    }
    &__icon {
      color: green;
      font-size: 17px;
      margin-right: 5px;
    }
    &__title {
      font-weight: 500;
      font-size: 13px;
    }
  }
`;

const DivLine = styled.div`
  background-color: #303f9f;
  height: 0.5px;
  width: 100%;
`;
